import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ErrorIcon from '@material-ui/icons/Error'
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { DateTimePicker } from 'material-ui-pickers';
const styles = theme => ({
    root: {
        width: '100%',
        height: '100%'
    },
    card: {
        ...theme.mixins.gutters(),
        maxWidth: 500,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        marginLeft: 'auto',
        marginRight: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        position: 'absolute',
    },
    image: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
    },
    input: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    submit: {
        textAlign: 'center',
        marginBottom: 8
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2
    },
    closeButton: {
        margin: theme.spacing.unit,
        position: 'absolute',
        top: 0,
        right: 0
    },
    formItem: {
        minWidth: "240px"
    }
});
class CreateBondModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            bondMessage: null,
            stakeAmount: 1.0,
            deadline: new Date(),
            friends: [null, null, null, null, null],
            error: null
        };
    }

    render() {
        const { classes, open, onClose } = this.props;
        const { bondMessage, stakeAmount, deadline, friends, error } = this.state;
        return (

            <div id="test" >
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={onClose}>
                    <div className={classes.root}>
                        <Paper className={classes.card} elevation={1}>
                            <img alt="Aion Watermark" style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 0 }} width="250" height="250px" src="assets/images/light_aion_logo_watermark.png" />
                            <div>
                                <Typography variant="h4" gutterBottom>
                                    Bond - The Gamification of Social Accountability
                                </Typography>
                                <br/>
                                <Typography variant="h6" gutterBottom>
                                    What Is Bond?
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                State your intentions. Back your intentions. Succeed with friends.
                                </Typography>
                                <br/><br/>
                                <Typography variant="h6" gutterBottom>
                                How To Make A Bond?
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <ol>
                                        <li>Set a specific and measurable resolution, commitment or bond</li>
                                        <li>To back your bond, stake an amount of AION you’re willing to commit</li>
                                        <li>Get 5 friends to hold you accountable and enter their AION public addresses</li>
                                        <li>After the deadline, your friends vote on whether you completed, achieved or met your bond</li>
                                        <li>If you fail, they get your stake. Follow through on your word and you get your stake back</li>
                                    </ol>
                                
                                </Typography>
                                <br/>
                                <Typography variant="h6" gutterBottom>
                                    Why?
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    We make far too many empty promises and commitments. Bond is a way to promote enforceability of what we say we’ll do where each friend gets an equal vote thus gamifying social accountability. With Bond, your ability to follow through is backed and then validated. Next time you make a commitment with your friends, bond it.
                                </Typography>
                            </div>
                            <IconButton
                                aria-label="Close"
                                className={classes.closeButton}
                                onClick={() => { onClose(null) }}>
                                <CloseIcon />
                            </IconButton>
                        </Paper>
                    </div>

                </Modal>
            </div>

        );
    }
}


CreateBondModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateBondModal);