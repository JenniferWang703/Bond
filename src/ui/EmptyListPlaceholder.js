import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
  card: {
    ...theme.mixins.gutters(),
    maxWidth: 390,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    overflow: 'auto'
  },
  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  }
});
class EmptyListPlaceholder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageId: 0
    };
  }

  componentDidMount() {
    this.setState({ imageId: Math.floor(1 + Math.random() * 15) })
  }

  render() {
    const { classes } = this.props;
    const randomImage = `/assets/animals/Group_${this.state.imageId}.svg`
    return (
      <div style={{zIndex:2 }}>
        <Paper className={classes.card} elevation={2}>
          <div>

            <img className={classes.image} src={randomImage} style={{ float: 'left', marginRight:'20px' }} />
            <div style={{ position: 'relative', paddingTop:'20px' }}>
              <Typography variant="h4" gutterBottom>
                Hello,
              </Typography>
              <Typography variant="h6" gutterBottom >
                Get Started by Creating a Bond
              </Typography>
            </div>

          </div>

        </Paper>
      </div>
    );
  }
}


EmptyListPlaceholder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmptyListPlaceholder);