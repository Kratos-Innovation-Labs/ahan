#![cfg_attr(not(feature = "std"), no_std)]

//! # A Concordium V1 smart contract
extern crate alloc;
use alloc::collections::BTreeMap;
use concordium_cis2::*;
use concordium_std::*;
use core::fmt::Debug;
use mint_tokens::{BurnParams, MintParams};

type Cis2ClientResult<T> = Result<T, Cis2ClientError<()>>;

/// The contract state.
// Note: The specification does not specify how to structure the contract state
// and this could be structured in a more space efficient way depending on the use case.
#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct State<S = StateApi> {
    pub balances: StateMap<AccountAddress, u64, S>,
    pub lp_token_contract: ContractAddress,
    pub euro_e_token_contract: ContractAddress,
    /// List of operators
    pub operators: StateSet<Address, S>,
    /// Map with contract addresses providing implementations of additional
    /// standards.
    pub implementors: StateMap<StandardIdentifierOwned, Vec<ContractAddress>, S>,
    /// A registry to link an account to its next nonce. The nonce is used to
    /// prevent replay attacks of the signed message. The nonce is increased
    /// sequentially every time a signed message (corresponding to the
    /// account) is successfully executed in the `permit` function. This
    /// mapping keeps track of the next nonce that needs to be used by the
    /// account to generate a signature.
    pub nonces_registry: StateMap<AccountAddress, u64, S>,
}

#[derive(Serialize, SchemaType, PartialEq, Eq, Debug)]
pub struct ViewState {
    pub balances: BTreeMap<AccountAddress, u64>,
    pub lp_token_contract: ContractAddress,
    pub euro_e_token_contract: ContractAddress,
    pub operators: Vec<Address>,
    pub implementors: Vec<(StandardIdentifierOwned, Vec<ContractAddress>)>,
    pub nonces_registry: BTreeMap<AccountAddress, u64>,
}

#[derive(Serialize, SchemaType)]
pub struct InitParams {
    pub lp_token_contract: ContractAddress,
    pub euro_e_token_contract: ContractAddress,
}

#[derive(Serialize)]
pub struct PermitParamPartial {
    /// Signature/s. The CIS3 standard supports multi-sig accounts.
    signature: AccountSignatures,
    /// Account that created the above signature.
    signer: AccountAddress,
}

/// Part of the parameter type for the contract function `permit`.
/// Specifies the message that is signed.
#[derive(SchemaType, Serialize)]
pub struct PermitMessage {
    /// The contract_address that the signature is intended for.
    pub contract_address: ContractAddress,
    /// A nonce to prevent replay attacks.
    pub nonce: u64,
    /// A timestamp to make signatures expire.
    pub timestamp: Timestamp,
    /// The entry_point that the signature is intended for.
    pub entry_point: OwnedEntrypointName,
    /// The serialized payload that should be forwarded to either the `transfer`
    /// or the `updateOperator` function.
    #[concordium(size_length = 2)]
    pub payload: Vec<u8>,
}

/// The parameter type for the contract function `permit`.
/// Takes a signature, the signer, and the message that was signed.
#[derive(Serialize, SchemaType)]
pub struct PermitParam {
    /// Signature/s. The CIS3 standard supports multi-sig accounts.
    pub signature: AccountSignatures,
    /// Account that created the above signature.
    pub signer: AccountAddress,
    /// Message that was signed.
    pub message: PermitMessage,
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
    NonceMismatch,   // 14
    WrongContract,   // 15
    WrongSignature,  //16
    WrongEntryPoint, // 17
    Expired,         // 18
}

// Functions for creating, updating and querying the contract state.
impl State {
    /// Check if a given address is an operator of a given owner address.
    fn is_operator(&self, address: &Address) -> bool {
        self.operators.contains(address)
    }

    /// Update the state adding a new operator for a given address.
    /// Succeeds even if the `operator` is already an operator for the
    /// `address`.
    fn add_operator(&mut self, operator: &Address) {
        self.operators.insert(*operator);
    }

    /// Update the state removing an operator for a given address.
    /// Succeeds even if the `operator` is _not_ an operator for the `address`.
    fn remove_operator(&mut self, operator: &Address) {
        self.operators.remove(operator);
    }

    /// Check if state contains any implementors for a given standard.
    fn _have_implementors(&self, std_id: &StandardIdentifierOwned) -> SupportResult {
        if let Some(addresses) = self.implementors.get(std_id) {
            SupportResult::SupportBy(addresses.to_vec())
        } else {
            SupportResult::NoSupport
        }
    }

