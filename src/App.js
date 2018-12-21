import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import EmptyListPlaceholder from './ui/EmptyListPlaceholder'
import CreateBondModal from './ui/CreateBondModal'
import BondListItem from './ui/BondListItem'
import FriendBondListItem from './ui/FriendBondListItem'
import { Web3Provider } from 'react-aionweb3'
import Web3 from 'aion-web3';
import './App.css';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
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
  sectionHeader: {
    marginTop: theme.spacing.unit * 4,
    textShadow: '2px 2px rgba(0,0,0,0.3)'
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
    console.log("handleOpen:")
  };

  onBondCreationFinished = (bondId) => {
    console.log("onBondCreationFinished:" + bondId)
    this.setState({ createBondOpened: false })
    if (bondId != null) {
      this.setState({ commitState: 1 })
      setTimeout(() => {
        this.setState({ commitState: 2 })
      }, 10000)
      //todo listen to ResolutionCreated even then change commitState:2 and update list
    }
  }

  //Start of the flow
  accountChanged = (newAddress) => {


    const contract = window.aionweb3.eth.contract(BOND_ABI).at(CONTRACT_ADDRESS)
    console.log("contract:" + contract)
    this.setState({
      web3: window.aionweb3,
      contract: contract
    }) //address can be accessed from web3 object
    //todo load my bonds
    const testMyBonds = [];
    for (var i = 0; i < 10; i++) {
      testMyBonds.push({
        id: i,
        message: "Run the Toronto marathon in May, in under 4hrs!",
        stake: 3 * Math.pow(10, 18),
        endTime: (new Date()).getTime() + 1000 * 60 * 60 * 24,
        friendsList: ["0xa0b4349d567732c1287abb20880deedd84adb0f3163c9bd57a5948a1234a14b5",
          "0xa0cfbefa57d686eeb52480734f28755be073cb8c71b757a7401b1dd46b5b45de",
          "0xa06d969971c704fca794718754cafb4486b637621dc76c10a1fd6e6b82a15b1a",
          "0xa04eeb41d3b82447b85163119845767e019153b5a8f220896bdc08460d1696bc",
          "0xa058b4acf2e61ecff2f00c0cf47ae4107c6f8c259aa662f2e159053c8d25ef22"],
        creator: i < 5
      })
    }
    this.setState({ bonds: testMyBonds })
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
    const { createBondOpened, contract, web3, bonds, commitState } = this.state;
    let list = [];
    if (bonds === null || bonds.length === 0) {
      list.push(<EmptyListPlaceholder style={{ height: '100%' }} />)
    } else {
      let myBondCount = 0;
      let myBonds = [];
      let friendsBondsCount = 0;
      let friendsBonds = [];
      bonds.forEach((bond) => {
        if (bond.creator) {
          myBonds.push(<BondListItem id={myBondCount++} bond={bond} />)
        } else {
          friendsBonds.push(<FriendBondListItem id={friendsBondsCount++} bond={bond} />)
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

        </Web3Provider>

      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(App);
