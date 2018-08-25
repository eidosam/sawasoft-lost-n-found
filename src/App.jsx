
import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import { signIn, signOut } from './lib/firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.state = {
            user: null
        };
    }

    signIn () {
        signIn().then((user) => this.setState({ ...this.state, user }));
    }

    signOut () {
        signOut().then(() => this.setState({ ...this.state, user: null }));
    }

    render () {
        return (
            <Fragment>
                <Header
                    user={this.state.user}
                    signIn={this.signIn}
                    signOut={this.signOut}
                />
            </Fragment>
        );
    }
}

export default App;
