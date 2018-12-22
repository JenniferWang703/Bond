import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BaseDialog from './BaseDialog'

const styles = theme => ({
});
class InfoModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { open, onClose } = this.props;
        return (
            <BaseDialog title={"Bond - The Gamification of Social Accountability"}
                open={open}
                onClose={onClose}>
                <div>
                    <Typography variant="h6" gutterBottom >
                        What Is Bond?
                            </Typography>
                    <Typography variant="body1" gutterBottom >
                        State your intentions. Back your intentions. Succeed with friends.
                            </Typography>
                    <br />
                    <Typography variant="h6" gutterBottom >
                        How To Make A Bond?
                            </Typography>
                    <Typography variant="body1" gutterBottom >
                        <ol>
                            <li>Set a specific and measurable resolution, commitment or bond</li>
                            <li>To back your bond, stake an amount of AION you’re willing to commit</li>
                            <li>Get 5 friends to hold you accountable and enter their AION public addresses</li>
                            <li>After the deadline, your friends vote on whether you completed, achieved or met your bond</li>
                            <li>If you fail, they get your stake. Follow through on your word and you get your stake back</li>
                        </ol>

                    </Typography>
                    <Typography variant="h6" gutterBottom >
                        Why?
                            </Typography>
                    <Typography variant="body1" gutterBottom >
                        We make far too many empty promises and commitments. Bond is a way to promote enforceability of what we say we’ll do where each friend gets an equal vote thus gamifying social accountability. With Bond, your ability to follow through is backed and then validated. Next time you make a commitment with your friends, bond it.
                    </Typography>
                </div>
            </BaseDialog>
        );
    }
}


InfoModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoModal);