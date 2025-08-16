// client/src/pages/Login.jsx
import { useState } from "react";
import {Loading} from "../components/Loading";
import "../styles/Login.css";

export default function Login() {
  const [account_email, setEmail] = useState("");
  const [account_password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account_email, account_password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed");
      }
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="login-wrap container-lg d-flex justify-content-center align-items-center">
      <div className="login-container">
        <h1 className="login-title">Sign in</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={account_email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={account_password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="login-error">{error}</p>}
          <button className="rounded-pill bg-dark text-white" type="submit" disabled={pending}>
            {pending ? <Loading text={"Logging in..."} /> : "Sign in"}
          </button>
        </form>

        <p className="login-register-prompt text-center m-0" style={{ fontSize: "14px", color: "#6b7280" }}>Don't have an account? <a href="/register" className="text-decoration-none">Sign Up Here</a></p>
      </div>
    </main>
  );
}
