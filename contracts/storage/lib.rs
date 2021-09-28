#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
pub mod contract {
    use common::codec_types::*;
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_prelude::vec as std_vec;
    use ink_prelude::vec::Vec as StdVec;
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_storage::collections::HashMap as StorageMap;

    #[ink(storage)]
    pub struct Storage {
        // emo_bases: emo::Bases,
        deck_fixed_emo_base_ids: StdVec<u16>,
        deck_built_emo_base_ids: StdVec<u16>,
        // matchmaking_ghosts: StdVec<(AccountId, mtc::Ghost)>,
        player_seed: StorageMap<AccountId, u64>,

        // player_pool: StorageMap<AccountId, StdVec<mtc::Emo>>,
        player_health: StorageMap<AccountId, u8>,
        // player_grade_and_board_history: StorageMap<AccountId, StdVec<mtc::GradeAndBoard>>,
        player_upgrade_coin: StorageMap<AccountId, u8>,
        // player_ghosts: StorageMap<AccountId, StdVec<(AccountId, mtc::Ghost)>>,
        // player_ghost_states: StorageMap<AccountId, StdVec<mtc::GhostState>>,
        player_battle_ghost_index: StorageMap<AccountId, u8>,

        // allowed accounts
        allowed_accounts: StdVec<AccountId>,
    }

    impl Storage {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                // emo_bases: Default::default(),
                deck_fixed_emo_base_ids: Default::default(),
                deck_built_emo_base_ids: Default::default(),
                // matchmaking_ghosts: Default::default(),
                player_seed: Default::default(),
                // player_pool: Default::default(),
                player_health: Default::default(),
                // player_grade_and_board_history: Default::default(),
                player_upgrade_coin: Default::default(),
                // player_ghosts: Default::default(),
                // player_ghost_states: Default::default(),
                player_battle_ghost_index: Default::default(),

                allowed_accounts: std_vec![Self::env().caller()],
            }
        }

        #[ink(message)]
        pub fn get_emo_bases(&self) -> emo::Bases {
            // TODO: self.emo_bases.clone()
            Default::default()
        }

        #[ink(message)]
        pub fn set_emo_bases(&mut self, value: emo::Bases) {
            self.only_allowed_caller();
            // TODO: self.emo_bases = value;
        }

        #[ink(message)]
        pub fn get_deck_fixed_emo_base_ids(&self) -> StdVec<u16> {
            self.deck_fixed_emo_base_ids.clone()
        }

        #[ink(message)]
        pub fn set_deck_fixed_emo_base_ids(&mut self, value: StdVec<u16>) {
            self.only_allowed_caller();
            self.deck_fixed_emo_base_ids = value;
        }

        #[ink(message)]
        pub fn get_deck_built_emo_base_ids(&self) -> StdVec<u16> {
            self.deck_built_emo_base_ids.clone()
        }

        #[ink(message)]
        pub fn set_deck_built_emo_base_ids(&mut self, value: StdVec<u16>) {
            self.only_allowed_caller();
            self.deck_built_emo_base_ids = value;
        }

        #[ink(message)]
        pub fn get_matchmaking_ghosts(&self) -> StdVec<(AccountId, mtc::Ghost)> {
            // TODO: self.matchmaking_ghosts.clone()
            Default::default()
        }

        #[ink(message)]
        pub fn set_matchmaking_ghosts(&mut self, value: StdVec<(AccountId, mtc::Ghost)>) {
            self.only_allowed_caller();
            // TODO: self.matchmaking_ghosts = value;
        }

        #[ink(message)]
        pub fn get_player_seed(&self, account: AccountId) -> Option<u64> {
            self.player_seed.get(&account).copied()
        }

        #[ink(message)]
        pub fn set_player_seed(&mut self, account: AccountId, value: u64) {
            self.only_allowed_caller();
            self.player_seed.insert(account, value);
        }

        #[ink(message)]
        pub fn get_player_pool(&self, account: AccountId) -> Option<StdVec<mtc::Emo>> {
            // TODO: self.player_pool.get(&account).cloned()
            Default::default()
        }

        #[ink(message)]
        pub fn set_player_pool(&mut self, account: AccountId, value: StdVec<mtc::Emo>) {
            self.only_allowed_caller();
            // TODO: self.player_pool.insert(account, value);
        }

        #[ink(message)]
        pub fn take_player_pool(&mut self, account: AccountId) -> Option<StdVec<mtc::Emo>> {
            self.only_allowed_caller();
            // TODO: self.player_pool.take(&account)
            Default::default()
        }

        #[ink(message)]
        pub fn get_player_health(&self, account: AccountId) -> Option<u8> {
            self.player_health.get(&account).copied()
        }

        #[ink(message)]
        pub fn set_player_health(&mut self, account: AccountId, value: u8) {
            self.only_allowed_caller();
            self.player_health.insert(account, value);
        }

        #[ink(message)]
        pub fn take_player_health(&mut self, account: AccountId) -> Option<u8> {
            self.only_allowed_caller();
            self.player_health.take(&account)
        }

        #[ink(message)]
        pub fn get_player_grade_and_board_history(
            &self,
            account: AccountId,
        ) -> Option<StdVec<mtc::GradeAndBoard>> {
            // TODO: self.player_grade_and_board_history.get(&account).cloned()
            Default::default()
        }

        #[ink(message)]
        pub fn set_player_grade_and_board_history(
            &mut self,
            account: AccountId,
            value: StdVec<mtc::GradeAndBoard>,
        ) {
            self.only_allowed_caller();
            // TODO: self.player_grade_and_board_history.insert(account, value);
        }

        #[ink(message)]
        pub fn take_player_grade_and_board_history(
            &mut self,
            account: AccountId,
        ) -> Option<StdVec<mtc::GradeAndBoard>> {
            self.only_allowed_caller();
            // TODO: self.player_grade_and_board_history.take(&account)
            Default::default()
        }

        #[ink(message)]
        pub fn get_player_upgrade_coin(&self, account: AccountId) -> Option<u8> {
            self.player_upgrade_coin.get(&account).copied()
        }

        #[ink(message)]
        pub fn set_player_upgrade_coin(&mut self, account: AccountId, value: u8) {
            self.only_allowed_caller();
            self.player_upgrade_coin.insert(account, value);
        }

        #[ink(message)]
        pub fn take_player_upgrade_coin(&mut self, account: AccountId) -> Option<u8> {
            self.only_allowed_caller();
            self.player_upgrade_coin.take(&account)
        }

        #[ink(message)]
        pub fn get_player_ghosts(
            &self,
            account: AccountId,
        ) -> Option<StdVec<(AccountId, mtc::Ghost)>> {
            // TODO: self.player_ghosts.get(&account).cloned()
            Default::default()
        }

        #[ink(message)]
        pub fn set_player_ghosts(
            &mut self,
            account: AccountId,
            value: StdVec<(AccountId, mtc::Ghost)>,
        ) {
            self.only_allowed_caller();
            // TODO: self.player_ghosts.insert(account, value);
        }

        #[ink(message)]
        pub fn take_player_ghosts(
            &mut self,
            account: AccountId,
        ) -> Option<StdVec<(AccountId, mtc::Ghost)>> {
            self.only_allowed_caller();
            // TODO: self.player_ghosts.take(&account)
            Default::default()
        }

        #[ink(message)]
        pub fn get_player_ghost_states(
            &self,
            account: AccountId,
        ) -> Option<StdVec<mtc::GhostState>> {
            // TODO: self.player_ghost_states.get(&account).cloned()
            Default::default()
        }

        #[ink(message)]
        pub fn set_player_ghost_states(
            &mut self,
            account: AccountId,
            value: StdVec<mtc::GhostState>,
        ) {
            self.only_allowed_caller();
            // TODO: self.player_ghost_states.insert(account, value);
        }

        #[ink(message)]
        pub fn take_player_ghost_states(
            &mut self,
            account: AccountId,
        ) -> Option<StdVec<mtc::GhostState>> {
            self.only_allowed_caller();
            // TODO: self.player_ghost_states.take(&account)
            Default::default()
        }

        #[ink(message)]
        pub fn get_player_battle_ghost_index(&self, account: AccountId) -> Option<u8> {
            self.player_battle_ghost_index.get(&account).copied()
        }

        #[ink(message)]
        pub fn set_player_battle_ghost_index(&mut self, account: AccountId, value: u8) {
            self.only_allowed_caller();
            self.player_battle_ghost_index.insert(account, value);
        }

        #[ink(message)]
        pub fn take_player_battle_ghost_index(&mut self, account: AccountId) -> Option<u8> {
            self.only_allowed_caller();
            self.player_battle_ghost_index.take(&account)
        }

        // allowed accounts

        #[ink(message)]
        pub fn get_allowed_accounts(&self) -> StdVec<AccountId> {
            self.allowed_accounts.clone()
        }

        #[ink(message)]
        pub fn allow_account(&mut self, account_id: AccountId) {
            self.only_allowed_caller();
            self.allowed_accounts.push(account_id);
        }

        #[ink(message)]
        pub fn disallow_account(&mut self, account_id: AccountId) {
            self.only_allowed_caller();
            self.allowed_accounts.retain(|a| a != &account_id);
        }

        fn only_allowed_caller(&self) {
            assert!(
                self.allowed_accounts.contains(&self.env().caller()),
                "allowed accounts: this caller is not allowed: {:?}",
                &self.env().caller()
            );
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        use ink_lang as ink;

        #[ink::test]
        fn it_works() {
            let mut storage = Storage::new(false);
            assert_eq!(storage.get(), false);
            storage.set(true);
            assert_eq!(storage.get(), true);
        }
    }
}