    /// Set implementors for a given standard.
    fn _set_implementors(
        &mut self,
        std_id: StandardIdentifierOwned,
        implementors: Vec<ContractAddress>,
    ) {
        self.implementors.insert(std_id, implementors);
    }
}

/// Init function that creates a new smart contract.
#[init(contract = "vaults", parameter = "InitParams", error = "Error")]
fn init(ctx: &InitContext, state_builder: &mut StateBuilder) -> InitResult<State> {
    // Your code
    let parameters: InitParams = ctx.parameter_cursor().get()?;

    Ok(State {
        balances: state_builder.new_map(),
        lp_token_contract: parameters.lp_token_contract,
        euro_e_token_contract: parameters.euro_e_token_contract,
        operators: state_builder.new_set(),
        implementors: state_builder.new_map(),
        nonces_registry: state_builder.new_map(),
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
    parameter = "u64",
    error = "Error",
    mutable,
    enable_logger
)]
fn deposit(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ReceiveResult<()> {
    let amount: u64 = ctx.parameter_cursor().get()?;
    deposit_impl(ctx.sender(), amount, ctx.self_address(), host, logger)
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

#[receive(
    contract = "vaults",
    name = "withdraw",
    parameter = "u64",
    error = "Error",
    mutable,
    enable_logger
)]
fn withdraw(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ReceiveResult<()> {
    let amount: u64 = ctx.parameter_cursor().get()?;
    withdraw_impl(ctx.sender(), amount, ctx.self_address(), host, logger)
}

#[receive(contract = "vaults", name = "view")]
fn view(_ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<(ViewState, Amount)> {
    let state = host.state();
    let current_balance = host.self_balance();
    let balances = state.balances.iter().map(|(a, b)| (*a, *b)).collect();
    let nonces_registry = state
        .nonces_registry
        .iter()
        .map(|(a, b)| (*a, *b))
        .collect();

    let implementors: Vec<(StandardIdentifierOwned, Vec<ContractAddress>)> = state
        .implementors
        .iter()
        .map(|(key, value)| {
            let mut implementors = Vec::new();
            for test in value.iter() {
                implementors.push(*test);
            }

            ((*key).clone(), implementors)
        })
        .collect();
    let operators = state.operators.iter().map(|a| *a).collect();
    let view_state = ViewState {
        implementors,
        nonces_registry,
        balances,
        lp_token_contract: state.lp_token_contract,
        euro_e_token_contract: state.euro_e_token_contract,
        operators,
    };
    Ok((view_state, current_balance))
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

/// Helper function that can be invoked at the front-end to serialize the
/// `PermitMessage` before signing it in the wallet.
#[receive(
    contract = "vaults",
    name = "serializationHelper",
    parameter = "PermitMessage"
)]
fn contract_serialization_helper(_ctx: &ReceiveContext, _host: &Host<State>) -> ReceiveResult<()> {
    Ok(())
}

/// Helper function to calculate the `message_hash`.
#[receive(
    contract = "vaults",
    name = "viewMessageHash",
    parameter = "PermitParam",
    return_value = "[u8;32]",
    error = "Error",
    crypto_primitives,
    mutable
)]
fn contract_view_message_hash(
    ctx: &ReceiveContext,
    _host: &mut Host<State>,
    crypto_primitives: &impl HasCryptoPrimitives,
) -> ReceiveResult<[u8; 32]> {
    // Parse the parameter.
    let mut cursor = ctx.parameter_cursor();
    // The input parameter is `PermitParam` but we only read the initial part of it
    // with `PermitParamPartial`. I.e. we read the `signature` and the
    // `signer`, but not the `message` here.
    let param: PermitParamPartial = cursor.get()?;

    // The input parameter is `PermitParam` but we have only read the initial part
    // of it with `PermitParamPartial` so far. We read in the `message` now.
    // `(cursor.size() - cursor.cursor_position()` is the length of the message in
    // bytes.
    let mut message_bytes = vec![0; (cursor.size() - cursor.cursor_position()) as usize];

    cursor.read_exact(&mut message_bytes)?;

    // The message signed in the Concordium browser wallet is prepended with the
    // `account` address and 8 zero bytes. Accounts in the Concordium browser wallet
    // can either sign a regular transaction (in that case the prepend is
    // `account` address and the nonce of the account which is by design >= 1)
    // or sign a message (in that case the prepend is `account` address and 8 zero
    // bytes). Hence, the 8 zero bytes ensure that the user does not accidentally
    // sign a transaction. The account nonce is of type u64 (8 bytes).
    let mut msg_prepend = [0; 32 + 8];
    // Prepend the `account` address of the signer.
    msg_prepend[0..32].copy_from_slice(param.signer.as_ref());
    // Prepend 8 zero bytes.
    msg_prepend[32..40].copy_from_slice(&[0u8; 8]);
    // Calculate the message hash.
    let message_hash = crypto_primitives
        .hash_sha2_256(&[&msg_prepend[0..40], &message_bytes].concat())
        .0;

    Ok(message_hash)
}

