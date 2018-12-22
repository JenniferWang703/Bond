import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    waitingSnack: {
        background: green[600]
      },
      doneSnack: {
        background: amber[700]
      }
});
class InfoBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, open, onClose, message, duration } = this.props;
        return (
            <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={duration}
            onClose={onClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
            action={[

              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={onClose}>
                <CloseIcon />
              </IconButton>,
            ]}
          />
        );
    }
}

InfoBar.propTypes = {
    classes: PropTypes.object.isRequired,
    open:PropTypes.object.isRequired,
    onClose:PropTypes.object.isRequired,
    message:PropTypes.object.isRequired,
    duration:PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoBar);