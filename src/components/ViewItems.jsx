
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Paper, TextField, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import withRoot from '../withRoot';

const styles = (theme) => ({
    itemContainer: {
        padding: '10px',
        margin: '10px'
    },
    itemText: {
        color: theme.palette.primary.dark
    }
});

@inject('AppStore')
@observer class ViewItems extends Component {
    render () {
        const { AppStore: { devices }, fields, classes } = this.props;

        return (
            <Fragment>
                {devices.map(dev => (
                    <Fragment
                        key={dev.id}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={12}
                        >
                            <Paper
                                elevation={1}
                                className={classes.itemContainer}
                                square
                            >
                                {
                                    fields.map(f => (
                                        <TextField
                                            key={f.name}
                                            name={f.name}
                                            label={f.friendlyName}
                                            value={dev[f.name] || '-'}
                                            inputProps={{ className: classes.itemText }}
                                            disabled
                                            fullWidth
                                        />
                                    ))
                                }
                            </Paper>
                        </Grid>
                        <br />
                    </Fragment>
                ))}
            </Fragment>
        );
    }
}

ViewItems.propTypes = {
    classes: PropTypes.object.isRequired,
    AppStore: PropTypes.object,
    fields: PropTypes.array
};

export default withRoot(withStyles(styles)(ViewItems));
