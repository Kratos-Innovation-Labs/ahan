use concordium_cis2::{TokenAmountU16, TokenIdU8};
use concordium_smart_contract_testing::*;
use concordium_std::MetadataUrl;
use mint_tokens::*;
use vaults::{DepositParams, Error, InitParams, State};
// use vaults::*;

const ACC_ADDR_OWNER: AccountAddress = AccountAddress([0u8; 32]);
const ACC_ADDR_OTHER: AccountAddress = AccountAddress([1u8; 32]);
const ACC_INITIAL_BALANCE: Amount = Amount::from_ccd(1000);

const DEPOSIT_AMOUNT: u64 = 1000;
const WITHDRAW_AMOUNT: u64 = 500;

fn setup_chain_and_contract() -> (
    Chain,
    ContractInitSuccess,
    ContractInitSuccess,
    ContractInitSuccess,
) {
    let mut chain = Chain::new();
    let account_owner = Account::new(ACC_ADDR_OWNER, ACC_INITIAL_BALANCE);
    let account_other = Account::new(ACC_ADDR_OTHER, ACC_INITIAL_BALANCE);
    chain.create_account(account_owner);
    chain.create_account(account_other);
    let vaults_module = module_load_v1("dist/module.wasm.v1").expect("Module is valid and exists");
    let token_module =
        module_load_v1("../token/dist/module.wasm.v1").expect("Module is valid and exists");
    let vaults_deployment = chain
        .module_deploy_v1(Signer::with_one_key(), ACC_ADDR_OWNER, vaults_module)
        .expect("Deploying valid module should succeed");
    let token_deployment = chain
        .module_deploy_v1(Signer::with_one_key(), ACC_ADDR_OWNER, token_module)
        .expect("Deploying valid module should succeed");
    let token_mint = TokenAmountU16(10000);
    let euro_token_initialization = chain
        .contract_init(
            Signer::with_one_key(),
            ACC_ADDR_OWNER,
            Energy::from(10000),
            InitContractPayload {
                mod_ref: token_deployment.module_reference,
                init_name: OwnedContractName::new_unchecked("init_cis2_multi".to_string()),
                param: OwnedParameter::from_serial(&token_mint).unwrap(),
                amount: Amount::zero(),
            },
        )
        .expect("Initialization should always succeed");
    let lp_token_initialization = chain
        .contract_init(
            Signer::with_one_key(),
            ACC_ADDR_OWNER,
            Energy::from(10000),
            InitContractPayload {
                mod_ref: token_deployment.module_reference,
                init_name: OwnedContractName::new_unchecked("init_cis2_multi".to_string()),
                param: OwnedParameter::from_serial(&token_mint).unwrap(),
                amount: Amount::zero(),
            },
        )
        .expect("Initialization should always succeed");
    let vault_init_params = InitParams {
        lp_token_contract: lp_token_initialization.contract_address,
        euro_e_token_contract: euro_token_initialization.contract_address,
    };
    let vaults_initialization = chain
        .contract_init(
            Signer::with_one_key(),
            ACC_ADDR_OWNER,
            Energy::from(10000),
            InitContractPayload {
                mod_ref: vaults_deployment.module_reference,
                init_name: OwnedContractName::new_unchecked("init_vaults".to_string()),
                param: OwnedParameter::from_serial(&vault_init_params).unwrap(),
                amount: Amount::zero(),
            },
        )
        .expect("Initialization should always succeed");
    (
        chain,
        vaults_initialization,
        euro_token_initialization,
        lp_token_initialization,
    )
}

