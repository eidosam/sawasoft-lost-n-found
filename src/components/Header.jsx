
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Avatar, Toolbar, AppBar, Button, MenuItem, Menu } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import ActionsMenu from './ActionsMenu';

const styles = () => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
});

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            actionsMenuOpen: false
        };
    }

    menuOpen = (event) => {
        this.setState({
            ...this.state,
            anchorEl: event.currentTarget
        });
    }

    menuClose = () => {
        this.setState({
            ...this.state,
            anchorEl: null
        });
    }

    actionsMenuToggle = () => {
        this.setState({
            ...this.state,
            actionsMenuOpen: !this.state.actionsMenuOpen
        });
    }

    render () {
        const { classes, user, signIn, signOut } = this.props;
        const { anchorEl, actionsMenuOpen } = this.state;
        const isMenuOpen = Boolean(anchorEl);

        return (
            <div
                className={classes.root}
            >
                <AppBar
                    position="static"
                >
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={this.actionsMenuToggle}
                        >
                            <MenuIcon />
                            <ActionsMenu
                                isOpen={actionsMenuOpen}
                                actionsMenuToggle={this.actionsMenuToggle}
                            />
                        </IconButton>
                        <Typography
                            variant="title"
                            className={classes.flex}
                        >
                        </Typography>
                        {user ?
                            (
                                <Fragment>
                                    <Avatar
                                        alt={user.displayName}
                                        src={user.photoURL}
                                        className={classes.avatar}
                                        onClick={this.menuOpen}
                                    />
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={isMenuOpen}
                                        onClose={this.menuClose}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                this.menuClose();
                                                signOut();
                                            }}
                                        >
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </Fragment>
                            )
                            : (
                                <Button
                                    color="inherit"
                                    onClick={signIn}
                                >
                                    Login
                                </Button>
                            )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    user: PropTypes.object,
    signIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
