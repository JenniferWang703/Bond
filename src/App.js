import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import EmptyListPlaceholder from './ui/EmptyListPlaceholder'
import CreateBondModal from './ui/CreateBondModal'
import BondListItem from './ui/BondListItem'
import Web3 from 'aion-web3';

import './App.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { BOND_ABI, CONTRACT_ADDRESS, NODE_URL } from './constants'
const web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL));
const contract = new web3.eth.Contract(BOND_ABI, CONTRACT_ADDRESS);

const styles = theme => ({
  root:{
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    zIndex: 1,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
})
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const { classes } = this.props;
    const { createBondOpened } = this.state;
    console.log("create:"+createBondOpened)
    return (
      <div style={{height:'100%'}}>
      
        <Grid
          className={classes.root}
          container
          direction="column"
          justify="center"
          spacing="32"
          alignItems="center">
            <BondListItem />
            <BondListItem />
            <BondListItem />
            <BondListItem />
            <BondListItem />
            <BondListItem />
            <EmptyListPlaceholder />
            <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.handleOpenCreateBond}>
              <AddIcon />
            </Fab>
        </Grid>
        <canvas id="stars" width="300" height="300"> </canvas>
        <CreateBondModal open={createBondOpened} onClose={()=>{this.setState({ createBondOpened: false })}}/>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(App);
