
import firebase from 'firebase/app';
import 'firebase/auth';

import config from './firebase-config';

firebase.initializeApp(config);

const auth = firebase.auth();
auth.useDeviceLanguage();
const provider = new firebase.auth.GoogleAuthProvider();

function signIn () {
    return auth.signInWithPopup(provider)
        .then((result) => ({
            uid: result.user.uid,
            email: result.user.email,
            photoURL: result.user.photoURL,
            displayName: result.user.displayName
        }));
}

function signOut () {
    return auth.signOut();
}

export default firebase;
export { signIn, signOut };
