import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
const styles = theme => ({
    root:{
        width:'100%',
        height:'100%'
    },
    card: {
        ...theme.mixins.gutters(),
        maxWidth: 500,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        marginLeft: 'auto',
        marginRight: 'auto',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
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
        padding: theme.spacing.unit*2
      },
      closeButton: {
        margin: theme.spacing.unit,
        position:'absolute',
        top:0,
        right:0
      },
});
class CreateBondModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageId: 0,
            open: props.open,
        };
    }

    componentDidMount() {
        this.setState({ imageId: Math.floor(1 + Math.random() * 15) })
    }

    submitBond = () => {

    }

    handleNewMessage = (newMessage) => {
        if (newMessage.length <= 140) {
          this.setState({ message: newMessage });
        }
      }

    render() {
        const { classes, open, onClose } = this.props;
        const randomImage = `/assets/animals/Group_${this.state.imageId}.svg`
        console.log('rendering modal')
        return (
            <div id="test" >
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={onClose}>
                    <div className={classes.root}>
                        <Paper className={classes.card} elevation={1}>
                            <div>
                                <Typography variant="h4" gutterBottom>
                                    Your Bond
                                </Typography>
                                <Grid spacing={24}>
                                    <TextField
                                        className={classes.input}
                                        id="outlined-multiline-flexible"
                                        label="Your Promise"
                                        onChange={(event) => this.handleNewMessage(event.target.value)}
                                        value={this.state.message}
                                        multiline
                                        fullWidth
                                        rowsMax="4"
                                        margin="normal"
                                        variant="outlined"/>
                                    
                                    <TextField
                                        id="standard-name"
                                        label="Your Stake"
                                        value={this.state.name}
                                        margin="normal"
                                        type="number"
                                        variant="outlined"/>
                                    {'\u00A0'}
                                    <TextField
                                        id="date"
                                        label="Your Deadline"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        margin="normal"
                                        variant="outlined"/>

                                    <Typography variant="h5" style={{marginTop:'10px'}}>Your Friends:</Typography>


                                    <div>

                                    <Grid>
                                        
                                        <TextField
                                        id="standard-name"
                                        label="Friend 1"
                                        value={this.state.name}
                                        margin="normal"
                                        variant="outlined"
                                        className={this.props.classes.input}
                                        />{'\u00A0'}
                                    <TextField
                                        id="standard-name"
                                        label="Friend 2"
                                        value={this.state.name}
                                        margin="normal"
                                        variant="outlined"
                                        className={this.props.classes.input}
                                        />
                                    <TextField
                                        id="standard-name"
                                        label="Friend 3"
                                        value={this.state.name}
                                        margin="normal"
                                        variant="outlined"
                                        className={this.props.classes.input}
                                        />{'\u00A0'}
                                    <TextField
                                        id="standard-name"
                                        label="Friend 4"
                                        value={this.state.name}
                                        margin="normal"
                                        variant="outlined"
                                        className={this.props.classes.input}
                                        />
                                    <TextField
                                        id="standard-name"
                                        label="Friend 5"
                                        value={this.state.name}
                                        margin="normal"
                                        variant="outlined"
                                        className={this.props.classes.input}
                                        />

                                    <div>
                                    
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
                            onClick={onClose}>
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