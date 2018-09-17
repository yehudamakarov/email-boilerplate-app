import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/HomeRounded';

import { Drawer, List, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';

const styles = theme => ({
    list: {
        width: 250,
    },
});

class DrawerIcon extends Component {
    state = {
        open: false,
    };

    toggleDrawer = open => () => {
        this.setState({
            open,
        });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div>
                <MenuIcon onClick={this.toggleDrawer(true)} />
                <Drawer open={open} onClose={this.toggleDrawer(false)}>
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
        );
    }
}

export default withStyles(styles)(DrawerIcon);
