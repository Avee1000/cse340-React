import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ButtonLoading } from "../components/loading.jsx";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export default function SignUp() {
    const { signup, user } = useAuth();
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
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
            const cred = await signup(form.email, form.password);
            const uid = cred.user.uid;

            await api.post(`/api/users`, {
                firebase_uid: uid, // 🔹 Send the Firebase UID
                account_email: form.email,
                account_firstname: form.first_name,
                account_lastname: form.last_name,
            });
            setSuccess("Account created successfully!");
            setTimeout(() => navigate("/login"), 2000);

            setForm({ email: "", password: "", confirmPassword: "", first_name: "", last_name: "" });
        } catch (err) {
            // console.error("Signup error:", err);
            setError(err?.message || "Failed to create an account");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="overflow-hidden position-relative signup-wrap login-wrap container-lg d-flex flex-column justify-content-center align-items-center">
            <div className="signup-error position-relative">
                {error && (<div className="alert alert-danger" role="alert">{error}</div>)}
                {success && (<div className="alert alert-success" role="alert">{success}</div>)}
            </div>
            <div className="signup-container">
                <h2 className="signup-title">Sign Up</h2>
                {user && (<div className="alert alert-info text-center" role="alert">You are already signed in as <span className="text-danger">{user.email}</span></div>)}
                <form className="signup-form" onSubmit={handleSubmit} noValidate>
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="John"
                        required
                        value={form.first_name}
                        onChange={onChange}
                        disabled={user}
                    />

                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Doe"
                        required
                        value={form.last_name}
                        onChange={onChange}
                        disabled={user}
                    />

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
