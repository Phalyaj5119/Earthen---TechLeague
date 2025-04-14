/*import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignupPopup.css';

export default function LoginSignupPopup({ closePopup }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/signup';

    // Map frontend field `username` to backend field `name` during signup
    const { username, ...rest } = formData;
    const payload = isLogin ? rest : { ...rest, name: username };

    try {
      const response = await axios.post(url, payload);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert(`${isLogin ? 'Login' : 'Signup'} successful!`);

      // Redirect user based on role
      if (user.role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else {
        window.location.href = '/shop';
      }

    } catch (err) {
      console.error(err);
      alert('Error: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={closePopup}>X</button>

        <div className="tabs">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Sign Up</button>
        </div>

        <form className="popup-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  );
}
*/


import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignupPopup.css';

export default function LoginSignupPopup({ closePopup }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/signup';

    const { username, ...rest } = formData;
    const payload = isLogin ? rest : { ...rest, name: username };

    try {
      const response = await axios.post(url, payload);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert(`${isLogin ? 'Login' : 'Signup'} successful!`);

      if (user.role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else {
        window.location.href = '/shop';
      }

    } catch (err) {
      console.error(err);
      alert('Error: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={closePopup}>X</button>

        <div className="tabs">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Sign Up</button>
        </div>

        <form className="popup-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="forgot-password">Forgot Password?</div>

          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>

          <div className="social-login">
            <p>Or {isLogin ? 'login' : 'sign up'} with</p>
            <div className="social-login-buttons">
              <button type="button">Google</button>
              <button type="button">Facebook</button>
              <button type="button">GitHub</button>
            </div>
          </div>

          <div className="terms-text">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </form>
      </div>
    </div>
  );
}
