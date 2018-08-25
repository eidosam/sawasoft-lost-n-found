
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Header from './components/Header';

@inject('AppStore')
@observer class App extends Component {
    render () {
        const { user, signIn, signOut } = this.props.AppStore;

        return (
            <Fragment>
                <Header
                    user={user}
                    signIn={signIn}
                    signOut={signOut}
                />
            </Fragment>
        );
    }
}

App.propTypes = {
    AppStore: PropTypes.object
};

export default App;