/// Verify an ed25519 signature and allow the transfer of tokens or update of an
/// operator.
///
/// In case of a `transfer` action:
/// Logs a `Transfer` event and invokes a receive hook function for the
/// transfer.
///
/// In case of a `updateOperator` action:
/// Logs an `UpdateOperator` event.
///
/// It rejects if:
/// - It fails to parse the parameter.
/// - A different nonce is expected.
/// - The signature was intended for a different contract.
/// - The signature was intended for a different `entry_point`.
/// - The signature is expired.
/// - The signature can not be validated.
/// - Fails to log event.
/// - In case of a `transfer` action: it fails to be executed, which could be
///   if:
///     - The `token_id` does not exist.
///     - The token is not owned by the `from` address.
///     - The receive hook function call rejects.
#[receive(
    contract = "vaults",
    name = "permit",
    parameter = "PermitParam",
    error = "Error",
    crypto_primitives,
    mutable,
    enable_logger
)]
fn contract_permit(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
    crypto_primitives: &impl HasCryptoPrimitives,
) -> ReceiveResult<()> {
    // Parse the parameter.
    let param: PermitParam = ctx.parameter_cursor().get()?;

    // Update the nonce.
    let mut entry = host
        .state_mut()
        .nonces_registry
        .entry(param.signer)
        .or_insert_with(|| 0);

    // Get the current nonce.
    let nonce = *entry;
    // Bump nonce.
    *entry += 1;
    drop(entry);

    let message = param.message;

    // Check the nonce to prevent replay attacks.
    ensure_eq!(message.nonce, nonce, Error::NonceMismatch.into());

    // Check that the signature was intended for this contract.
    ensure_eq!(
        message.contract_address,
        ctx.self_address(),
        Error::WrongContract.into()
    );

    // Check signature is not expired.
    ensure!(
        message.timestamp > ctx.metadata().slot_time(),
        Error::Expired.into()
    );

    let message_hash = contract_view_message_hash(ctx, host, crypto_primitives)?;

    // Check signature.
    let valid_signature = host
        .check_account_signature(param.signer, &param.signature, &message_hash)
        .map_err(|_e| Error::WrongSignature)?;
    ensure!(valid_signature, Error::WrongSignature.into());

    if message.entry_point.as_entrypoint_name() == EntrypointName::new_unchecked("deposit") {
        // Update the operator.
        let amount: u64 = from_bytes(&message.payload)?;

        deposit_impl(
            concordium_std::Address::Account(param.signer),
            amount,
            ctx.self_address(),
            host,
            logger,
        )?;
    } else if message.entry_point.as_entrypoint_name() == EntrypointName::new_unchecked("withdraw")
    {
        // Update the operator.
        let amount: u64 = from_bytes(&message.payload)?;

        withdraw_impl(
            concordium_std::Address::Account(param.signer),
            amount,
            ctx.self_address(),
            host,
            logger,
        )?;
    } else if message.entry_point.as_entrypoint_name()
        == EntrypointName::new_unchecked("updateOperator")
    {
        // Update the operator.
        let UpdateOperatorParams(updates): UpdateOperatorParams = from_bytes(&message.payload)?;

        let (state, builder) = host.state_and_builder();

        for update in updates {
            update_operator(
                update.update,
                concordium_std::Address::Account(param.signer),
                update.operator,
                state,
                builder,
                logger,
            )?;
        }
    } else {
        bail!(Error::WrongEntryPoint.into())
    }

    // // Log the nonce event.
    // logger.log(&Event::Nonce(NonceEvent {
    //     account: param.signer,
    //     nonce,
    // }))?;

    Ok(())
}

