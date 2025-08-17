import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ButtonLoading } from "../components/loading.jsx";
import { useNavigate } from "react-router-dom";
// import "../styles/Login.css"

export default function SignUp() {
    const { signup, user } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setLoading(true);
            await signup(form.email, form.password);
            setForm({ email: "", password: "", confirmPassword: "" });
            navigate("/login");
        } catch (err) {
            // console.error("Signup error:", err);
            setError(err?.message || "Failed to create an account");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="signup-wrap login-wrap container-lg d-flex justify-content-center align-items-center">
            <div className="signup-container">
                <h2 className="signup-title">Sign Up</h2>
                {user && (<div className="alert alert-info text-center" role="alert">You are already signed in as <span className="text-danger">{user.email}</span></div>)}
                {error && (<div className="alert alert-danger" role="alert">{error}</div>)}
                <form className="signup-form" onSubmit={handleSubmit} noValidate>
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
                        disabled={user}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        className="input"
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="new-password"
                        minLength={12}
                        pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{12,}$"
                        title="Password must be at least 12 characters, contain 1 capital letter, 1 number, and 1 special character"
                        placeholder="••••••••••••"
                        value={form.password}
                        onChange={onChange}
                        disabled={user}
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className="input"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        autoComplete="new-password"
                        minLength={12}
                        placeholder="••••••••••••"
                        value={form.confirmPassword}
                        onChange={onChange}
                        disabled={user}
                    />

                    <button className="rounded-pill bg-dark text-white" type="submit" disabled={loading || user}>
                        {loading ? <ButtonLoading /> : "Sign Up"}
                    </button>
                </form>

                <div className="muted center mt-2">
                    Already have an account? <a href="/login" className="text-decoration-none">Sign in</a>
                </div>
            </div>
        </div>
    );
}
