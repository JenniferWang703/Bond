
const CONTRACT_ADDRESS = "0xa064dAe48Cd78C42bb43Fd913b9A3661eD20a106f22eFB3d4C333E510b68eb1e";

const NODE_URL = `http://178.128.227.209:8545`;

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
  NODE_URL,
  BOND_ABI,
}