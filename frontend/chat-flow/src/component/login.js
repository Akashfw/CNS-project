import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import "../style/login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
       
      // Save token in session storage
      
      setEmail('');
      setPassword('');
      alert("Login successful")
      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token);
        window.location.href = '/';
      }
      // You can add further actions here, such as redirecting to another page
    } catch (error) {
      console.error('Error logging in:', error);
      alert("Login failed")
      // You can add further actions here, such as showing an error message to the user
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br/>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
