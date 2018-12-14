import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, LinearProgress, Grid, Paper, TextField, Typography } from '@material-ui/core';

const styles = theme => ({
  lightTextColor: {
    color: '#eaeaea'
  },
  margin: {
    margin: theme.spacing.unit,
  },
  input: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 600,
    marginTop: theme.spacing.unit * 4
  },
  root: {
    backgroundColor: '#282c34',
    padding:50
  },
  submit: {
    textAlign: 'center',
    marginBottom: 8
  },

});

/**
 * The record input component renders the form element that allows a user to 
 * write a message and submit that message.
 */
class RecordInput extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  /**
   * We limit the size of the input message to 140 characters.
   */
  handleNewMessage = (newMessage) => {
    if (newMessage.length <= 140) {
      this.setState({ message: newMessage });
    }
  }

  submitMessage = () => {
    this.props.submitMessage(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container alignItems="center" direction="column" className={this.props.classes.root}>
        <Grid item>
          <Typography variant="h4" className={this.props.classes.lightTextColor}>
            BOND WITH FRIENDS
          </Typography>    
        </Grid>
        <Grid item>
          <Paper className={this.props.classes.paper} elevation={1}>

              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  className={this.props.classes.input}
                  id="outlined-multiline-flexible"
                  label="Make Your Bond"
                  onChange={(event) => this.handleNewMessage(event.target.value)}
                  value={this.state.message}
                  multiline
                  fullWidth
                  rowsMax="4"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="date"
                  label="Set Your Bond"
                  type="date"
                  fullWidth
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />


                <Typography variant="h5">Add Your Friends:</Typography>


                <div>

                <TextField
                  id="standard-name"
                  label="Friend 1"
                  className={classes.textField}
                  value={this.state.name}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Friend 2"
                  className={classes.textField}
                  value={this.state.name}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Friend 3"
                  className={classes.textField}
                  value={this.state.name}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Friend 4"
                  className={classes.textField}
                  value={this.state.name}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Friend 5"
                  className={classes.textField}
                  value={this.state.name}
                  margin="normal"
                />

                <div>
                <TextField
                  id="standard-name"
                  label="Stake"
                  className={classes.textField}
                  value={this.state.name}
                  margin="normal"
                />
                </div>
            <div className={this.props.classes.submit}>
              <Button 
                variant="outlined" 
                color="primary"
                className={this.props.classes.button}
                onClick={this.submitMessage}
                value="number"
                disabled={this.state.message === ''}>
                Stake Your Bond
               
              </Button>
            </div>
            </div>
            </form>

            {(this.props.submittingMessage) ? <LinearProgress /> : null }
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

RecordInput.propTypes = {
  classes: PropTypes.object.isRequired,
  submitMessage: PropTypes.func.isRequired,
  submittingMessage: PropTypes.bool.isRequired,
};

export default withStyles(styles)(RecordInput);
