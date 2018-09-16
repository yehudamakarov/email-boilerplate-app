import React, { Component } from 'react';
import Checkout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { handleCharge } from '../store/actions';

const styles = theme => ({
    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        color: theme.palette.getContrastText(theme.palette.text.primary),
    },
});

class PaymentsButton extends Component {
    handleToken = token => {
        const { handleCharge } = this.props;
        handleCharge(token);
    };

    render() {
        const { classes } = this.props;
        return (
            <Checkout
                name="Email Boilerplate App"
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                token={this.handleToken}
            >
                <Button className={classes.button}>Add Credits</Button>
            </Checkout>
        );
    }
}

export default withStyles(styles)(
    connect(
        null,
        { handleCharge }
    )(PaymentsButton)
);
