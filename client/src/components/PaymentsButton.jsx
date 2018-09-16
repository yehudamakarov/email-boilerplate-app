import React, { Component } from 'react';
import Checkout from 'react-stripe-checkout';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        color: theme.palette.getContrastText(theme.palette.text.primary),
    },
});

class PaymentsButton extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Checkout name="Email Boilerplate App">
                <Button className={classes.button}>Add Credits</Button>
            </Checkout>
        );
    }
}

export default withStyles(styles)(PaymentsButton);
