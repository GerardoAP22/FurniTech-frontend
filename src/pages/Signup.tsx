import React, { useState, SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const {signup} = useAuth()
    const navigate = useNavigate();

    const handleSubmit = async (evt: SyntheticEvent) => {
        evt.preventDefault();
        setLoading(true);
        try {
            console.log(username, email, password);
            const response = await signup(username, email, password);
            console.log(response);

            setMessage('Successfully created a new account! Redirecting...');
            setTimeout(() => {
                navigate(`/${username}`);
            }, 1500);
        } catch (err: any) {
            setMessage(err.message);
            setLoading(false);
        }
    }

    return (
      <div className="container">
        <div className="card">
          <h3 className="signup">Sign Up</h3>
          <div className="inputBox1">
            <input
              className="signup-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="user">Email</span>
          </div>
  
          <div className="inputBox">
            <input
              className="signup-input"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>Username</span>
          </div>
  
          <div className="inputBox">
            <input
              className="signup-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
          </div>
  
          <button className="enter" disabled={loading} onClick={handleSubmit}>
            {loading ? 'Signing up...' : 'Enter'}
          </button>
          {message && <p className="error-message">{message}</p>}
              <span className="signin-alt">
                {'Already a user? '}
                <Link to="/signin">Go to Signin</Link>
                {' instead.'}
            </span>
        </div>
      </div>
    );
  };
  