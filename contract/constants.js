/**
 * This is the address of the deployed contract.  Make sure to change this if you 
 * compile and deploy a new version of the contract
 * 
 * View the README for instructions on how to compile and deploy the contract.
 */
// const CONTRACT_ADDRESS = process.env.FTR_CONTRACT_ADDRESS || 'FTR_CONTRACT_ADDRESS';
const CONTRACT_ADDRESS = "0xa0865422e964feb6bf885ac8bf3420a70ef8b61c9e56b4e18ccdd666a25e62ff";

/**
 * This is the private key of the account that will be submitting transactions to the network (and thus
 * paying for them). This private key should not be shared with others - hence why it is stored server side.
 * 
 * For a production App, this should be stored as an environment variable.
 */
// const PRIVATE_KEY = process.env.FTR_PRIVATE_KEY || 'FTR_PRIVATE_KEY';
const PRIVATE_KEY = '094577139ac3c71c6b1a18e9929342d53451b55b0655ffc9111c658c377ee78fe0c08f8d0b9f479951165522b7349e4e317b7a17ca2bbb670af320bf9619fb54';


/**
 * This endpoint will be the provider for our Web3 object.
 * 
 * Get your own API Key & endpoint here: https://dashboard.nodesmith.io
 */
// const apiKey = process.env.NODESMITH_API_KEY || 'NODESMITH_API_KEY';
const apiKey = '8baef3850b99477bb204280ff5a3c7b0';



const NODE_URL = `https://api.nodesmith.io/v1/aion/testnet/jsonrpc?apiKey=${apiKey}`;

const BOND_ABI = [ { outputs: [ [Object] ],
  constant: false,
  payable: false,
  inputs: [ [Object], [Object] ],
  name: 'isFriend',
  type: 'function' },
{ outputs: [ [Object], [Object], [Object], [Object], [Object] ],
  constant: false,
  payable: false,
  inputs: [ [Object] ],
  name: 'getResolution',
  type: 'function' },
{ outputs: [ [Object] ],
  constant: true,
  payable: false,
  inputs: [],
  name: 'resolutionCount',
  type: 'function' },
{ outputs: [ [Object] ],
  constant: false,
  payable: false,
  inputs: [ [Object] ],
  name: 'finalResult',
  type: 'function' },
{ outputs: [ [Object], [Object], [Object] ],
  constant: false,
  payable: false,
  inputs: [ [Object], [Object] ],
  name: 'getFriend',
  type: 'function' },
{ outputs: [],
  constant: false,
  payable: true,
  inputs:
   [ [Object],
     [Object],
     [Object],
     [Object],
     [Object],
     [Object],
     [Object],
     [Object] ],
  name: 'newResolution',
  type: 'function' },
{ outputs: [],
  constant: false,
  payable: false,
  inputs: [ [Object], [Object] ],
  name: 'makeVote',
  type: 'function' },
{ outputs: [],
  inputs: [ [Object] ],
  name: 'ResolutionCreated',
  anonymous: false,
  type: 'event' },
{ outputs: [],
  inputs: [ [Object], [Object] ],
  name: 'VoteCreated',
  anonymous: false,
  type: 'event' },
{ outputs: [],
  inputs: [ [Object] ],
  name: 'ResolutionCompleted',
  anonymous: false,
  type: 'event' } ];

module.exports = {
  CONTRACT_ADDRESS,
  PRIVATE_KEY,
  NODE_URL,
  BOND_ABI,
}