import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {formatEndDatePretty} from '../utils/utils'

const styles = theme => ({
  headingGrid: {
    flexGrow: 1,
  },
  card: {
    marginTop: 24,
    maxWidth: 500,
    background: 'linear-gradient(45deg, #D4005E 30%, #FCF653 90%)',
    zIndex: 1
  },
  cardContent: {
    margin: theme.spacing.unit * 4
  },
  actionsGroup: {
    background: '#ffffff',
    display:'flex'
  },
  price: {
    color: "#D4005E"
  },
  actionPositive:{
      color:"#00ff00"
  },
  actionNegative:{
    color:"#ff0000"
}
});
function makeVote(web3,contract, bondId, flag){
  console.log(web3!==null&&contract!==null&&flag)
  contract.makeVote(
    bondId, 
    flag
  ).then((res)=>{
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })
}

function FriendBondListItem(props) {
    const { classes, bond, contract, web3 } = props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Grid container
              direction="row"
              justify="space-between"
              alignItems="center">
              <Typography gutterBottom variant="h5" component="h2">
                {formatEndDatePretty(bond.endTime)}
            </Typography>
              <Typography className={classes.price} gutterBottom variant="h5" component="h2">
              {'\u00A0'}<img alt="Aion Logo" src="/assets/images/red_aion_logo.png" width="18px" height="18px" />
                {'\u00A0'}{bond.stake}
            </Typography>
            </Grid>
            <Typography className={classes.cardContent} component="p">
              {bond.message}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actionsGroup}>
            <IconButton className={classes.actionPositive} aria-label="Approve" onClick={()=>{makeVote(web3, contract, bond.id, true)}}>
                <CheckIcon />
            </IconButton>
            <IconButton className={classes.actionNegative} aria-label="Disapprove" onClick={()=>{makeVote(web3, contract, bond.id, false)}}>
                <CloseIcon />
            </IconButton>
        </CardActions>
      </Card>
    );
}

FriendBondListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FriendBondListItem);