import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      // Try backend first
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
        return;
      } else {
        throw new Error(data.error || "Backend login failed");
      }
    } catch (backendError) {
      console.log("Backend failed, trying Supabase Auth fallback...", backendError);

      // FALLBACK: Use Supabase Auth directly
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.session) {
          // Store the session token
          localStorage.setItem("token", data.session.access_token);
          localStorage.setItem("userEmail", email);
          setMessage("Login successful! (Fallback mode) Redirecting...");
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        }
      } catch (supabaseError) {
        console.error("Both backend and Supabase failed:", supabaseError);
        setMessage("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
      <p className="auth-footer">
        Don't have an account?{" "}
        <span className="auth-link" onClick={() => navigate("/")}>
          Register here
        </span>
      </p>
    </div>
  );
}
