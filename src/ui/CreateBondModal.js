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
import { DatePicker } from 'material-ui-pickers';
import { formatEndDate } from '../utils/utils'
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

    componentDidMount() {
        this.setState({ imageId: Math.floor(1 + Math.random() * 15) })
    }

    submitBond = () => {
        this.validate(this.state.bondMessage,
            this.state.stakeAmount,
            this.state.deadline,
            this.state.friends)
            .then((data) => {
                //fake
                // this.props.onClose(0);
                // return;
                // end fake
                this.setState({ error: null })
                console.log(data.bondMessage+","+
                    data.stakeAmount+","+
                    Math.floor(data.deadline.getTime()/1000)+","+
                    JSON.stringify(data.friends))
                    
                const create = this.props.contract.newResolution(data.bondMessage,
                    data.stakeAmount*Math.pow(10,18),
                    Math.floor(data.deadline.getTime()/1000),
                    data.friends[0],
                    data.friends[1],
                    data.friends[2],
                    data.friends[3],
                    data.friends[4],
                    { gas: 2000000, from: this.props.web3.eth.accounts[0],to:this.props.web3.eth.accounts[0], value: data.stakeAmount*Math.pow(10,18) })
                return create;
            }).then((result) => {
                return this.props.contract.resolutionCount.call()
            }).then((resId) => {
                this.props.onClose(resId)
            }).catch((error) => {
                this.setState({ error: error.toString() })
            })
    }

    validate = (msg, amount, deadline, friends) => {

        const friendsListValid = !friends.map((friend) => friend !== null && friend.length == 66).includes(false)
        return new Promise((resolve, reject) => {
            if ((msg !== null && msg.length > 1) && (amount !== null && amount > 0) && (deadline !== null) && friendsListValid) {
                resolve({
                    bondMessage: msg,
                    stakeAmount: amount,
                    deadline: deadline,
                    friends: friends
                })
            } else {
                if (msg === null || msg.length === 0) {
                    reject("Please enter your Bond promise")
                }
                if (amount === null || amount === 0) {
                    reject("Please enter a valid Aion amount to stake")
                }
                console.log("deadline:" + deadline)
                if (deadline === null) { // validate date
                    reject("Please enter a valid date for your Bond")
                }
                if (!friendsListValid) {
                    reject("Please enter 5 valid Aion adresses")
                }
            }
        })
    }

    handleBondMessage = (newMessage) => {
        this.setState({ bondMessage: newMessage });
    }

    handleBondStake = (newStakeAmount) => {
        this.setState({ stakeAmount: newStakeAmount });
    }

    handleBondDeadline = (newDeadline) => {
        this.setState({ deadline: newDeadline });
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
                                    Your Bond
                                </Typography>
                                <Grid spacing={24}>
                                    <TextField
                                        className={classes.input}
                                        id="outlined-multiline-flexible"
                                        label="Your Promise"
                                        onChange={(event) => this.handleBondMessage(event.target.value)}
                                        value={bondMessage}
                                        multiline
                                        fullWidth
                                        rowsMax="4"
                                        margin="normal"
                                        variant="outlined" />

                                    <TextField
                                        id="standard-name"
                                        label="Your Stake"
                                        onChange={(event) => this.handleBondStake(event.target.value)}
                                        value={stakeAmount}
                                        margin="normal"
                                        type="number"
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <img alt="Aion Logo" src="/assets/images/white_aion_logo.png" width="20px" height="20px" />
                                                </InputAdornment>
                                            )
                                        }} />
                                    {'\u00A0'}
                                    <DatePicker
                                        margin="normal"
                                        label="Your Deadline"
                                        value={deadline}
                                        onChange={this.handleBondDeadline}
                                        variant="outlined"
                                    />

                                    <Typography variant="h5" style={{ marginTop: '10px' }}>Your Friends:</Typography>


                                    <div>

                                        <Grid>

                                            <TextField
                                                id="standard-name"
                                                label="Friend 1"
                                                onChange={(event) => { friends[0] = event.target.value }}
                                                value={friends[0]}
                                                margin="normal"
                                                variant="outlined"
                                                className={this.props.classes.input}
                                            />{'\u00A0'}
                                            <TextField
                                                id="standard-name"
                                                label="Friend 2"
                                                onChange={(event) => { friends[1] = event.target.value }}
                                                value={friends[1]}
                                                margin="normal"
                                                variant="outlined"
                                                className={this.props.classes.input}
                                            />
                                            <TextField
                                                id="standard-name"
                                                label="Friend 3"
                                                onChange={(event) => { friends[2] = event.target.value }}
                                                value={friends[2]}
                                                margin="normal"
                                                variant="outlined"
                                                className={this.props.classes.input}
                                            />{'\u00A0'}
                                            <TextField
                                                id="standard-name"
                                                label="Friend 4"
                                                onChange={(event) => { friends[3] = event.target.value }}
                                                value={friends[3]}
                                                margin="normal"
                                                variant="outlined"
                                                className={this.props.classes.input}
                                            />
                                            <TextField
                                                id="standard-name"
                                                label="Friend 5"
                                                onChange={(event) => { friends[4] = event.target.value }}
                                                value={friends[4]}
                                                margin="normal"
                                                variant="outlined"
                                                className={this.props.classes.input}
                                            />

                                            <div>
                                                {error !== null ?
                                                    <span>

                                                        <Typography variant="subtitle" gutterBottom style={{ color: "#c41111" }}>
                                                            <ErrorIcon />
                                                            {'\u00A0'}<b>{error}</b>
                                                        </Typography>
                                                    </span> : null}

                                                <div className={classes.submit}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={this.state.message === ''}
                                                        className={classes.button}
                                                        onClick={this.submitBond}>
                                                        Stake Your Bond
                                            <CloudUploadIcon className={classes.rightIcon} />
                                                    </Button>
                                                </div>

                                            </div>
                                        </Grid>
                                    </div>
                                </Grid>
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