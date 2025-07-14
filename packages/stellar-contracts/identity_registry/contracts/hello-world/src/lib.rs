#![no_std]
use soroban_sdk::{contract, contractimpl, Env, String, Symbol, Map, Address, symbol_short};

#[contract]
pub struct IdentityRegistry;

#[contractimpl]
impl IdentityRegistry {
    pub fn register_identity(env: Env, user: Address, name: String, country: String, doc_type: String, doc_hash: String) {
        let key = symbol_short!("identity");
        let mut identities: Map<Address, Map<Symbol, String>> = env
            .storage()
            .persistent()
            .get(&key)
            .unwrap_or_else(|| Map::new(&env));

        let mut data = Map::new(&env);
        data.set(symbol_short!("name"), name);
        data.set(symbol_short!("country"), country);
        data.set(symbol_short!("doc_type"), doc_type);
        data.set(symbol_short!("doc_hash"), doc_hash);
        data.set(symbol_short!("verified"), String::from_str(&env, "false"));

        identities.set(user.clone(), data);
        env.storage().persistent().set(&key, &identities);
    }

    pub fn verify_identity(env: Env, user: Address) {
        let key = symbol_short!("identity");
        let mut identities: Map<Address, Map<Symbol, String>> = env
            .storage()
            .persistent()
            .get(&key)
            .unwrap();

        if let Some(mut data) = identities.get(user.clone()) {
            data.set(symbol_short!("verified"), String::from_str(&env, "true"));
            identities.set(user.clone(), data);
            env.storage().persistent().set(&key, &identities);
        }
    }

    pub fn get_identity(env: Env, user: Address) -> Map<Symbol, String> {
        let key = symbol_short!("identity");
        let identities: Map<Address, Map<Symbol, String>> = env
            .storage()
            .persistent()
            .get(&key)
            .unwrap();

        identities.get(user).unwrap()
    }
}
