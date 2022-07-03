import React, { useContext, useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';
import './sign-up-form.component.scss';
import FormInput from "../form-input/form-input.component";
import  Button  from "../button/button.component";
import { UserContext } from "../contexts/user.context";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};



const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const {setCurrentUser} = useContext(UserContext)
  // console.log('Currently in the SignUp Form Component...') 

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }
  console.log(formFields)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Paswword and Confirm passwrd not matched!!')
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email, 
        password)
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
      setCurrentUser(user)
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create, email is already in use')
      } else {
        console.log(`User creation error occured ${error}`)
      }
    }
  };


  return (
    <div className="container col-md-10">
      <h2>Don't have an account ?</h2>
      <span>Sign up with your Gmail and password</span>
      <form onSubmit={handleSubmit} className="form">
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName} />
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
        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword} />

        <Button buttonType='google' type='submit' onChange={handleSubmit}>Sign Up...</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
