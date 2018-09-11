
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Paper, TextField } from '@material-ui/core';
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
@observer class SingleItemView extends Component {
    render () {
        const { device, fields, classes } = this.props;

        return (
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
                            value={device[f.name] || '-'}
                            inputProps={{ className: classes.itemText }}
                            disabled
                            fullWidth
                        />
                    ))
                }
            </Paper>
        );
    }
}

SingleItemView.propTypes = {
    classes: PropTypes.object.isRequired,
    device: PropTypes.object,
    fields: PropTypes.array
};

export default withRoot(withStyles(styles)(SingleItemView));
