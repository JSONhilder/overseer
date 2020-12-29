// import firebase app (required)
import firebase from 'firebase/app';
// firebase auth mixin (required for every firebase feature)
import 'firebase/auth';
import { navigate } from "svelte-routing";
import { readable } from 'svelte/store';

// @TODO @FIXME - Move to env file
const firebaseConfig = {
    apiKey: "AIzaSyB6CyhRbsbKfUatgojfkTqr_zKNzi3bnUQ",
    authDomain: "overseer-1995.firebaseapp.com",
    projectId: "overseer-1995",
    storageBucket: "overseer-1995.appspot.com",
    messagingSenderId: "1043453055813",
    appId: "1:1043453055813:web:e59f726744383dfe05642c",
    measurementId: "G-QT3CRC0DZ0"
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
                localStorage.setItem("overseer_auth", "valid");
                set(user);
            } else {
                localStorage.removeItem("overseer_auth");
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