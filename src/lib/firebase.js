
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import config from './firebase-config';

firebase.initializeApp(config);

const auth = firebase.auth();
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

auth.useDeviceLanguage();
const provider = new firebase.auth.GoogleAuthProvider();

function signIn () {
    return auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => auth.signInWithPopup(provider))
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

function writeData (path, data) {
    if (!(auth && auth.currentUser)) return Promise.reject();

    Object.assign(data, {
        _metadata: {
            ts: new Date(),
            uid: auth.currentUser.uid
        }
    });

    return firestore.doc(path)
        .set(data, { merge: true });
}

function readData (path) {
    if (!(auth && auth.currentUser)) return Promise.resolve([]);

    return firestore.collection(path)
        .where('_metadata.uid', '==', auth.currentUser.uid)
        .orderBy('_metadata.ts', 'desc')
        .limit(16)
        .get()
        .then(col => {
            return col.docs.map(doc => {
                return {
                    ...doc.data(), id: doc.id
                };
            });
        });
}

export default firebase;
export { auth, signIn, signOut, writeData, readData };
