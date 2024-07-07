import React, { useState } from 'react';
import ToDoApp from './components/ToDoApp';
import './Login.css';

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Dummy authentication logic
    if (username === 'dummy' && password === 'dummy') {
      setIsLoggedIn(true);
      // Optionally, you can clear the username and password fields after successful login
      setUsername('');
      setPassword('');
    } else {
      // Show error message or handle invalid credentials
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <ToDoApp handleLogout={handleLogout} />
          {/* <button className='logout-btn' onClick={handleLogout}>Logout</button> */}
        </div>
      ) : (
        // <div>
        //   <input
        //     type="text"
        //     placeholder="Username"
        //     value={username}
        //     onChange={(e) => setUsername(e.target.value)}
        //   />
        //   <input
        //     type="password"
        //     placeholder="Password"
        //     value={password}
        //     onChange={(e) => setPassword(e.target.value)}
        //   />
        //   <button onClick={handleLogin}>Login</button>
        // </div>
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="login-btn" type="button" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}

export default Login;
