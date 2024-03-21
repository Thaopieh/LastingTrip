import React from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'
class SignUpComponent extends React.Component {
    state = {
        userName: "",
        gmail: "",
        password: "",
        rePassword: "",
        address: ""
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
    handleChangeGmail = (event) => {
        this.setState({
            gmail: event.target.value
        })
    }
    handleChangeRePassword = (event) => {
        this.setState({
            rePassword: event.target.value
        })
    }
    handleChangeAddress = (event) => {
        this.setState({
            address: event.target.value
        })
    }
    handleSignUp = (event) => {
        event.preventDefault()
        alert("check me");
    }
    render() {
        return (
            <>
                <div className='layout-sign-up'>
                    <div className='sign-up-container'>
                        <div className='sign-up-text'>
                            Sign up
                        </div>
                        <form className='sign-up-form'>
                            <input
                                type="text"
                                value={this.state.userName}
                                placeholder='Username'
                                onChange={(event) => this.handleChangeUserName(event)}
                                className='sign-up-form-name'
                            />
                            <input
                                type="text"
                                value={this.state.gmail}
                                placeholder='Gmail'
                                onChange={(event) => this.handleChangeGmail(event)}
                                className='sign-up-form-gmail' />
                            <input
                                type="text"
                                value={this.state.password}
                                className='sign-up-form-passwd'
                                placeholder='Password'
                                onChange={(event) => this.handleChangePassword(event)} />
                            <input
                                type="text"
                                value={this.state.rePassword}
                                placeholder='Re-password'
                                onChange={(event) => this.handleChangeRePassword(event)}
                                className='sign-up-form-repasswd' />
                            <input type="text"
                                value={this.state.address}
                                placeholder='Address'
                                onChange={(event) => this.handleChangeAddress(event)}
                                className='sign-up-form-address' />
                            <input
                                type="submit"
                                value="Sign up"
                                className='sign-up-form-btn'
                                onClick={(event) => this.handleSignUp(event)} />
                        </form>
                        <Link className='sign-up-sign-in' align="center" to='/login'> Sign in </Link>
                    </div>
                </div>
            </>
        )
    }
}
export default SignUpComponent;