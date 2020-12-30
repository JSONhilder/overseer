// import firebase app (required)
import firebase from 'firebase/app';
// firebase auth mixin (required for every firebase feature)
import 'firebase/auth';
import { navigate } from "svelte-routing";
import { readable } from 'svelte/store';


// @TODO @FIXME - Move to env file
const firebaseConfig = {
    apiKey: ENV.FIREBASE_API,
    authDomain: ENV.FIREBASE_DOMAIN,
    projectId: ENV.FIREBASE_PROJECT_ID,
    storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: ENV.FIREBASE_SENDER_ID,
    appId: ENV.FIREBASE_APP_ID,
    measurementId: ENV.FIREBASE_MEASUREMENT_ID
};

// initialize firebase app. required as first step
firebase.initializeApp(firebaseConfig);

// user mapper function
const userMapper = claims => ({
    id: claims.user_id,
    name: claims.name,
    email: claims.email,
    picture: claims.picture
});


export const authLib = () => {
    // get the firebase auth object
    const auth = firebase.auth();

    const loginWithEmailPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

    const loginWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        return auth.signInWithPopup(provider);
    };

    const logout = () => {
        auth.signOut();
        navigate("/login", { replace: true });
    };

    /// wrap Firbase User in a svelte readable store
    const user = readable(null, set => {
        // Firebase listener that fires when auth state changes.
        // Will be fired on login, logout and also check and fire
        // when you load or reload the page
        const unsubscribe = auth.onAuthStateChanged(async fireUser => {
            // if user is not logged in the auth will be false <- Important that it is false
            if (fireUser) {
                const token = await fireUser.getIdTokenResult();
                const user = userMapper(token.claims);
                set(user);
            } else {
                set(false);
            }
        });

        return unsubscribe;
    });

    return {
        user,
        loginWithGoogle,
        loginWithEmailPassword,
        logout
    }
};