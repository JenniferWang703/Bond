pragma solidity ^0.4.15;

contract Timed {
    modifier beforeTime(uint timestamp) {
        require(block.timestamp + 15*60 < timestamp);
        _;
    }
    
    modifier afterTime(uint timestamp) {
        require(block.timestamp + 15*60 > timestamp);
        _;
    }
}

contract Staked {
    modifier costs(uint price) {
        require(msg.value == price);
        _;
    }
}

contract Bond  is Timed, Staked {
  
    struct Friend {
        address friendAddr;
        bool hasVoted; //true if yetVoted
        bool voteCompleted; //true if vote completed for the user
    }
    
    struct Resolution {
        uint128 resolutionId; //unique id for each resolution
        address bonderAddress; //user who sets the resolution
        mapping (address => Friend) friendAddressMap;
        address[] friendsList; //all participating friends
        uint128 stake; //users stake;
        string message; //resolution text
        uint128 validationCount; //total count of friends who have validated results of the resolution
        uint128 validationTrueCount; //count of friends who validated as results as true
        uint128 endTime; //deadline for the resolutions
        bool completed; //resolution has finished
    }
    
    mapping (uint128  => Resolution) resolutions;
    uint128 public resolutionCount;
    
    //Events
    event ResolutionCreated(uint128 id);
    event VoteCreated(uint128 resId, bool vote);
    event ResolutionCompleted(uint128 id);
    
    //test addresses
    //"0x53d284357ec70ce289d6d64134dfac8e511c8a3d","0xbe0eb53f46cd790cd13851d5eff43d12404d33e8","0x3bf86ed8a3153ec933786a02ac090301855e576b","0x74660414dfae86b196452497a4332bd0e6611e82","0x847ed5f2e5dde85ea2b685edab5f1f348fb140ed"
    //get number of resolution and set resolutionId
    
    //assuming fe takes care of friend valiadation
    function addNewFriend(uint128 _tempID,address _friendAddr) private {
        resolutions[_tempID].friendAddressMap[_friendAddr].friendAddr = _friendAddr;
        resolutions[_tempID].friendAddressMap[_friendAddr].hasVoted = false;
        resolutions[_tempID].friendAddressMap[_friendAddr].voteCompleted = false;
        resolutions[_tempID].friendsList.push(_friendAddr);
    }
    
    
    function newResolution(
        string _message, 
        uint128 _stake,
        uint128 _endTime,
        address friend1, 
        address friend2, 
        address friend3, 
        address friend4, 
        address friend5) costs(_stake) payable public {
            
        uint128 tempID = uint128(resolutionCount);
        // resolutions[tempID].bonderAddress = 0x847ed5f2e5dde85ea2b685edab5f1f348fb140ed; //bonderAddress = msg.sender;
        
        resolutions[tempID].bonderAddress = msg.sender; //bonderAddress = msg.sender;
        
        addNewFriend(tempID, friend1);
        addNewFriend(tempID, friend2);
        addNewFriend(tempID, friend3);
        addNewFriend(tempID, friend4);
        addNewFriend(tempID, friend5);
      
        resolutions[tempID].resolutionId = tempID;
        resolutions[tempID].message = _message;
        resolutions[tempID].stake = _stake;
        resolutions[tempID].endTime = _endTime;
        ++resolutionCount;
        
        //Raise event when successfully added a new resolution
        ResolutionCreated(tempID);
    }
    
    //check if is valid friend
    function isFriend(uint128 resolutionId, address friendAddr) public returns (bool) {
         return resolutions[resolutionId].friendAddressMap[friendAddr].friendAddr != 0;
    }
    
    function getFriend(uint128 resolutionId, address friendAddr) public returns (address, bool, bool) {
        Friend memory friend = resolutions[resolutionId].friendAddressMap[friendAddr];
        return (friend.friendAddr, friend.hasVoted, friend.voteCompleted);
    }
    
    
    function makeVote(uint128 resolutionId, bool _voteCompleted) afterTime(resolutions[resolutionId].endTime) public {
        address curFriend = msg.sender;
        require(isFriend(resolutionId, curFriend)); //change to sender.address
        require(!resolutions[resolutionId].friendAddressMap[curFriend].hasVoted);
        
        resolutions[resolutionId].friendAddressMap[curFriend].voteCompleted = _voteCompleted;
        resolutions[resolutionId].friendAddressMap[curFriend].hasVoted = true;
        resolutions[resolutionId].validationCount += 1;
        if(_voteCompleted){
            ++resolutions[resolutionId].validationTrueCount;
        }
        
        VoteCreated(resolutionId, _voteCompleted);
    }
    
    //based on he gets a refund or not
    function isGettingStakeBack(uint128 resolutionId) private returns (bool) {
        return resolutions[resolutionId].validationCount > resolutions[resolutionId].friendsList.length/2+1;
    } 
    
    //result abd pay    
    function finalResult(uint128 resolutionId) public returns (bool) {
        require(false == resolutions[resolutionId].completed);
        require(msg.sender == resolutions[resolutionId].bonderAddress);
        require(resolutions[resolutionId].validationCount>=resolutions[resolutionId].friendsList.length/2+1);
        bool result;
        result = isGettingStakeBack(resolutionId);
        //if bonder completed the resolutions
        if(result) {
            //send transaction back to resolutions[resolutionId].bonderAddress
            resolutions[resolutionId].bonderAddress.transfer(resolutions[resolutionId].stake);
        } else {
            uint shareToPay = resolutions[resolutionId].stake / resolutions[resolutionId].friendsList.length;
            for(uint128 i = 0; i < resolutions[resolutionId].friendsList.length; i++) {
                //pay resolution[resolutionId].friendVotedFalse[i] shareToPay Aion
                resolutions[resolutionId].friendsList[i].transfer(shareToPay);
             }
        }
        resolutions[resolutionId].completed = true;
        ResolutionCompleted(resolutionId);
    }
    
    //add any getter setter function as needed
    function getResolution(uint128 resolutionId) public returns(uint128, string, uint128, uint128, address[]){
        Resolution storage resolution = resolutions[resolutionId];
        return(resolutionId, resolution.message, resolution.stake, resolution.endTime, resolution.friendsList);
    }
    function getParticipatingResolutions() public returns (uint128[], bool[]){
        uint128 participationCount = 0;
        for(uint128 i=0; i<resolutionCount; i++){
            Resolution storage resolution = resolutions[i];
            if(resolution.bonderAddress == msg.sender || resolution.friendAddressMap[msg.sender].friendAddr!=0){
                ++participationCount;
            }
        }
        uint128[] memory resolutionIds = new uint128[](participationCount);
        bool[] memory creatorFlag = new bool[](participationCount);
        for(uint128 j=0; j<resolutionCount; j++){
            resolutionIds[j] = j;
            creatorFlag[j] = resolutions[j].bonderAddress == msg.sender;
        }
        return (resolutionIds, creatorFlag);
    }
}

  // ETH TEST
  // "Build Bond dApp",2,"0x14723a09acff6d2a60dcdf7aa4aff308fddc160c","0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db","0x3bf86ed8a3153ec933786a02ac090301855e576b","0x583031d1113ad414f02576bd6afabfb302140225","0xdd870fa1b7c4700f2bd7f44238821c26f7392148"
    //"todo",10000000000000000000, 1545082216,"0x14723a09acff6d2a60dcdf7aa4aff308fddc160c","0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db","0x583031d1113ad414f02576bd6afabfb302140225","0xdd870fa1b7c4700f2bd7f44238821c26f7392148","0xdd870fa1b7c4700f2bd7f44238821c26f7392148"


  // AION TEST
  // "Build Bond dApp",2, "0xa015679052e04e90919b21b76af41565d2e0c885758081544f1f465c94b39141", "0xa08755df7e0d17f9597e5fb9421163f9abd1834eee454dbe2630b79f9a544a10", "0xa06d9aaa94a7589b20f0ad99d29c33cda700428438599d41792e58e3e8a0e925", "0xa06839d325bd7e6e55daad09a3e7d8def626c0a28f8cafc630daa6c537abc755", "0xa0f7af053f66ed1ab8673e71b71ccdf6cc434f1f0e2419b151e5fb598c05e381"
    

  // Owner: {"privateKey":"0x324382e4ba8a9523459c647bee57c88ca53f4644015c2f2f7ea89a50ed5c065c719f5d767e873a07282bae8515d1b0b069fafdfe13f550ca9dd6180fc289e3f3","address":"0xa00a4dc2e632d017a72d9f515bf69c9f8dd726223a5ecbaee4e8b8e2d8dcfad5"}
  // Friend1: {"privateKey":"0x02b8a19a1b8ba396ea1c80ad97e37360a728135c14067514866facfe05ba4743fccdb4c9a0a1ca15c655b0033054d65026f7fb927def71349974bcb763731a4c","address":"0xa015679052e04e90919b21b76af41565d2e0c885758081544f1f465c94b39141"}
  // Friend2: {"privateKey":"0xb1095c1aac3a3f13f301ef5c8de681932f29454436c4275cebaa038cbaba9169c7aafb5980896e718232eea78f827a84b2816cedd9487ec297048edfc08c360b","address":"0xa08755df7e0d17f9597e5fb9421163f9abd1834eee454dbe2630b79f9a544a10"}
  // Friend3: {"privateKey":"0x845e53fd9b876c77d3c9acfa1854715a617cb8081126a2089ffb298531443252bf353c9c6e7c1fc6defc378b989a4ef603c33676c6f85a3ef28a1e652bc179f6","address":"0xa06d9aaa94a7589b20f0ad99d29c33cda700428438599d41792e58e3e8a0e925"}
  // Friend4: {"privateKey":"0x04fceeb2d8470d3014ded94bb1208e6822b6797a5b56eee5d69c35064c412a2a55e52e94f92a8e9b42a0b7c42f002f953a7c25aaabbce8bb2d1f3ce79d30b640","address":"0xa06839d325bd7e6e55daad09a3e7d8def626c0a28f8cafc630daa6c537abc755"}
  // Friend5: {"privateKey":"0x9272ef65314d17decb4a3487b3f31a38de8e1e0f9f53de3af920125213e4a46ba06d4470b02e502d5b75031aa9e43c86a8dbe085d6932eaccf09a73ae3cb17ea","address":"0xa0f7af053f66ed1ab8673e71b71ccdf6cc434f1f0e2419b151e5fb598c05e381"}

  // Mastery contract: 0xA0235F3764BEc69c27BFddeBaD4972ae36E38cEbD55aA1faB17bE10d6F81B8C0 



    /*
    function newResolutionTest(string _message, uint128 _stake, address friend1,address friend2,address friend3,address friend4,address friend5) public returns (uint128){
        uint128 tempID = uint128(resolutionCount());
        resolutions[tempID].bonderAddress = 0x847ed5f2e5dde85ea2b685edab5f1f348fb140ed;//bonderAddress = msg.sender;
        
        
        //test checkBalance
        bool enoughBalance;
        enoughBalance = checkBalance(2, resolutions[tempID].bonderAddress);
        //return enoughBalance;
        
        //test friend 
        addNewFriend(tempID,friend1);
        addNewFriend(tempID,friend2);
        addNewFriend(tempID,friend3);
        addNewFriend(tempID,friend4);
        addNewFriend(tempID,friend5);
        //return resolutions[tempID].friends;
        
        //test resolutions
        resolutions[tempID].resolutionId = tempID;
        
        resolutions[tempID].message = _message;
        //return resolutions[tempID].message;
        //return num;
        
        //test append resolution 
        allResolutions.push(tempID);
        tempID = uint128(resolutionCount());
        //return tempID;
    }
    */