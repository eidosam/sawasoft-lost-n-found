
import React, { Component, Fragment } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Header from './components/Header';
import ViewItems from './components/ViewItems';
import NewItemForm from './components/NewItemForm';
import mobileDeviceFields from './constants/mobile-fields';

@inject('AppStore')
@observer class App extends Component {
    render () {
        const { user, signIn, signOut, writeData } = this.props.AppStore;

        const NewDeviceComponent = () => (
            <NewItemForm
                itemType='Device'
                fields={mobileDeviceFields(user)}
                handleAdd={writeData}
            />
        );

        const ViewDevices = () => (
            <ViewItems
                fields={mobileDeviceFields(user)}
            />
        );

        return (
            <BrowserRouter>
                <Fragment>
                    <Header
                        user={user}
                        signIn={signIn}
                        signOut={signOut}
                    />
                    <Switch>
                        <Route path='/add' component={NewDeviceComponent} />
                        <Route path='/view' component={ViewDevices} />
                    </Switch>

                </Fragment>
            </BrowserRouter >
        );
    }
}

App.propTypes = {
    AppStore: PropTypes.object
};

export default App;
