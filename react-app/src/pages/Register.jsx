import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("Registering...");

    try {
      // Try backend first
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          full_name: fullName,
          age: parseInt(age),
          gender
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        return;
      } else {
        throw new Error(data.error || "Backend registration failed");
      }
    } catch (backendError) {
      console.log("Backend failed, trying Supabase Auth fallback...", backendError);

      // FALLBACK: Use Supabase Auth directly
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              age: parseInt(age),
              gender: gender
            }
          }
        });

        if (error) throw error;

        if (data.user) {
          setMessage("Registration successful! (Fallback mode) Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      } catch (supabaseError) {
        console.error("Both backend and Supabase failed:", supabaseError);
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input 
          placeholder="Full Name" 
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input 
          type="number" 
          placeholder="Age" 
          value={age} 
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input 
          placeholder="Gender" 
          value={gender} 
          onChange={(e) => setGender(e.target.value)}
          required
        />
        <input 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="email"
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
      <p className="auth-footer">
        Already registered?{" "}
        <span className="auth-link" onClick={() => navigate("/login")}>
          Login here
        </span>
      </p>
    </div>
  );
}
