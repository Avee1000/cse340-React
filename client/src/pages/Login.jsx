// client/src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ButtonLoading } from "../components/loading.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import api from "../api.js"; // Adjust the import path as necessary
export default function Login() {
    const { login } = useAuth();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 4000);
    return () => clearTimeout(timer);
  }, [error]);


    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            const userCred = await login(form.email, form.password);
            const uid = userCred.user.uid;
            const token = await userCred.user.getIdToken();

            await api.post(`/api/auth/login`, {
              firebase_uid: uid,
              token: token,
            });

            setForm({ email: "", password: "" });
            navigate("/");
        } catch (err) {
            // console.error("Signup error:", err);
            setError(err?.message || "Failed to Sign in");
        } finally {
            setLoading(false);
        }
    }

return (
  <main className="login-wrap container-lg d-flex justify-content-center align-items-center">
    {user ? (
      <div className="alert alert-success">
        You are logged in!
      </div>
    ) : (
      <div className="login-container">
        <h1 className="login-title">Sign in</h1>
        {error && (
          <p className={`login-error alert alert-danger`}>
            {error}
          </p>
        )}
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            className="input"
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange}
          />

          <label htmlFor="password">Password</label>
          <input
            className="input"
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="••••••••••••"
            value={form.password}
            onChange={onChange}
          />

          <button
            className="rounded-pill bg-dark text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? <ButtonLoading /> : "Sign in"}
          </button>
        </form>

        <p className="login-register-prompt text-center m-0" style={{ fontSize: "14px", color: "#6b7280" }}>
          Don't have an account? <a href="/register" className="text-decoration-none">Signup Here</a>
        </p>
      </div>
    )}
  </main>
);

}
