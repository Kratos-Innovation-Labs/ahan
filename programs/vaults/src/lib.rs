#![cfg_attr(not(feature = "std"), no_std)]

//! # A Concordium V1 smart contract
extern crate alloc;
use alloc::collections::BTreeMap;
use concordium_cis2::*;
use concordium_std::*;
use core::fmt::Debug;
use mint_tokens::{BurnParams, MintParams};

type Cis2ClientResult<T> = Result<T, Cis2ClientError<()>>;

/// Your smart contract state.
#[derive(Serialize, SchemaType, Debug, Clone)]
pub struct State {
    pub balances: BTreeMap<AccountAddress, u64>,
    pub lp_token_contract: ContractAddress,
    pub euro_e_token_contract: ContractAddress,
}

#[derive(Serialize, SchemaType)]
pub struct InitParams {
    pub lp_token_contract: ContractAddress,
    pub euro_e_token_contract: ContractAddress
}
#[derive(Serialize, SchemaType)]
pub struct DepositParams {
    pub amount: u64,
    pub receiver: Receiver,
    pub contract_address: ContractIndex,
    pub token_id: TokenIdU8,
}

/// The parameter type for the contract function `upgrade`.
/// Takes the new module and optionally a migration function to call in the new
/// module after the upgrade.
#[derive(Serialize, SchemaType)]
struct UpgradeParams {
    /// The new module reference.
    module: ModuleReference,
    /// Optional entrypoint to call in the new module after upgrade.
    migrate: Option<(OwnedEntrypointName, OwnedParameter)>,
}

/// Your smart contract errors.
#[derive(Debug, PartialEq, Eq, Reject, Serialize, SchemaType)]
pub enum Error {
    /// Failed parsing the parameter.
    #[from(ParseError)]
    ParseParams, // 1
    ParseResult,     // 2
    InvalidResponse, // 3
    /// Amount that was to be transferred is not available to the sender.
    AmountTooLarge, // 4
    /// Owner account of the smart contract that is being invoked does not
    /// exist. This variant should in principle not happen, but is here for
    /// completeness.
    MissingAccount, // 5
    /// Contract that is to be invoked does not exist.
    MissingContract, // 6
    /// The contract to be invoked exists, but the entrypoint that was named
    /// does not.
    MissingEntrypoint, // 7
    /// Sending a message to the V0 contract failed.
    MessageFailed, // 8
    /// Contract that was called rejected with the given reason.
    LogicReject {
        // 9
        reason: i32,
        return_value: Cis2Error<()>,
    },
    /// Execution of a contract call triggered a runtime error.
    Trap, // 10
    /// Balance not found in the state
    BalanceNotFound, // 11
    /// When subtraction underflows
    SubtractionUnderflow, // 12
    /// When addtion overflows
    AdditionOverflow, // 13
}

/// Init function that creates a new smart contract.
#[init(contract = "vaults", parameter = "InitParams")]
fn init(ctx: &InitContext, _state_builder: &mut StateBuilder) -> InitResult<State> {
    // Your code
    let parameters: InitParams = ctx.parameter_cursor().get()?;

    Ok(State {
        balances: BTreeMap::new(),
        lp_token_contract: parameters.lp_token_contract,
        euro_e_token_contract: parameters.euro_e_token_contract
    })
}

impl From<Cis2ClientError<()>> for Error {
    fn from(value: Cis2ClientError<()>) -> Self {
        match value {
            Cis2ClientError::InvokeContractError(e) => match e {
                CallContractError::AmountTooLarge => Self::AmountTooLarge,
                CallContractError::MissingAccount => Self::MissingAccount,
                CallContractError::MissingContract => Self::MissingContract,
                CallContractError::MissingEntrypoint => Self::MissingEntrypoint,
                CallContractError::MessageFailed => Self::MessageFailed,
                CallContractError::LogicReject {
                    reason,
                    return_value,
                } => Self::LogicReject {
                    reason,
                    return_value,
                },
                CallContractError::Trap => Self::Trap,
            },
            Cis2ClientError::ParseResult => Self::ParseResult,
            Cis2ClientError::InvalidResponse => Self::InvalidResponse,
        }
    }
}

