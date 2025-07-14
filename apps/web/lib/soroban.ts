import { getAddress, signTransaction } from "@stellar/freighter-api"
// import StellarRpc from "@stellar/stellar-sdk"
import { Networks, Contract, TransactionBuilder, BASE_FEE, xdr, Transaction, rpc as StellarRpc, Address } from "@stellar/stellar-sdk"

export async function registerIdentity({ name, country, docType, docHash }: {
  name: string
  country: string
  docType: string
  docHash: string
}) {
  console.log("Registering identity with contract:", {
    name,
    country,
    docType,
    docHash
  })
    const CONTRACT_ID = "CC4UISVTMAALCI4KMEDS4L6WRKWKYKJDFU543PRYLB65ZUA7MTKLK76T";
    const NETWORK_PASSPHRASE = Networks.TESTNET;
    const walletAddress = await getAddress()
    const server = new StellarRpc.Server("https://soroban-testnet.stellar.org:443")
    const contract = new Contract(CONTRACT_ID);
    const account = await server.getAccount(walletAddress.address);
    console.log("Antes de crear la transaccion")
    console.log("walletAddress", walletAddress)

    const userAddress = Address.fromString(walletAddress.address);
    const transaction = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: NETWORK_PASSPHRASE,
    })
    .addOperation(contract.call("register_identity", 
      userAddress.toScVal(),
      xdr.ScVal.scvString(name),
      xdr.ScVal.scvString(country),
      xdr.ScVal.scvString(docType),
      xdr.ScVal.scvString(docHash)
    ))
    .setTimeout(30)
    .build()
    console.log("Despues de crear la transaccion")
    const preparedTransaction = await server.prepareTransaction(transaction)
    console.log("Despues de preparar la transaccion")
    const signedXdr = await signTransaction(preparedTransaction.toEnvelope().toXDR("base64"),{
        networkPassphrase: NETWORK_PASSPHRASE,
    })
    const signedTX = TransactionBuilder.fromXDR(signedXdr.signedTxXdr, NETWORK_PASSPHRASE) as Transaction
    console.log("Despues de firmar la transaccion")
    const txResult = await server.sendTransaction(signedTX)
    console.log("Despues de enviar la transaccion")
    console.log("Transaction result:", txResult)

    // console.log(txResult)

}

export async function verifyIdentity({ userAddress }: {
  userAddress: string
}) {
  console.log("Verifying identity for user:", userAddress)
  
  const CONTRACT_ID = "CC4UISVTMAALCI4KMEDS4L6WRKWKYKJDFU543PRYLB65ZUA7MTKLK76T";
  const NETWORK_PASSPHRASE = Networks.TESTNET;
  const walletAddress = await getAddress()
  const server = new StellarRpc.Server("https://soroban-testnet.stellar.org:443")
  const contract = new Contract(CONTRACT_ID);
  const account = await server.getAccount(walletAddress.address);
  console.log("Creating verification transaction")

  const userAddressObj = Address.fromString(userAddress);
  const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: NETWORK_PASSPHRASE,
  })
  .addOperation(contract.call("verify_identity", 
    userAddressObj.toScVal()
  ))
  .setTimeout(30)
  .build()
  
  console.log("Transaction created")
  const preparedTransaction = await server.prepareTransaction(transaction)
  console.log("Transaction prepared")
  const signedXdr = await signTransaction(preparedTransaction.toEnvelope().toXDR("base64"),{
      networkPassphrase: NETWORK_PASSPHRASE,
  })
  const signedTX = TransactionBuilder.fromXDR(signedXdr.signedTxXdr, NETWORK_PASSPHRASE) as Transaction
  console.log("Transaction signed")
  const txResult = await server.sendTransaction(signedTX)
  console.log("Transaction sent")
  console.log("Verification result:", txResult)

  return txResult
}

