
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';

const styles = (/*theme*/) => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.menuOpen = this.menuOpen.bind(this);
        this.menuClose = this.menuClose.bind(this);
        this.state = {
            anchorEl: null
        };
    }

    menuOpen (event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    menuClose () {
        this.setState({ anchorEl: null });
    }

    render () {
        const { classes, user, signIn, signOut } = this.props;
        const { anchorEl } = this.state;
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
                        >
                            <MenuIcon />
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
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
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
