import { React, useState,  } from "react";
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';
import FormInput from "../form-input/form-input.component";


const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    // console.log(formFields)

    const SignInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email, 
                password);
            // console.log(response)
            // setCurrentUser(user)
            resetFormFields()
        }
        catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert(`Incorrect password for ${email}`)
                    break;
                case 'auth/wrong-password':
                    alert(`Incorrect username or email id`)
                    break;
                default:
                    console.log(error)
            }

        }
    };


    return (
        <div className="sign-up-container">
            <h2>Already have an account ?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit} className="form">
                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email} />
                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password} />
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType='google' type='button' onClick={SignInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
