import { useEffect, useContext } from 'react'
import React from 'react'
import { getRedirectResult } from 'firebase/auth'
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    auth
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';

const Authentication = () => {
    useEffect(() => {
        const asyncFetch = async () => {
            const response = await getRedirectResult(auth)
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user)
            }
            // console.log(response)
        }
        asyncFetch()

    }, [])
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        // console.log(response)
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    // const logGoogleRedirectUser = async () => {
    //     const { user } = await signInWithGoogleRedirect()
    //     console.log({user})
    // }

    return (
        <div className='authentication-container'>
          
            <SignInForm />
            <SignUpForm />
        </div>
    )
};

export default Authentication;

// import React, { useEffect } from 'react';

// import {signInWithGooglePopup,auth,signInWithGoogleRedirect , createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

// import {getRedirectResult} from 'firebase/auth'

// import { async } from '@firebase/util';

// import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

// import SignInForm from '../../components/sign-in-form/sign-in-form.component';