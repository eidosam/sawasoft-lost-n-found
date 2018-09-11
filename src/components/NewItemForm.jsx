
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button, LinearProgress } from '@material-ui/core';

import withRoot from '../withRoot';

const styles = () => ({
    root: {
        textAlign: 'left',
        flexGrow: 1
    },
});

class NewDeviceForm extends React.Component {
    state = {
        isBusy: false
    }

    handleAdd = (event) => {
        event.preventDefault();

        const { handleAdd, fields } = this.props;

        const data = fields.reduce((data, f) =>
            Object.assign(data, {
                [f.name]: event.target[f.name].value
            }), {});

        this.setState({ isBusy: true });

        Promise.resolve(handleAdd(data)).then(() => {
            this.setState({ isBusy: false });
        });
    }

    render () {
        const { classes, itemType, fields } = this.props;
        const { isBusy } = this.state;

        const textFields = fields
            .map(field => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    key={field.name}
                >
                    <TextField
                        name={field.name}
                        label={field.friendlyName}
                        className={classes.root}
                        required={field.required}
                        defaultValue={field.defaultValue}
                        fullWidth
                    />
                </Grid>
            ));

        return (
            <div className={classes.root}>
                <Typography variant='display1'>
                    {itemType}
                </Typography>
                <form
                    onSubmit={this.handleAdd}
                    className={classes.root}
                >
                    <Grid
                        spacing={24}
                        container
                    >
                        {textFields}
                    </Grid>
                    <br />
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        disabled={isBusy}
                        fullWidth
                    >
                        Add
                    </Button>
                    {isBusy ? <LinearProgress /> : null}
                </form>
            </div>
        );
    }
}

NewDeviceForm.propTypes = {
    classes: PropTypes.object.isRequired,
    itemType: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    handleAdd: PropTypes.func.isRequired
};

export default withRoot(withStyles(styles)(NewDeviceForm));
