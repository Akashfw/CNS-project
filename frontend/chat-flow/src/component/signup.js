import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import "../style/signup.css"

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://cns-backend-gevs.onrender.com/user/signup', {
        name,
        email,
        password,
      });
      console.log('Signup successful:', response.data);
      alert("Signup successful")
      // Reset input fields
      setName('');
      setEmail('');
      setPassword('');
      // You can add further actions here, such as showing a success message to the user
    } catch (error) {
      console.error('Error signing up:', error);
      alert("unable to signup")
      // You can add further actions here, such as showing an error message to the user
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>
          Name:
          <input type="text" required value={name} onChange={handleNameChange} />
        </label>
        <br/>
        <label>
          Email:
          <input type="email" required value={email} onChange={handleEmailChange} />
        </label>
        <br/>
        <label>
          Password:
          <input type="password" required value={password} onChange={handlePasswordChange} />
        </label>
        <br/>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
