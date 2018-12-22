//mainnet "0xa05a21dd82bdf6e6c5a8adb2cf1d489d4a892a008deeb5e3fc1be50e628e16ba"
//mastery "0xa080849a2c0a1c01f2c01e79f3ce4d9f023ddc6c6bcb745cadc3fcd722603598"
const CONTRACT_ADDRESS = "0xa080849a2c0a1c01f2c01e79f3ce4d9f023ddc6c6bcb745cadc3fcd722603598";
const apiKey = '8baef3850b99477bb204280ff5a3c7b0';
const NODE_URL = `https://api.nodesmith.io/v1/aion/testnet/jsonrpc?apiKey=${apiKey}`;

const BOND_ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "resolutionId",
				"type": "uint128"
			},
			{
				"name": "friendAddr",
				"type": "address"
			}
		],
		"name": "isFriend",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "resolutionId",
				"type": "uint128"
			}
		],
		"name": "getResolution",
		"outputs": [
			{
				"name": "",
				"type": "uint128"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint128"
			},
			{
				"name": "",
				"type": "uint128"
			},
			{
				"name": "",
				"type": "address[]"
			},
			{
				"name": "",
				"type": "uint128"
			},
			{
				"name": "",
				"type": "uint128"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "resolutionCount",
		"outputs": [
			{
				"name": "",
				"type": "uint128"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "addr",
				"type": "address"
			}
		],
		"name": "getParticipatingResolutions",
		"outputs": [
			{
				"name": "",
				"type": "uint128[]"
			},
			{
				"name": "",
				"type": "bool[]"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "resolutionId",
				"type": "uint128"
			}
		],
		"name": "finalResult",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "resolutionId",
				"type": "uint128"
			},
			{
				"name": "friendAddr",
				"type": "address"
			}
		],
		"name": "getFriend",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_message",
				"type": "string"
			},
			{
				"name": "_stake",
				"type": "uint128"
			},
			{
				"name": "_endTime",
				"type": "uint128"
			},
			{
				"name": "friend1",
				"type": "address"
			},
			{
				"name": "friend2",
				"type": "address"
			},
			{
				"name": "friend3",
				"type": "address"
			},
			{
				"name": "friend4",
				"type": "address"
			},
			{
				"name": "friend5",
				"type": "address"
			}
		],
		"name": "newResolution",
		"outputs": [],
		"payable": true,
		"type": "function",
		"stateMutability": "payable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "resolutionId",
				"type": "uint128"
			},
			{
				"name": "_voteCompleted",
				"type": "bool"
			}
		],
		"name": "makeVote",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint128"
			}
		],
		"name": "ResolutionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "resId",
				"type": "uint128"
			},
			{
				"indexed": false,
				"name": "vote",
				"type": "bool"
			}
		],
		"name": "VoteCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint128"
			},
			{
				"indexed": false,
				"name": "won",
				"type": "bool"
			}
		],
		"name": "ResolutionCompleted",
		"type": "event"
	}
];

module.exports = {
  CONTRACT_ADDRESS,
  NODE_URL,
  BOND_ABI,
}