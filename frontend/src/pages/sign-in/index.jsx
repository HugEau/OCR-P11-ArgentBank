import './signin.css'

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setConnexionToken } from '../../redux/reducer';
import { loginHandleSubmit } from '../../redux/actions';
import { signUpHandler } from '../../redux/actions';
import { useState } from 'react';

export default function SignIn() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);

    const [signUpModal, setSignUpModal] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [success, setSuccess] = useState(null);


    if (token !== null) {
        window.location.href = '/profile'
    } else {
        return (
            <main className="main">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"/>
                    <h1>Sign In</h1>
                    {success !== null ? <p className='success' onClick={() => setSuccess(null)}>{success}</p> : null}
                    <form onSubmit={async (e) => {
                        let login = await loginHandleSubmit(e)
                        console.log(login, "login")
                        if (login !== 400 || login !== 500) {
                            dispatch(setConnexionToken(login))
                            if (loginError !== null) {
                                setLoginError(null)
                            }
                        } else {
                            if (login === 400) {
                                setLoginError("Invalid email or password")
                            } else if (login === 500) {
                                setLoginError("Internal Error, please contact administrator")
                            }
                        }
                    }}>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" required/>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" required/>
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        {loginError !== null ? <p className='error'>{loginError}</p> : null}

                        <button type='submit' className="sign-in-button">Sign In</button>
                    </form>
                    <button className="sign-up-button" onClick={() => 
                        {
                            setSignUpModal(true)
                            setLoginError(null)
                        }
                        }>Sign Up</button>
                </section>
                {signUpModal ? (
                    <div className='signUpModal'>
                        <div className='signUpModalCtn'>
                            <h2>Create your account</h2>
                            <form className='signUpModalForm input-wrapper' onSubmit={async (e) => {
                                let signUp = await signUpHandler(e)
                                if (signUp !== "Compte créé avec succès !") {
                                    setSuccess(signUp)
                                    console.log("User not created")
                                } else {
                                    setSuccess(signUp)
                                    setSignUpModal(false)
                                    console.log("User created")
                                }
                            }}>
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder={"eMail"} required/>
                                <label htmlFor="password">Password</label>
                                <input type="password" placeholder={"Password"} required/>
                                <label htmlFor="first-name">First Name</label>
                                <input type="text" placeholder={"First Name"} required/>
                                <label htmlFor="last-name">Last Name</label>
                                <input type="text" placeholder={"Last Name"} required/>
                                <label htmlFor="username">Username</label>
                                <input type="text" placeholder={"Username"} required/>
                                <button type="submit" className='sign-in-button'>Send</button>
                            </form>
                            <button className='sign-up-button' onClick={() => setSignUpModal(false)}>Cancel</button>
                        </div>
                    </div>
                ) : null}
            </main>
        )
    }
}