// Helper function to convert XDR data to literal values
function convertXdrToLiteral(xdrValue: any): any {
  if (!xdrValue || typeof xdrValue !== 'object') {
    return xdrValue
  }

  // Handle ScVal types
  if (xdrValue._switch) {
    switch (xdrValue._switch.name) {
      case 'scvString':
        if (xdrValue._value && xdrValue._value.data) {
          return Buffer.from(xdrValue._value.data).toString('utf8')
        }
        // Handle Uint8Array directly
        if (xdrValue._value && xdrValue._value instanceof Uint8Array) {
          return Buffer.from(xdrValue._value).toString('utf8')
        }
        break
      case 'scvSymbol':
        if (xdrValue._value && xdrValue._value.data) {
          return Buffer.from(xdrValue._value.data).toString('utf8')
        }
        // Handle Uint8Array directly
        if (xdrValue._value && xdrValue._value instanceof Uint8Array) {
          return Buffer.from(xdrValue._value).toString('utf8')
        }
        break
      case 'scvBool':
        return xdrValue._value === true
      case 'scvI32':
        return xdrValue._value
      case 'scvU32':
        return xdrValue._value
      case 'scvI64':
        return xdrValue._value
      case 'scvU64':
        return xdrValue._value
      case 'scvMap':
        if (xdrValue._value && Array.isArray(xdrValue._value)) {
          const result: any = {}
          xdrValue._value.forEach((item: any) => {
            if (item._attributes && item._attributes.key && item._attributes.val) {
              const key = convertXdrToLiteral(item._attributes.key)
              const value = convertXdrToLiteral(item._attributes.val)
              // Ensure key is a string
              const stringKey = typeof key === 'string' ? key : String(key)
              result[stringKey] = value
            }
          })
          return result
        }
        break
    }
  }

  return xdrValue
}

export async function getIdentity() {
  console.log("Getting identity for user")
  
  const CONTRACT_ID = "CC4UISVTMAALCI4KMEDS4L6WRKWKYKJDFU543PRYLB65ZUA7MTKLK76T";
  const NETWORK_PASSPHRASE = Networks.TESTNET;
  const walletAddress = await getAddress()
  const server = new StellarRpc.Server("https://soroban-testnet.stellar.org:443")
  const contract = new Contract(CONTRACT_ID);
  const account = await server.getAccount(walletAddress.address);
  console.log("Creating get identity transaction")

  const userAddress = Address.fromString(walletAddress.address);
  const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: NETWORK_PASSPHRASE,
  })
  .addOperation(contract.call("get_identity", 
    userAddress.toScVal()
  ))
  .setTimeout(30)
  .build()
  
  console.log("Transaction created")
  const preparedTransaction = await server.prepareTransaction(transaction)
  console.log("Transaction prepared")
  
  // Para funciones de lectura, usamos simulateTransaction
  console.log("Simulating transaction...")
  const simulation = await server.simulateTransaction(preparedTransaction)
  console.log("Simulation result:", simulation)
  
  // Verificar si la simulación fue exitosa
  if ('error' in simulation) {
    console.error("Simulation error:", simulation.error)
    throw new Error(`Simulation failed: ${simulation.error}`)
  }
  
  // Los datos están en simulation.result.retval
  if (simulation.result && simulation.result.retval) {
    console.log("Return value:", simulation.result.retval)
    
    // Convertir los datos XDR a valores literales
    const convertedData = convertXdrToLiteral(simulation.result.retval)
    console.log("Converted data:", convertedData)
    
    // Debug: mostrar la estructura del mapa
    if ((simulation.result.retval as any)._value && Array.isArray((simulation.result.retval as any)._value)) {
      console.log("Map items:")
      ;(simulation.result.retval as any)._value.forEach((item: any, index: number) => {
        console.log(`Item ${index}:`, item)
        if (item._attributes) {
          console.log(`  Key:`, item._attributes.key)
          console.log(`  Value:`, item._attributes.val)
        }
      })
    }
    
    return convertedData
  }
  
  return simulation
}
