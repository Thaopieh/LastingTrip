import React from 'react'
import './SignIn.css'
import { Link } from 'react-router-dom';
class SignIn extends React.Component {
    state = {
        userName: "",
        password: ""
    }
    handleChangeUserName = (event) => {
        this.setState({
            userName: event.target.value
        })
    }
    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        alert("check me");
    }
    render() {
        return (
            <>
                <div className='layout-sign-in'>
                    <div className='sign-in-container'>
                        <div className='sign-in-text'>
                            Sign in
                        </div>
                        <form className='sign-in-form'>
                            <input
                                type="text"
                                className='sign-in-form-name'
                                placeholder='Username'
                                value={this.state.userName}
                                onChange={(event) => this.handleChangeUserName(event)}
                            /> <br />

                            <input
                                type="text"
                                className='sign-in-form-pw'
                                placeholder='Password'
                                value={this.state.password}
                                onChange={(event) => this.handleChangePassword(event)}
                            /> <br />

                            <input type="submit" className='sign-in-form-sm'
                                value="Submit"
                                onClick={(event) => this.handleSubmit(event)} />
                        </form>
                        <div class='sign-in-forgot' align='center'><a href='/register'>Forgot Password?</a></div>
                        <Link to="/register" className='sign-in-sign-up' align="center">Sign-up</Link>
                    </div>
                </div>
            </>
        )
    }
}
export default SignIn;