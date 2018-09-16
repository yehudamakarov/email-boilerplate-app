import React, { Fragment } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import CircularProgress from '@material-ui/core/CircularProgress';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PaymentsButton from './PaymentsButton';

import { loadingUser } from '../store/actions';

const styles = theme => ({
    root: {
        position: 'fixed',
        bottom: 0,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: theme.spacing.unit,
    },
    loginButton: {
        fill: theme.palette.primary.contrastText,
        marginLeft: theme.spacing.unit,
    },
    buttonText: {
        color: theme.palette.primary.contrastText,
    },
    spaceRight: {
        marginRight: theme.spacing.unit,
    },
});

class Navbar extends React.Component {
    state = {
        anchorEl: null,
    };

    handleLoadingUser = () => {
        const { loadingUser } = this.props;
        loadingUser();
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, loggedIn, waitingForUser, user } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Email Boilerplate App
                    </Typography>
                    {waitingForUser && <CircularProgress className={classes.spaceRight} size={30} color="secondary" />}
                    {loggedIn ? (
                        <Fragment>
                            <PaymentsButton className={classes.spaceRight} />
                            <Typography className={classes.spaceRight} color="inherit" variant="button">
                                Credits: {user.credits}
                            </Typography>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                                className={classes.spaceRight}
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose} component="a" href="/api/logout">
                                    Log Out
                                </MenuItem>
                            </Menu>
                        </Fragment>
                    ) : (
                        <Button
                            onClick={this.handleLoadingUser}
                            className={classes.buttonText}
                            component="a"
                            href="/auth/google"
                            disabled={waitingForUser}
                        >
                            Sign In with Google
                            <VpnKey className={classes.loginButton} />
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: Boolean(state.auth.user),
    waitingForUser: state.waitingForUser,
    user: state.auth.user,
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        { loadingUser }
    )(Navbar)
);
