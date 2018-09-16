
import { observable, action } from 'mobx';
import { auth, signIn, signOut, writeData, readData } from '../lib/firebase';

class AppStore {
    @observable user = null;
    @observable status = 'init';
    @observable devices = [];

    constructor() {
        this.monitorAuthState();
    }

    @action monitorAuthState = () => {
        auth.onAuthStateChanged((user) => {
            this.setUser(user);
            this.readData();
        });
    }

    @action signIn = () => {
        return signIn().then((user) => this.setUser(user));
    };

    @action signOut = () => {
        return signOut().then(() => this.setUser(null));
    };

    @action writeData = (data) => {
        return writeData(`/devices/${+new Date()}`, data)
            .then(this.readData);
    }

    @action readData = () => {
        this.setStatus('loading');
        return readData('/devices')
            .then(this.setDevices)
            .then(() => this.setStatus('ready'))
            .catch(() => this.setStatus('error'));
    }

    @action.bound setUser = (user) => {
        this.user = user;
    };

    @action.bound setStatus = (status) => {
        this.status = status;
    };

    @action.bound setDevices = (devices) => {
        this.devices = devices;
    };
}

export default new AppStore();
