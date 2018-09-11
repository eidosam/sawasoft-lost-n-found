
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SingleItemView from './SingleItemView';
import withRoot from '../withRoot';

const styles = {};

@inject('AppStore')
@observer class ViewItems extends Component {
    render () {
        const { AppStore: { devices }, fields } = this.props;

        return (
            <Grid
                container
            >
                {
                    devices.map(dev => (
                        <Grid
                            key={dev.id}
                            item
                            xs={12}
                            sm={6}
                            lg={4}
                        >
                            <SingleItemView
                                fields={fields}
                                device={dev}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        );
    }
}

ViewItems.propTypes = {
    AppStore: PropTypes.object,
    fields: PropTypes.array
};

export default withRoot(withStyles(styles)(ViewItems));
