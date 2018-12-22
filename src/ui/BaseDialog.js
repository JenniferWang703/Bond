import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({

    root: {
        backgroundImage: 'url("assets/images/light_aion_logo_watermark.png"), linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        backgroundPosition: 'right bottom',
        backgroundRepeat: 'no-repeat'
    },
    closeButton: {
        margin: theme.spacing.unit,
        position: 'absolute',
        top: 0,
        right: 0
    }
});
class BaseDialog extends Component {
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
        return (
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="scroll-dialog-title"
                modal={true}
                autoDetectWindowHeight={true}
                autoScrollBodyContent={true}
                repositionOnUpdate={true}>
                    <div className={classes.root}>
                        <MuiDialogTitle disableTypography id="scroll-dialog-title" onClose={() => onClose(null)}>
                            <Typography variant="h5" gutterBottom >
                                {this.props.title}
                            </Typography>
                            <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </MuiDialogTitle>
                        <DialogContent>
                            {this.props.children}
                        </DialogContent>
                    </div>
            </Dialog>

        );
    }
}


BaseDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.object.isRequired,
    open:PropTypes.object.isRequired,
    onClose:PropTypes.object.isRequired,
};

export default withStyles(styles)(BaseDialog);