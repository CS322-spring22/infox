import React from 'react'
import './signin.css'

function SignIn() {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        }}
    >
        <form>
            <div className="form-inner">
                <h2>Login</h2>
                {/* Error! */}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" od="password"/>
                </div>
            </div>
        </form>
    </div>
  )
}

export default SignIn;