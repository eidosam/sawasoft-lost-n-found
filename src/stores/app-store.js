
import { observable, action } from 'mobx';
import { signIn, signOut, writeData, readData } from '../lib/firebase';

class AppStore {
    @observable user = null;
    @observable devices = [];

    constructor() {
        this.readData();
    }

    @action signIn = () => {
        return signIn().then((user) => this.setUser(user));
    };

    @action signOut = () => {
        return signOut().then(() => this.setUser(null));
    };

    @action writeData = (data) => {
        return writeData(`/devices/${+new Date()}`, data);
    }

    @action readData = () => {
        return readData('/devices')
            .then(this.setDevices);
    }

    @action.bound setUser = (user) => {
        this.user = user;
    };

    @action.bound setDevices = (devices) => {
        this.devices = devices;
    };
}

export default new AppStore();
