import React from 'react'
import './Login.css'
class LoginComponent extends React.Component {
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
                <div className='layout-log-in'>
                    <div className='log-in-container'>
                        <div className='log-in-text'>
                            Log in
                        </div>
                        <form className='log-in-form'>
                            <input
                                type="text"
                                className='log-in-form-name'
                                placeholder='Username'
                                value={this.state.userName}
                                onChange={(event) => this.handleChangeUserName(event)}
                            /> <br />

                            <input
                                type="text"
                                className='log-in-form-pw'
                                placeholder='Password'
                                value={this.state.password}
                                onChange={(event) => this.handleChangePassword(event)}
                            /> <br />

                            <input type="submit" className='log-in-form-sm'
                                value="Submit"
                                onClick={(event) => this.handleSubmit(event)} />
                        </form>
                    </div>
                </div>
            </>
        )
    }
}
export default LoginComponent;
