use anchor_lang::prelude::*;
use anchor_spl::token;
use anchor_spl::token::{Token, InitializeMint, MintTo, Transfer, Mint, TokenAccount, Burn};
declare_id!("z4oSXTazUpK5nP1ZmoZdQwvju2sbV8cc1CphnNDwrFJ");
#[program]
pub mod token_contract {
    use super::*;

    pub fn stake_tokens(ctx: Context<StakeToken>,amount:u64)->Result<()>{

        // Transfer tokens from the user's account to the pool's account
        let cpi_accounts = Transfer {
            from: ctx.accounts.user_token_account.to_account_info(),
            to: ctx.accounts.pool_token_account.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        // Mint equivalent amount of reward tokens to the user's reward token account
        let mint_cpi_accounts = MintTo {
            mint: ctx.accounts.reward_token_mint.to_account_info(),
            to: ctx.accounts.user_reward_token_account.to_account_info(),
            authority: ctx.accounts.mint_authority.to_account_info(),
        };
        let mint_cpi_program = ctx.accounts.token_program.to_account_info();
        let mint_cpi_ctx = CpiContext::new(mint_cpi_program, mint_cpi_accounts);
        token::mint_to(mint_cpi_ctx, amount)?;

        Ok(())
    }

    pub fn unstake_tokens(ctx: Context<UnstakeTokens>, pool_seed: Vec<u8>,bump:u8, amount: u64) -> Result<()> {
    // Burn the equivalent amount of reward tokens from the user's account
        let burn_cpi_accounts = Burn {
            mint: ctx.accounts.reward_token_mint.to_account_info(),
            from: ctx.accounts.user_reward_token_account.to_account_info(),
            authority: ctx.accounts.burn_authority.to_account_info(),
        };
        let burn_cpi_program = ctx.accounts.token_program.to_account_info();
        let burn_cpi_ctx = CpiContext::new(burn_cpi_program, burn_cpi_accounts);
        token::burn(burn_cpi_ctx, amount)?;

        // Transfer the originally staked tokens from the pool's account back to the user's account
        let seeds = &[pool_seed.as_slice(), &[bump]];
        let signer = &[&seeds[..]];
        let transfer_cpi_accounts = Transfer {
            from: ctx.accounts.pool_token_account.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: ctx.accounts.pool_token_account.to_account_info(), // This may need to be adjusted based on who has authority over the pool account
        };
        let transfer_cpi_program = ctx.accounts.token_program.to_account_info();
        let transfer_cpi_ctx = CpiContext::new_with_signer(
            transfer_cpi_program,
            transfer_cpi_accounts,
            signer,
        );
        token::transfer(transfer_cpi_ctx, amount)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct  StakeToken<'info> {
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>, // User's account for the staked tokens
    #[account(init, payer = user, space = TokenAccount::LEN, seeds = [b"pool"], bump)]
    pub pool_token_account: Account<'info, TokenAccount>, // Pool's account to receive the staked tokens
    #[account(mut)]
    pub reward_token_mint: Account<'info, Mint>, // Mint for the reward tokens
    #[account(init_if_needed, payer = user, token::mint = reward_token_mint, token::authority = user)]
    pub user_reward_token_account: Account<'info, TokenAccount>, // User's account to receive the reward tokens
    #[account(signer, mut)]
    pub user: AccountInfo<'info>, // The user staking the tokens
    #[account(signer)]
    pub mint_authority: AccountInfo<'info>, // Authority to mint reward tokens, likely the contract itself
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>, // Needed for account creation
    pub rent: Sysvar<'info, Rent>, // Needed for account creation
}

#[derive(Accounts)]
pub struct UnstakeTokens<'info> {
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>, // User's account for the staked tokens (to return the stake)
    #[account(
        mut,
        seeds = [b"pool"],
        bump
    )]
    pub pool_token_account: Account<'info, TokenAccount>, // Pool's account holding the staked tokens
    #[account(mut)]
    pub user_reward_token_account: Account<'info, TokenAccount>, // User's account holding the reward tokens (to be burned)
    #[account(mut)]
    pub reward_token_mint: Account<'info, Mint>, // Mint of the reward tokens (needed for burning)
    #[account(signer)]
    pub user: AccountInfo<'info>, // The user unstaking the tokens
    #[account(signer)]
    pub burn_authority: AccountInfo<'info>, // Authority to burn reward tokens, usually the user
    pub token_program: Program<'info, Token>,
}

// impl<'info> UnstakeTokens<'info> {
//     // Helper function to derive the PDA for `pool_token_account`.
//     // This can be used within the instruction handler to validate or authorize actions.
//     fn get_pool_signer_seeds(&self) -> [&[u8]; 2] {
//         [b"pool", &[self.pool_token_account.bump]]
//     }
// }