#[test]
fn test_init() {
    let (mut chain, vaults_init, euro_token_init, lp_token_init) = setup_chain_and_contract();
    let mint_params = MintParams {
        to: Address::Account(ACC_ADDR_OWNER),
        metadata_url: MetadataUrl {
            url: String::from("Test"),
            hash: None,
        },
        token_id: TokenIdU8(1),
        amount: concordium_cis2::TokenAmountU64(10000),
    };
    let update = chain.contract_update(
        Signer::with_one_key(),
        ACC_ADDR_OWNER,
        Address::Account(ACC_ADDR_OWNER),
        Energy::from(10000),
        UpdateContractPayload {
            amount: Amount::zero(),
            address: euro_token_init.contract_address,
            receive_name: OwnedReceiveName::new_unchecked("cis2_multi.mint".to_string()),
            message: OwnedParameter::from_serial(&mint_params).unwrap(),
        },
    );
    assert!(update.is_ok(), "Minting tokens failed");
    let tokens = chain
        .contract_invoke(
            ACC_ADDR_OTHER,
            Address::Account(ACC_ADDR_OWNER),
            Energy::from(10000),
            UpdateContractPayload {
                amount: Amount::zero(),
                address: euro_token_init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("cis2_multi.view".to_string()),
                message: OwnedParameter::empty(),
            },
        )
        .unwrap();
    let token_state: ViewState = from_bytes(&tokens.return_value).unwrap();
    println!("These are tokens {:?}", token_state.state);

    let deposit_params = DepositParams {
        amount: DEPOSIT_AMOUNT,
        receiver: concordium_cis2::Receiver::Contract(
            vaults_init.contract_address,
            OwnedEntrypointName::new("depositIntoContract".to_string()).unwrap(),
        ),
        contract_address: euro_token_init.contract_address.index,
        token_id: TokenIdU8(1),
    };
    let update = chain
        .contract_update(
            Signer::with_one_key(),
            ACC_ADDR_OWNER,
            Address::Account(ACC_ADDR_OWNER),
            Energy::from(100000),
            UpdateContractPayload {
                amount: Amount::zero(),
                address: vaults_init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("vaults.deposit".to_string()),
                message: OwnedParameter::from_serial(&deposit_params).unwrap(),
            },
        )
        .print_emitted_events();

    if let Err(e) = update {
        e.trace_elements.iter().for_each(|trace_element| {
            match trace_element {
                DebugTraceElement::WithFailures { contract_address: _, entrypoint: _, error, trace_elements: _, energy_used: _, debug_trace: _ } => {
                    println!("error: {:?}", error);
                    let return_value : Error = match error {
                        InvokeExecutionError::Reject { reason: _, return_value } => from_bytes(&return_value).unwrap(),
                        InvokeExecutionError::Trap { error } => panic!("error: {:?}", error),
                    };
                    println!("This is return value {:?}", return_value);
                },
                DebugTraceElement::Debug { entrypoint, address, debug_trace } => println!("This is entrypoint {:?}, address {:?} and debug_trace {:?}", entrypoint, address, debug_trace),
                DebugTraceElement::Regular { entrypoint, trace_element, energy_used, debug_trace } => println!("Thsi is entrypoint {:?} trace_element: {:?}, energy_used {:?} debug_trace {:?}", entrypoint, trace_element, energy_used, debug_trace),
            };
        });
    }
    let vaults_view = chain
        .contract_invoke(
            ACC_ADDR_OTHER,
            Address::Account(ACC_ADDR_OWNER),
            Energy::from(10000),
            UpdateContractPayload {
                amount: Amount::zero(),
                address: vaults_init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("vaults.view".to_string()),
                message: OwnedParameter::empty(),
            },
        )
        .unwrap();
    let vaults_state: State = from_bytes(&vaults_view.return_value).unwrap();
    let user_deposit_balance = vaults_state
        .balances
        .get(&ACC_ADDR_OWNER)
        .expect("No deposit found with given address");

    let lp_token_state = chain
        .contract_invoke(
            ACC_ADDR_OTHER,
            Address::Account(ACC_ADDR_OWNER),
            Energy::from(10000),
            UpdateContractPayload {
                amount: Amount::zero(),
                address: lp_token_init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("cis2_multi.view".to_string()),
                message: OwnedParameter::empty(),
            },
        )
        .unwrap();
    let lp_token_state: mint_tokens::ViewState = from_bytes(&lp_token_state.return_value).unwrap();
    let lp_token_balance = lp_token_state.state[0].1.balances[0].1;
    println!("This is lp token state {:?}", lp_token_state);

    assert_eq!(
        lp_token_balance,
        concordium_cis2::TokenAmountU64(DEPOSIT_AMOUNT)
    );
    assert_eq!(user_deposit_balance, &DEPOSIT_AMOUNT);

    let withdraw_params = DepositParams {
        amount: WITHDRAW_AMOUNT,
        receiver: concordium_cis2::Receiver::Contract(
            vaults_init.contract_address,
            OwnedEntrypointName::new("depositIntoContract".to_string()).unwrap(),
        ),
        contract_address: euro_token_init.contract_address.index,
        token_id: TokenIdU8(1),
    };
    let update = chain
        .contract_update(
            Signer::with_one_key(),
            ACC_ADDR_OWNER,
            Address::Account(ACC_ADDR_OWNER),
            Energy::from(100000),
            UpdateContractPayload {
                amount: Amount::zero(),
                address: vaults_init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("vaults.withdraw".to_string()),
                message: OwnedParameter::from_serial(&withdraw_params).unwrap(),
            },
        )
        .print_emitted_events();

    if let Err(ref e) = update {
        e.trace_elements.iter().for_each(|trace_element| {
            match trace_element {
                DebugTraceElement::WithFailures { contract_address: _, entrypoint: _, error, trace_elements: _, energy_used: _, debug_trace: _ } => {
                    println!("error: {:?}", error);
                    let return_value : Error = match error {
                        InvokeExecutionError::Reject { reason: _, return_value } => from_bytes(&return_value).unwrap(),
                        InvokeExecutionError::Trap { error } => panic!("error: {:?}", error),
                    };
                    println!("This is return value {:?}", return_value);
                },
                DebugTraceElement::Debug { entrypoint, address, debug_trace } => println!("This is entrypoint {:?}, address {:?} and debug_trace {:?}", entrypoint, address, debug_trace),
                DebugTraceElement::Regular { entrypoint, trace_element, energy_used, debug_trace } => println!("Thsi is entrypoint {:?} trace_element: {:?}, energy_used {:?} debug_trace {:?}", entrypoint, trace_element, energy_used, debug_trace),
            };
        });
    }

    let vaults_view = chain
        .contract_invoke(
            ACC_ADDR_OTHER,
            Address::Account(ACC_ADDR_OWNER),
            Energy::from(10000),
            UpdateContractPayload {
                amount: Amount::zero(),
                address: vaults_init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("vaults.view".to_string()),
                message: OwnedParameter::empty(),
            },
        )
        .unwrap();
    let vaults_state: State = from_bytes(&vaults_view.return_value).unwrap();
    let user_deposit_balance = vaults_state
        .balances
        .get(&ACC_ADDR_OWNER)
        .expect("No deposit found with given address");

    let lp_token_state = chain
        .contract_invoke(
            ACC_ADDR_OTHER,
            Address::Account(ACC_ADDR_OWNER),
            Energy::from(10000),
            UpdateContractPayload {
                amount: Amount::zero(),
                address: lp_token_init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("cis2_multi.view".to_string()),
                message: OwnedParameter::empty(),
            },
        )
        .unwrap();
    let lp_token_state: mint_tokens::ViewState = from_bytes(&lp_token_state.return_value).unwrap();
    let lp_token_balance = lp_token_state.state[0].1.balances[0].1;

    assert_eq!(
        lp_token_balance,
        concordium_cis2::TokenAmountU64(DEPOSIT_AMOUNT - WITHDRAW_AMOUNT)
    );
    assert_eq!(user_deposit_balance, &(DEPOSIT_AMOUNT - WITHDRAW_AMOUNT));
}
