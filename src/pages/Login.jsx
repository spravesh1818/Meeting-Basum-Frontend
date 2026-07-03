import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/Login.css';
import Logo from '../components/Logo'
import { login } from '../services/AuthService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { LoginFormSchemaResolver } from '../schemas/LoginForm.schema';



function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: LoginFormSchemaResolver,
  });


  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const response = await login(email, password);

      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      setUser(response.data.user);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Login failed! Please try again.');
    }
  }



  return (
    <div className="login-container">
      <img className="logoo" src="ntclogoo.png"></img>
      <div className="login-card">

        <div className="brand-header">
          <div className="brand-logo">
            <Logo />
          </div>
          <p className="brand-subtitle">Welcome! Sign in to your account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>

          <div className="input-group">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <span className="error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.email.message}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">PASSWORD</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} id="password" placeholder="password123" {...register("password")} />
              <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          <button type="submit" className="submit-btn">Login</button>

        </form>

        <div className="form-divider">
          <span>or</span>
        </div>

        <div className="form-footer">
          <span className='form-span'>Don't have an account? <a className="signup-link" onClick={() => navigate("/Register")}>Register here</a></span>
        </div>
      </div>
    </div>
  );
};

export default Login;