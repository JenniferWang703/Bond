import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {formatEndDatePretty} from '../utils/utils'

const styles = theme => ({
  headingGrid: {
    flexGrow: 1,
  },
  card: {
    marginTop: 24,
    maxWidth: 500,
    minWidth: 500,
    background: 'linear-gradient(45deg, #D4005E 30%, #FCF653 90%)',
    zIndex: 1
  },
  cardContent: {
    margin: theme.spacing.unit * 4
  },
  actionsGroup: {
    background: '#ffffff'
  },
  price: {
    color: "#D4005E"
  }
});

function payout(web3, contract, bondId){
  console.log(web3!==null&&contract!==null)
  contract.finalResult(
    bondId
  ).then((res)=>{
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })
}

function BondListItem(props) {
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
        <Button size="small" color="primary" onClick={()=>{payout(web3,contract, bond.id)}}>
          Complete
        </Button>
      </CardActions>
    </Card>
  );
}

BondListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BondListItem);