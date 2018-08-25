
import { observable, action } from 'mobx';
import { signIn, signOut } from '../lib/firebase';

class AppStore {
    @observable user = null;

    @action signIn = () => {
        signIn().then((user) => this.setUser(user));
    };

    @action signOut = () => {
        signOut().then(() => this.setUser(null));
    };

    @action.bound setUser = (user) => {
        this.user = user;
    };
}

export default new AppStore();
