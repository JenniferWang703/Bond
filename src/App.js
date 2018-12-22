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
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { BOND_ABI, NODE_URL, CONTRACT_ADDRESS } from './constants'
// const localWeb3 = new Web3(new Web3.providers.HttpProvider(NODE_URL));
// const contract = new localWeb3.eth.Contract(BOND_ABI, CONTRACT_ADDRESS);

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
  },
  waitingSnack: {
    background: green[600]
  },
  doneSnack: {
    background: amber[700]
  }
})
class App extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      web3: null,
      contract: null,
      createBondOpened: false,
      infoOpened:false,
      bonds: null,
      commitState: 0,//possible values 0,1,2
    };
  }

  componentDidMount = () => {
    (async () => {

    })();
  }

  handleOpenCreateBond = () => {
    this.setState({ createBondOpened: true });
  };

  handleOpenInfo = () => {
    this.setState({ infoOpened: true });
  }

  onBondCreationFinished = (bondId, txR) => {
    console.log("onBondCreationFinished:" + bondId+", "+txR)
    this.setState({ createBondOpened: false })
    if (txR != null && bondId != null) {
      this.setState({ commitState: 1 })
      const interval = window.setInterval(() => {
        this.setState({ commitState: 2 })
        this.accountChanged(window.aionweb3.eth.accounts[0]) // can be optimized
        clearInterval(interval);
        // this.state.web3.eth.getTransactionReceipt(txR, (error, receipt) => {
        //   if (error) {
        //     console.error(error);
        //   }
        //   if (receipt && receipt.status) {
        //     console.log("txR status:"+ receipt.status)
        //   }

        //   this.setState({ commitState: 2 })
        //   this.accountChanged(window.aionweb3.eth.accounts[0]) // can be optimized
        //   clearInterval(interval);
        // })
      }, 30*1000);
      
    }
  }

  //Start of the flow
  accountChanged = (newAddress) => {

    console.log(BOND_ABI)
    console.log(CONTRACT_ADDRESS)
    const contract = window.aionweb3.eth.contract(BOND_ABI).at(CONTRACT_ADDRESS)
    console.log(contract)
    const resCount = contract.resolutionCount().toNumber()
    console.log("total bonds:"+resCount)
    this.setState({
      web3: window.aionweb3,
      contract: contract
    }) 
    const participatingBonds = contract.getParticipatingResolutions(window.aionweb3.eth.accounts[0])
    console.log("bonds address participating in:"+participatingBonds)
    const cleanBonds = participatingBonds[0].map((item, index)=>{return {id:item.toNumber(), creator:participatingBonds[1][index]}} )
    console.log("parsed bonds:"+JSON.stringify(cleanBonds))
    const fullBonds= cleanBonds.map((cleanItem)=>{
      const fullBond =contract.getResolution(cleanItem.id);
      console.log("full data:"+JSON.stringify(fullBond))
      return {
            id: fullBond[0].toNumber(),
            message: fullBond[2],
            stake: (fullBond[3].toNumber() / Math.pow(10,18)).toFixed(2),
            endTime: fullBond[4].toNumber()*1000,
            friendsList: fullBond[5],
            creator: cleanItem.creator
          }
    })
    console.log(fullBonds)
    this.setState({ bonds: fullBonds })
  }

  testData = () => {
    // const testMyBonds = [];
    // for (var i = 0; i < 10; i++) {
    //   testMyBonds.push({
    //     id: i,
    //     message: "Run the Toronto marathon in May, in under 4hrs!",
    //     stake: 3 * Math.pow(10, 18),
    //     endTime: (new Date()).getTime() + 1000 * 60 * 60 * 24,
    //     friendsList: ["0xa09866ac4d3a95614d5a36ecd59977d052684451839a6216f40023aeceae8dbc",
    //       "0xa069e108b787ecd14c59b0f445e82b30c229e30cb654754d205ae0370c607fc4",
    //       "0xa0f09de1e3ef119226dbc339dc55e8c5c360bda2cca906a5602f765ef13487ca",
    //       "0xa0fda14b5d9419de84ba9b72d2cc3df29c54b7dcc5905a130de8c034d79e3187",
    //       "0xa0f80633c1b64574751f0caea24809cf495faaea0443ad23325eb6fa7e0e8e06"],
    //     creator: i < 5
    //   })
    // }
    // this.setState({ bonds: testMyBonds })
    //todo load friends bonds
  }

  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ commitState: 0 });
  };

  render() {
    const { classes } = this.props;
    const { createBondOpened, infoOpened, contract, web3, bonds, commitState } = this.state;
    let list = [];
    if (bonds === null || bonds.length === 0) {
      list.push(<EmptyListPlaceholder style={{ height: '100%', zIndex:2 }} />)
    } else {
      let myBondCount = 0;
      let myBonds = [];
      let friendsBondsCount = 0;
      let friendsBonds = [];
      bonds.forEach((bond) => {
        if (bond.creator) {
          myBonds.push(<BondListItem id={myBondCount++} bond={bond} contract={contract} web3={web3}/>)
        } else {
          friendsBonds.push(<FriendBondListItem id={friendsBondsCount++} bond={bond} contract={contract} web3={web3}/>)
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
          <Snackbar
            ContentProps={{
              classes: {
                  root: commitState == 1 ? classes.waitingSnack:classes.doneSnack
              }
          }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={commitState === 1 || commitState === 2}
            autoHideDuration={6000}
            onClose={() => { this.setState({ commitState: 0 }) }}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{commitState == 1 ? "Saving Bond to the blockchain..." : "Bond has been saved to the blockchain... "}</span>}
            action={[

              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
          <CreateBondModal
            web3={web3}
            contract={contract}
            open={createBondOpened}
            onClose={this.onBondCreationFinished} />
            <InfoModal
              open={infoOpened}
              onClose={()=>{this.setState({ infoOpened: false })}} />

        </Web3Provider>

      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(App);