#[receive(
    contract = "vaults",
    name = "deposit",
    parameter = "DepositParams",
    mutable,
    enable_logger
)]
fn deposit(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    _logger: &mut impl HasLogger,
) -> ReceiveResult<()> {
    let params: DepositParams = ctx.parameter_cursor().get()?;
    let state = host.state.clone();
    let cis2_client = Cis2Client::new(state.euro_e_token_contract);
    ensure!(ctx.sender().is_account());
    let sender = match ctx.sender() {
        Address::Account(acc) => acc,
        Address::Contract(_) => bail!(),
    };
    // Transfer tokens to the contract
    let res: Cis2ClientResult<bool> = cis2_client.transfer(
        host,
        Transfer {
            amount: TokenAmountU64(params.amount),
            from: Address::Account(sender),
            to: Receiver::Contract(
                ctx.self_address(),
                OwnedEntrypointName::new(String::from("depositIntoContract")).unwrap(),
            ),
            token_id: TokenIdU8(01),
            data: AdditionalData::empty(),
        },
    );
    if let Err(val) = res {
        // logger.log_raw("Errored out here".as_bytes())?;
        concordium_dbg!("This is the error {:?}", val);
        bail!(Error::from(val).into());
    }
    // Mint LP tokens
    let mint_params = MintParams {
        to: ctx.sender(),
        metadata_url: MetadataUrl {
            url: "".to_string(),
            hash: None,
        },
        token_id: TokenIdU8(01),
        amount: concordium_cis2::TokenAmountU64(params.amount),
    };
    let res = host.invoke_contract(
        &state.lp_token_contract,
        &mint_params,
        EntrypointName::new("mint").unwrap(),
        Amount::zero(),
    );
    let _res = match res {
        Ok(val) => {
            let o = match val.1 {
                Some(res) => Some(res),
                None => None,
            };
            (val.0, o)
        }
        Err(err) => {
            return Err(Error::from(
                Cis2ClientError::<()>::try_from(err).map_err(|err| Error::from(err))?,
            )
            .into())
        }
    };
    Ok(())
}

#[receive(contract = "vaults", name = "depositIntoContract", mutable)]
fn deposit_into_contract(ctx: &ReceiveContext, host: &mut Host<State>) -> ReceiveResult<()> {
    let params: OnReceivingCis2Params<TokenIdU8, TokenAmountU64> = ctx.parameter_cursor().get()?;
    let (state, _builder) = host.state_and_builder();

    ensure!(params.from.is_account());
    let sender = match params.from {
        Address::Account(acc) => acc,
        Address::Contract(_acc) => bail!(),
    };
    let mut amount = params.amount.0;
    let existing_balance = state.balances.get(&sender);
    if let Some(balance) = existing_balance {
        amount = amount
            .checked_add(*balance)
            .ok_or(Error::AdditionOverflow)?;
    }
    state.balances.insert(sender, amount);

    Ok(())
}

#[receive(contract = "vaults", name = "withdraw", mutable)]
fn withdraw(ctx: &ReceiveContext, host: &mut Host<State>) -> ReceiveResult<()> {
    ensure!(ctx.sender().is_account());
    let sender = match ctx.sender() {
        Address::Account(acc) => acc,
        Address::Contract(_) => bail!(),
    };
    let params: DepositParams = ctx.parameter_cursor().get()?;
    let state = host.state.clone();
    let cis2_client = Cis2Client::new(state.euro_e_token_contract);

    // Transfer tokens from the contract
    let res: Cis2ClientResult<bool> = cis2_client.transfer(
        host,
        Transfer {
            amount: TokenAmountU64(params.amount),
            from: Address::Contract(ctx.self_address()),
            to: Receiver::Account(sender),
            token_id: TokenIdU8(01),
            data: AdditionalData::empty(),
        },
    );
    if let Err(val) = res {
        // logger.log_raw("Errored out here".as_bytes())?;
        concordium_dbg!("This is the error {:?}", val);
        bail!(Error::from(val).into());
    }
    // burn LP tokens
    let mint_params = BurnParams {
        owner: ctx.sender(),
        token_id: TokenIdU8(01),
        amount: concordium_cis2::TokenAmountU64(params.amount),
    };
    let res = host.invoke_contract(
        &state.lp_token_contract,
        &mint_params,
        EntrypointName::new("burn").unwrap(),
        Amount::zero(),
    );
    let _res = match res {
        Ok(val) => {
            let o = match val.1 {
                Some(res) => Some(res),
                None => None,
            };
            (val.0, o)
        }
        Err(err) => {
            return Err(Error::from(
                Cis2ClientError::<()>::try_from(err).map_err(|err| Error::from(err))?,
            )
            .into())
        }
    };

    let user_balance = host
        .state
        .balances
        .get_mut(&sender)
        .ok_or(Error::BalanceNotFound)?;

    *user_balance = user_balance
        .checked_sub(u64::from(params.amount))
        .ok_or(Error::SubtractionUnderflow)?;

    Ok(())
}

#[receive(contract = "vaults", name = "view")]
fn view(_ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<(State, Amount)> {
    let current_state = host.state();
    let current_balance = host.self_balance();
    Ok((current_state.clone(), current_balance))
}

#[receive(
    contract = "vaults",
    name = "upgrade",
    parameter = "UpgradeParams",
    low_level
)]
fn contract_upgrade(ctx: &ReceiveContext, host: &mut LowLevelHost) -> ReceiveResult<()> {
    // Check that only the owner is authorized to upgrade the smart contract.
    ensure!(ctx.sender().matches_account(&ctx.owner()));
    // Parse the parameter.
    let params: UpgradeParams = ctx.parameter_cursor().get()?;
    // Trigger the upgrade.
    host.upgrade(params.module)?;
    // Call the migration function if provided.
    if let Some((func, parameters)) = params.migrate {
        host.invoke_contract_raw(
            &ctx.self_address(),
            parameters.as_parameter(),
            func.as_entrypoint_name(),
            Amount::zero(),
        )?;
    }
    Ok(())
}
