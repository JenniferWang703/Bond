import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import EmptyListPlaceholder from './ui/EmptyListPlaceholder'
import CreateBondModal from './ui/CreateBondModal'
import BondListItem from './ui/BondListItem'
import FriendBondListItem from './ui/FriendBondListItem'
import InfoModal from './ui/InfoModal'
import { Web3Provider } from 'react-aionweb3'
import './App.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import InfoBar from './ui/InfoBar';
import { BOND_ABI, CONTRACT_ADDRESS } from './constants'

const styles = theme => ({
  root: {
    minHeight: "100%",
    zIndex: 1,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    zIndex: 1,
    right: "20%",
    margin: '0 auto',
  },
  fabLeft: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    zIndex: 1,
    left: "20%",
    margin: '0 auto',
  },
  sectionHeader: {
    marginTop: theme.spacing.unit * 4,
    textShadow: '2px 2px rgba(0,0,0,0.3)',
    zIndex: 2
  }
})
class App extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      web3: null,
      contract: null,
      createBondOpened: false,
      infoOpened: false,
      bonds: null,
      commitState: 0,//0=hidden, 1=committing, 2=finished
    };
  }

  componentDidMount = () => {
  }

  handleOpenCreateBond = () => {
    this.setState({ createBondOpened: true });
  };

  handleOpenInfo = () => {
    this.setState({ infoOpened: true });
  }

  onBondCreationFinished = (bondId, txR) => {
    console.log("onBondCreationFinished:" + bondId + ", " + txR)
    this.setState({ createBondOpened: false })
    if (txR != null && bondId != null) {
      this.setState({ commitState: 1 })
      const interval = window.setInterval(() => { // not an optimal solution as events are not working with nodesmith and polling getTransactionReceipt is not working currently
        this.setState({ commitState: 2 })
        this.accountChanged(window.aionweb3.eth.accounts[0]) 
        clearInterval(interval);
      }, 30 * 1000);
    }
  }

  //Start of the flow
  accountChanged = (newAddress) => {

    console.log(BOND_ABI)
    console.log(CONTRACT_ADDRESS)
    const contract = window.aionweb3.eth.contract(BOND_ABI).at(CONTRACT_ADDRESS)
    console.log(contract)
    const resCount = contract.resolutionCount().toNumber()
    console.log("Total bonds:" + resCount)
    this.setState({
      web3: window.aionweb3,
      contract: contract
    })
    const fullBonds = [];
    for(var i=0; i<resCount; i++){
      const fullBond = contract.getResolution(i);
      const bond = {
        id: fullBond[0].toNumber(),
        address: fullBond[1],
        message: fullBond[2],
        stake: (fullBond[3].toNumber() / Math.pow(10, 18)).toFixed(2),
        endTime: fullBond[4].toNumber() * 1000,
        friendsList: fullBond[5],
        creator: null
      }
      if(bond.address===window.aionweb3.eth.accounts[0]){
        bond.creator = true;
        fullBonds.push(bond);
      }else if(bond.friendsList.includes(window.aionweb3.eth.accounts[0])){
        bond.creator = false;
        fullBonds.push(bond);
      }
    }
    this.setState({ bonds: fullBonds })
  }

  testData = () => {
    const testMyBonds = [];
    for (var i = 0; i < 10; i++) {
      testMyBonds.push({
        id: i,
        message: "Run the Toronto marathon in May, in under 4hrs!",
        stake: 3 * Math.pow(10, 18),
        endTime: (new Date()).getTime() + 1000 * 60 * 60 * 24,
        friendsList: ["0xa09866ac4d3a95614d5a36ecd59977d052684451839a6216f40023aeceae8dbc",
          "0xa069e108b787ecd14c59b0f445e82b30c229e30cb654754d205ae0370c607fc4",
          "0xa0f09de1e3ef119226dbc339dc55e8c5c360bda2cca906a5602f765ef13487ca",
          "0xa0fda14b5d9419de84ba9b72d2cc3df29c54b7dcc5905a130de8c034d79e3187",
          "0xa0f80633c1b64574751f0caea24809cf495faaea0443ad23325eb6fa7e0e8e06"],
        creator: i < 5
      })
    }
    this.setState({ bonds: testMyBonds })
  }

  render() {
    const { classes } = this.props;
    const { createBondOpened, infoOpened, contract, web3, bonds, commitState } = this.state;
    let list = [];
    if (bonds === null || bonds.length === 0) {
      list.push(<EmptyListPlaceholder style={{ height: '100%', zIndex: 2 }} />)
    } else {
      let myBondCount = 0;
      let myBonds = [];
      let friendsBondsCount = 0;
      let friendsBonds = [];
      bonds.forEach((bond) => {
        if (bond.creator) {
          myBonds.push(<BondListItem id={myBondCount++} bond={bond} contract={contract} web3={web3} />)
        } else {
          friendsBonds.push(<FriendBondListItem id={friendsBondsCount++} bond={bond} contract={contract} web3={web3} />)
        }
      })
      if (myBonds.length > 0) {
        myBonds.unshift(
          <Typography id={myBondCount++} className={classes.sectionHeader} variant="h3" gutterBottom>
            Your Bonds
            </Typography>
        )
        list.push(...myBonds)
      }
      if (friendsBonds.length > 0) {
        friendsBonds.unshift(
          <Typography id={friendsBondsCount++} className={classes.sectionHeader} variant="h3" gutterBottom>
            Friend's Bonds
            </Typography>
        )
        list.push(...friendsBonds)
      }
    }

    return (
      <div style={{ height: '100%' }}  >
        <canvas id="stars" width="300" height="300"> </canvas>
        <Web3Provider style={{ zIndex: 1 }} onChangeAccount={newAddress => this.accountChanged(newAddress)}>

          <Grid
            className={classes.root}
            container
            direction="column"
            justify="center"
            spacing="32"
            alignItems="center">
              {list}
          </Grid>

          <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.handleOpenCreateBond}>
            <AddIcon />
          </Fab>
          <Fab color="secondary" aria-label="Info" className={classes.fabLeft} onClick={this.handleOpenInfo}>
            <InfoIcon color="primary" />
          </Fab>

          <InfoBar
            onClose={() => { this.setState({ commitState: 0 }) }}
            open={commitState === 1 || commitState === 2}
            duration={commitState==1? 25000 : 5000 }
            message={commitState == 1 ? "Saving data to the blockchain..." : "Data has been saved to the blockchain... "}/>
          
          <CreateBondModal
            web3={web3}
            contract={contract}
            open={createBondOpened}
            onClose={this.onBondCreationFinished} />
          <InfoModal
            open={infoOpened}
            onClose={() => { this.setState({ infoOpened: false }) }} />

        </Web3Provider>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(App);
