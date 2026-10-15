import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, UserPlus, ShieldCheck, Heart } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('patient');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login logic
    const userData = {
      id: role === 'patient' ? 'p1' : role === 'doctor' ? 'd1' : 'a1',
      username,
      name: role === 'patient' ? 'Rahul Patil' : role === 'doctor' ? 'Dr. Rahul Sharma' : 'Admin User',
      role
    };
    login(userData);
    navigate(`/${role}/dashboard`);
  };

  const fillCredentials = (r: string, u: string, p: string) => {
    setRole(r);
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className="min-h-screen bg-medical-cyan flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-dark">MediCare</span>
          </div>
          <p className="text-sm text-secondary-text">Sign in to manage your appointments</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="label">Login as</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div>
              <label className="label">Username or Email</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-text">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
