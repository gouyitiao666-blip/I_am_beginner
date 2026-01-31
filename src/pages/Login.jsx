import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginWithProvider,
  loginWithStudentAccount,
  requestMagicLink,
} from "../mockApi.js";
import InputField from "../components/InputField.jsx";
import Toast from "../components/Toast.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sso, setSso] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const handleProviderLogin = async (provider) => {
    setLoading(true);
    setError("");
    try {
      await loginWithProvider(provider);
      navigate("/application");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await loginWithStudentAccount({ email, password, sso });
      navigate("/application");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    setLoading(true);
    setError("");
    try {
      await requestMagicLink(email);
      setToast("Magic link sent to your email address.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth">
      <div className="auth-card">
        <div className="auth-header">
          <p className="eyebrow">Welcome back</p>
          <h1>Continue your scholarship application.</h1>
        </div>

        <button
          type="button"
          className="btn oauth google"
          onClick={() => handleProviderLogin("Google")}
          disabled={loading}
        >
          Continue with Google
        </button>
        <button
          type="button"
          className="btn oauth apple"
          onClick={() => handleProviderLogin("Apple")}
          disabled={loading}
        >
          Continue with Apple
        </button>

        <form className="auth-form" onSubmit={handleStudentLogin}>
          <div className="divider-row">
            <span>or</span>
          </div>

          <InputField
            id="email"
            label="Student email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@school.edu"
            required
          />

          {!sso && (
            <InputField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimum 6 characters"
              required
            />
          )}

          <label className="checkbox">
            <input
              type="checkbox"
              checked={sso}
              onChange={(event) => setSso(event.target.checked)}
            />
            <span>Use school SSO instead of password</span>
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button className="btn primary" type="submit" disabled={loading}>
            Continue with Student Account
          </button>
        </form>

        <div className="divider-row">
          <span>or</span>
        </div>

        <button
          type="button"
          className="btn ghost"
          onClick={handleMagicLink}
          disabled={loading}
        >
          Email me a magic link
        </button>

        <p className="muted small">Need help? Contact support@aurorascholars.org.</p>
      </div>
      <Toast message={toast} onClose={() => setToast("")} />
    </section>
  );
};

export default Login;
