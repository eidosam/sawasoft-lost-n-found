
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Add as AddIcon, Pageview } from '@material-ui/icons';

const styles = {};

class ActionsMenu extends React.Component {
    render () {
        const { classes, isOpen, actionsMenuToggle } = this.props;

        return (
            <Drawer
                open={isOpen}
                onClose={actionsMenuToggle}
            >
                <div
                    tabIndex={0}
                    role='button'
                    onClick={actionsMenuToggle}
                    onKeyDown={actionsMenuToggle}
                >
                    <List className={classes.list}>
                        <Link to='/add'>
                            <ListItem button>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary='Add' />
                            </ListItem>
                        </Link>
                        <Link to='/view'>
                            <ListItem button>
                                <ListItemIcon>
                                    <Pageview />
                                </ListItemIcon>
                                <ListItemText primary='View' />
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </Drawer>
        );
    }
}

ActionsMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    actionsMenuToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(ActionsMenu);
