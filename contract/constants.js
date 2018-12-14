/**
 * This is the address of the deployed contract.  Make sure to change this if you 
 * compile and deploy a new version of the contract
 * 
 * View the README for instructions on how to compile and deploy the contract.
 */
// const CONTRACT_ADDRESS = process.env.FTR_CONTRACT_ADDRESS || 'FTR_CONTRACT_ADDRESS';
const CONTRACT_ADDRESS = "0xA0235F3764BEc69c27BFddeBaD4972ae36E38cEbD55aA1faB17bE10d6F81B8C0";

/**
 * This is the private key of the account that will be submitting transactions to the network (and thus
 * paying for them). This private key should not be shared with others - hence why it is stored server side.
 * 
 * For a production App, this should be stored as an environment variable.
 */
// const PRIVATE_KEY = process.env.FTR_PRIVATE_KEY || 'FTR_PRIVATE_KEY';
const PRIVATE_KEY = '0x324382e4ba8a9523459c647bee57c88ca53f4644015c2f2f7ea89a50ed5c065c719f5d767e873a07282bae8515d1b0b069fafdfe13f550ca9dd6180fc289e3f3';


/**
 * This endpoint will be the provider for our Web3 object.
 * 
 * Get your own API Key & endpoint here: https://dashboard.nodesmith.io
 */
// const apiKey = process.env.NODESMITH_API_KEY || 'NODESMITH_API_KEY';
const apiKey = '8baef3850b99477bb204280ff5a3c7b0';



const NODESMITH_ENDPOINT = `https://api.nodesmith.io/v1/aion/testnet/jsonrpc?apiKey=${apiKey}`;

module.exports = {
  CONTRACT_ADDRESS,
  PRIVATE_KEY,
  NODESMITH_ENDPOINT,
}