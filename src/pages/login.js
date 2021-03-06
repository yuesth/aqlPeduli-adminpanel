import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import "./login.css"
const $ = window.jQuery

function Login() {
    const hist = useHistory()
    const [formlogin, setFormlogin] = useState({
        email: '',
        password: ''
    })
    const onChangeLogin = (e) => {
        setFormlogin({
            ...formlogin,
            [e.target.name]: e.target.value
        })
    }
    const onHandleLoginSubmit = (e) => {
        fetch('https://donasi.aqlpeduli.or.id/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formlogin)
        })
            .then(res => {
                return res.json()
            })
            .then(resjson => {
                // console.log(resjson)
                if (resjson.access_token) {
                    sessionStorage.setItem('token', JSON.stringify(resjson.access_token))
                    hist.push('/dashboard')
                }
                else {
                    var alert = document.getElementById("alertLogin")
                    alert.classList.add("show")
                    // hist.push('/')
                }
                // setToken(resjson.access_token)
                // if (resjson.access_token) {
                //     hist.push('/dashboard')
                // }
                // else {
                //     hist.push('/')
                // }
            })
        e.preventDefault()
    }
    useEffect(() => {
        $(".toggle-password").click(function () {

            $(this).toggleClass("fa-eye fa-eye-slash");
            var input = $($(this).attr("toggle"));
            var x = document.getElementById("myInput");
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        });
    })
    return (
        <>
            <div className="container">
                <div className="row justify-content-center pt-5">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        {/* <h1 className="text-center login-title loginTitle">Sign in to Form-Donasi AQL</h1> */}
                        <div className="account-wall accountWall">
                            <img className="profile-img profileImg" src={`${process.env.PUBLIC_URL}/aql-wa.jpg`} alt="logo-login" />
                            <form className="form-signin formSignin" onSubmit={onHandleLoginSubmit}>
                                <input type="text" name="email" onChange={onChangeLogin} className="form-control formControl" placeholder="Email" required />
                                <div className="form-group" style={{ position: `relative` }}>
                                    <input type="password" name="password" id="myInput" onChange={onChangeLogin} className="form-control formControl" placeholder="Password" required />
                                    <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password" style={{ position: `absolute`, right: `5px`, top: `15px` }} />
                                </div>
                                <a type="submit" style={{ color: `white`, textDecoration: `none`, width: `100%` }}><button className="btn btn-primary w-100">
                                    Sign in</button></a>
                            </form>
                            {/* <label className="checkbox pull-left">
                                <input type="checkbox" defaultValue="remember-me" />
                                    Remember me
                            </label> */}
                        </div>
                        <a href="/dashboard" className="text-center new-account newAccount">Create an account </a>
                        <br />
                        <div className="alert alert-danger alert-dismissible fade" id="alertLogin" role="alert">
                            Username/password salah!
                            {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
