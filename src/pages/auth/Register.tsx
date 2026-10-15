import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, Mail, Phone, Lock, Calendar } from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else navigate('/login');
  };

  return (
    <div className="min-h-screen bg-medical-cyan flex items-center justify-center p-4 py-12">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-dark">MediCare</span>
          </div>
          <p className="text-sm text-secondary-text">Create your patient account to book appointments</p>
        </div>

        <div className="card">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className={clsx("flex-1 h-2 rounded-full", step >= 1 ? "bg-primary" : "bg-gray-100")}></div>
              <div className={clsx("flex-1 h-2 rounded-full", step >= 2 ? "bg-primary" : "bg-gray-100")}></div>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              {step === 1 ? (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="label">Full Name</label>
                      <input type="text" className="input-field" placeholder="Enter your full name" required />
                    </div>
                    <div>
                      <label className="label">Age</label>
                      <input type="number" className="input-field" placeholder="Years" required />
                    </div>
                    <div>
                      <label className="label">Gender</label>
                      <select className="input-field">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="label">Phone Number</label>
                    <input type="tel" className="input-field" placeholder="+1 (555) 000-0000" required />
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input type="email" className="input-field" placeholder="name@example.com" required />
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <label className="label">Address</label>
                    <textarea className="input-field h-24 py-2" placeholder="Your residential address" required />
                  </div>
                  <div>
                    <label className="label">Emergency Contact Name</label>
                    <input type="text" className="input-field" placeholder="Contact person name" required />
                  </div>
                  <div>
                    <label className="label">Password</label>
                    <input type="password" className="input-field" placeholder="••••••••" required />
                  </div>
                  <div>
                    <label className="label">Confirm Password</label>
                    <input type="password" className="input-field" placeholder="••••••••" required />
                  </div>
                </div>
              )}

              <button type="submit" className="btn-primary w-full">
                {step === 1 ? 'Next Step' : 'Register Account'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-border-gray text-center">
              <p className="text-sm text-secondary-text">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-bold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
