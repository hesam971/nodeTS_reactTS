import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



function Register () {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
    }
  
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
    }

    const registerData = { firstName, lastName, email, password };
  
    try {
      const response = await axios.post('http://localhost:8080/register', registerData);
      console.log('Registration successful:', response.data);
      clearForm();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred during registration. Please try again.");
      }
    }
  };
  

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const handleCloseError = () => {
    setError("");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          {error && (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseError}></button>
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">
              First name <sup>*</sup>
            </label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last name <sup>*</sup></label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Email address <sup>*</sup>
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Password <sup>*</sup>
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create account
          </button>
          <div className="mt-3">
            <p>Already Registered? <a href="/login">Login</a></p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
