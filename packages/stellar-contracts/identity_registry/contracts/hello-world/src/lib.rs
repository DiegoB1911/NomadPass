#![no_std]
use soroban_sdk::{contract, contractimpl, Env, String, Symbol, Map, Address};

#[contract]
pub struct IdentityRegistry;

#[contractimpl]
impl IdentityRegistry {
    pub fn register_identity(env: Env, user: Address, name: String, country: String, doc_type: String, doc_hash: String) {
        let key = Symbol::short("identity");
        let mut identities: Map<Address, Map<Symbol, String>> = env
            .storage()
            .persistent()
            .get(&key)
            .unwrap_or_else(|| Map::new(&env));

        let mut data = Map::new(&env);
        data.set(Symbol::short("name"), name);
        data.set(Symbol::short("country"), country);
        data.set(Symbol::short("doc_type"), doc_type);
        data.set(Symbol::short("doc_hash"), doc_hash);
        data.set(Symbol::short("verified"), String::from_str(&env, "false"));

        identities.set(user.clone(), data);
        env.storage().persistent().set(&key, &identities);
    }

    pub fn verify_identity(env: Env, user: Address) {
        let key = Symbol::short("identity");
        let mut identities: Map<Address, Map<Symbol, String>> = env
            .storage()
            .persistent()
            .get(&key)
            .unwrap();

        if let Some(mut data) = identities.get(user.clone()) {
            data.set(Symbol::short("verified"), String::from_str(&env, "true"));
            identities.set(user.clone(), data);
            env.storage().persistent().set(&key, &identities);
        }
    }

    pub fn get_identity(env: Env, user: Address) -> Map<Symbol, String> {
        let key = Symbol::short("identity");
        let identities: Map<Address, Map<Symbol, String>> = env
            .storage()
            .persistent()
            .get(&key)
            .unwrap();

        identities.get(user).unwrap()
    }
}