fn deposit_impl(
    sender: Address,
    amount: u64,
    contract_address: ContractAddress,
    host: &mut Host<State>,
    _logger: &mut impl HasLogger,
) -> ReceiveResult<()> {
    // let state = host.state.clone();
    let cis2_client = Cis2Client::new(host.state.euro_e_token_contract);
    ensure!(sender.is_account());
    let sender = match sender {
        Address::Account(acc) => acc,
        Address::Contract(_) => bail!(),
    };
    // Transfer tokens to the contract
    let res: Cis2ClientResult<bool> = cis2_client.transfer(
        host,
        Transfer {
            amount: TokenAmountU64(amount),
            from: Address::Account(sender),
            to: Receiver::Contract(
                contract_address,
                OwnedEntrypointName::new(String::from("depositIntoContract")).unwrap(),
            ),
            token_id: TokenIdU8(0),
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
        to: concordium_std::Address::Account(sender),
        metadata_url: MetadataUrl {
            url: "".to_string(),
            hash: None,
        },
        token_id: TokenIdU8(01),
        amount: concordium_cis2::TokenAmountU64(amount),
    };
    let lp_token_contract = host.state.lp_token_contract;
    let res = host.invoke_contract(
        &lp_token_contract,
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

fn withdraw_impl(
    sender: Address,
    amount: u64,
    contract_address: ContractAddress,
    host: &mut Host<State>,
    _logger: &mut impl HasLogger,
) -> ReceiveResult<()> {
    ensure!(sender.is_account());
    let sender = match sender {
        Address::Account(acc) => acc,
        Address::Contract(_) => bail!(),
    };
    let cis2_client = Cis2Client::new(host.state.euro_e_token_contract);

    // Transfer tokens from the contract
    let res: Cis2ClientResult<bool> = cis2_client.transfer(
        host,
        Transfer {
            amount: TokenAmountU64(amount),
            from: Address::Contract(contract_address),
            to: Receiver::Account(sender),
            token_id: TokenIdU8(0),
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
        owner: concordium_std::Address::Account(sender),
        token_id: TokenIdU8(01),
        amount: concordium_cis2::TokenAmountU64(amount),
    };
    let lp_token_contract = host.state.lp_token_contract;
    let res = host.invoke_contract(
        &lp_token_contract,
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

    let mut user_balance = host
        .state
        .balances
        .get_mut(&sender)
        .ok_or(Error::BalanceNotFound)?;

    *user_balance = user_balance
        .checked_sub(u64::from(amount))
        .ok_or(Error::SubtractionUnderflow)?;

    Ok(())
}

/// Internal `updateOperator/permit` helper function. Invokes the
/// `add_operator/remove_operator` function of the state.
/// Logs a `UpdateOperator` event. The function assumes that the sender is
/// authorized to do the `updateOperator` action.
fn update_operator(
    update: OperatorUpdate,
    _sender: Address,
    operator: Address,
    state: &mut State,
    _builder: &mut StateBuilder,
    _logger: &mut impl HasLogger,
) -> ReceiveResult<()> {
    // Update the operator in the state.
    match update {
        OperatorUpdate::Add => state.add_operator(&operator),
        OperatorUpdate::Remove => state.remove_operator(&operator),
    }

    // // Log the appropriate event
    // logger.log(
    //     &Cis3Event::<ContractTokenId, ContractTokenAmount>::UpdateOperator(UpdateOperatorEvent {
    //         owner: sender,
    //         operator,
    //         update,
    //     }),
    // )?;

    Ok(())
}

/// Enable or disable addresses as operators of the sender address.
/// Logs an `UpdateOperator` event.
///
/// It rejects if:
/// - It fails to parse the parameter.
/// - Fails to log event.
#[receive(
    contract = "vaults",
    name = "updateOperator",
    parameter = "UpdateOperatorParams",
    error = "Error",
    enable_logger,
    mutable
)]
fn contract_update_operator(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ReceiveResult<()> {
    // Parse the parameter.
    let UpdateOperatorParams(params) = ctx.parameter_cursor().get()?;
    // Get the sender who invoked this contract function.
    let sender = ctx.sender();
    let (state, builder) = host.state_and_builder();
    for param in params {
        update_operator(param.update, sender, param.operator, state, builder, logger)?;
    }
    Ok(())
}

/// Takes a list of queries. Each query is an owner address and some address to
/// check as an operator of the owner address.
///
/// It rejects if:
/// - It fails to parse the parameter.
#[receive(
    contract = "vaults",
    name = "operatorOf",
    parameter = "OperatorOfQueryParams",
    return_value = "OperatorOfQueryResponse",
    error = "Error"
)]
fn contract_operator_of(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ReceiveResult<OperatorOfQueryResponse> {
    // Parse the parameter.
    let params: OperatorOfQueryParams = ctx.parameter_cursor().get()?;
    // Build the response.
    let mut response = Vec::with_capacity(params.queries.len());
    for query in params.queries {
        // Query the state for address being an operator of owner.
        let is_operator = host.state().is_operator(&query.address);
        response.push(is_operator);
    }
    let result = OperatorOfQueryResponse::from(response);
    Ok(result)
}
