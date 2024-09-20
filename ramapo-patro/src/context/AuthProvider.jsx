/* eslint-disable react/prop-types */
import React from 'react';
import { createContext } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut , sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import app from '../firebase/firebase.config';


/*
AuthProvider()
NAME
    AuthProvider
SYNOPSIS
    AuthProvider({ children });
DESCRIPTION
    This React component provides authentication functionality using Firebase. It manages user authentication state, 
    supports account creation, Google sign-in, email/password login, and password reset. The component tracks loading 
    states and stores the authenticated user, which can be accessed by other components through the `AuthContext`.
RETURNS
    Returns a context provider (`AuthContext.Provider`) that wraps the application and provides authentication data and functions.
*/


export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    /*
    createUser()
    NAME
        createUser
    SYNOPSIS
        createUser(email, password);
    DESCRIPTION
        This function creates a new user account in Firebase using an email and password. It also sets the loading state to true
        while the request is being processed.
    PARAMETERS
        - email: The user's email address.
        - password: The user's chosen password.
    RETURNS
        Returns a promise that resolves to the user's credentials if the account is successfully created.
    */
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    /*
    signUpWithGmail()
    NAME
        signUpWithGmail
    SYNOPSIS
        signUpWithGmail();
    DESCRIPTION
        This function signs in a user using Google's OAuth provider. It triggers the Google sign-in popup and sets the loading 
        state to true during the authentication process.
    RETURNS
        Returns a promise that resolves to the user's credentials if sign-in is successful.
    */
    const signUpWithGmail = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    /*
    login()
    NAME
        login
    SYNOPSIS
        login(email, password);
    DESCRIPTION
        This function logs in a user using email and password through Firebase Authentication. The loading state is set to true 
        while the login process is ongoing.
    PARAMETERS
        - email: The user's email address.
        - password: The user's password.
    RETURNS
        Returns a promise that resolves to the user's credentials upon successful login.
    */
    const login = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    /*
    logOut()
    NAME
        logOut
    SYNOPSIS
        logOut();
    DESCRIPTION
        This function logs out the current user from Firebase Authentication. It also removes the authentication token from local storage.
    RETURNS
        Returns a promise that resolves when the user is successfully logged out.
    */
    const logOut = () =>{
        localStorage.removeItem('genius-token');
        return signOut(auth);
    }

    /*
    resetPassword()
    NAME
        resetPassword
    SYNOPSIS
        resetPassword(email);
    DESCRIPTION
        This function sends a password reset email to the provided address using Firebase Authentication.
    PARAMETERS
        - email: The user's email address to send the reset link.
    RETURNS
        Returns a promise that resolves when the reset email has been successfully sent.
    */
    const resetPassword = (email) => {
        console.log("Emailtoreset:" + email);
        console.log(email);
        return sendPasswordResetEmail(auth, email);
    }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () =>{
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user, 
        loading,
        createUser, 
        login, 
        logOut,
        signUpWithGmail,
        resetPassword // Add resetPassword to the authInfo object
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;