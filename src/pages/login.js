import { useState, useEffect } from 'react'
import "./login.css"

function Login(props) {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center pt-5">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <h1 className="text-center login-title loginTitle">Sign in to Form-Donasi AQL</h1>
                        <div className="account-wall accountWall">
                            <img className="profile-img profileImg" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt="logo-login" />
                            <form className="form-signin formSignin">
                                <input type="text" className="form-control formControl" placeholder="Email" required autofocus />
                                <input type="password" className="form-control formControl" placeholder="Password" required />
                                <a href="/dashboard" style={{ color: `white`, textDecoration: `none` }}><button className="btn btn-lg btn-primary w-100" type="button">
                                    Sign in</button></a>
                                <label className="checkbox pull-left">
                                    <input type="checkbox" defaultValue="remember-me" />
                                    Remember me
                                </label>
                            </form>
                        </div>
                        <a href="/dashboard" className="text-center new-account newAccount">Create an account </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login