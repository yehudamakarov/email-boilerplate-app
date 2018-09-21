import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    CircularProgress,
    MenuItem,
    Menu,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import VpnKey from '@material-ui/icons/VpnKey';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/HomeRounded';
import AccountCircle from '@material-ui/icons/AccountCircle';

import PaymentsButton from './PaymentsButton';

import { loadingUser } from '../store/actions';

const styles = theme => ({
    root: {
        position: 'fixed',
        bottom: 0,
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none',
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
    list: {
        width: 250,
    },
});

class Navbar extends React.Component {
    state = {
        anchorEl: null,
        drawerOpen: false,
    };

    toggleDrawer = drawerOpen => event => {
        event.stopPropagation();
        this.setState({
            drawerOpen,
        });
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
        const { anchorEl, drawerOpen } = this.state;
        const menuOpen = Boolean(anchorEl);

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={this.toggleDrawer(true)}
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                    >
                        <div>
                            <MenuIcon />
                            <Drawer open={drawerOpen} onClose={this.toggleDrawer(false)}>
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer(false)}
                                    onKeyDown={this.toggleDrawer(false)}
                                >
                                    <div className={classes.list}>
                                        <List>
                                            <ListItem button component={Link} to="/surveys">
                                                <ListItemIcon>
                                                    <HomeIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Dashboard" />
                                            </ListItem>
                                        </List>
                                    </div>
                                </div>
                            </Drawer>
                        </div>
                    </IconButton>
                    <Typography component={Link} to="/" variant="title" color="inherit" className={classes.title}>
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
                                aria-owns={menuOpen ? 'menu-appbar' : null}
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
                                open={menuOpen}
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
