import React, { useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { User, Mail, Phone, Camera, MapPin, Save, Stethoscope, Clock, ShieldCheck } from 'lucide-react';

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dr. Rahul Sharma',
    specialty: 'Senior Cardiologist',
    email: 'rahul.s@careconnect.com',
    phone: '+1 (555) 000-1122',
    bio: 'Senior consultant with over 15 years of experience in interventional cardiology. Specialized in complex coronary interventions and preventive heart care.',
    location: 'Building A, Room 402',
    availability: 'Mon - Fri (09:00 AM - 05:00 PM)',
    education: 'MD, FACC - Harvard Medical School',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // In a real app, API call here
    alert('Profile updated successfully!');
  };

  return (
    <PanelLayout role="doctor">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-dark">Clinical Profile</h1>
            <p className="text-sm text-secondary-text">Manage your professional credentials and availability.</p>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={isEditing ? "btn-secondary" : "btn-primary flex items-center gap-2"}
          >
            {isEditing ? 'Cancel' : <><Save className="w-4 h-4" /> Edit Profile</>}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="space-y-6">
            <div className="card p-8 text-center flex flex-col items-center">
              <div className="relative mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop" 
                  alt="Doctor" 
                  className="w-32 h-32 rounded-3xl object-cover shadow-xl border-4 border-white"
                />
                <button className="absolute -bottom-2 -right-2 bg-primary p-2.5 rounded-2xl text-white shadow-lg hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-dark">{profile.name}</h2>
              <p className="text-primary font-bold text-xs uppercase tracking-wider mb-4">{profile.specialty}</p>
              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                <ShieldCheck className="w-3 h-3" /> Verified Surgeon
              </div>
            </div>

            <div className="card p-6 space-y-4">
              <h3 className="font-bold text-dark text-sm">Clinical Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-medical-cyan p-4 rounded-xl text-center">
                  <p className="text-xl font-black text-primary">1.2k</p>
                  <p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest">Surgery</p>
                </div>
                <div className="bg-medical-cyan p-4 rounded-xl text-center">
                  <p className="text-xl font-black text-primary">4.9/5</p>
                  <p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="md:col-span-2">
            <div className="card p-8">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Full Name</label>
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      className="input-field disabled:bg-medical-cyan/30" 
                      value={profile.name}
                      onChange={e => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="label">Professional Title</label>
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      className="input-field disabled:bg-medical-cyan/30" 
                      value={profile.specialty}
                      onChange={e => setProfile({...profile, specialty: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input 
                      type="email" 
                      disabled={!isEditing}
                      className="input-field disabled:bg-medical-cyan/30" 
                      value={profile.email}
                      onChange={e => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="label">Phone Number</label>
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      className="input-field disabled:bg-medical-cyan/30" 
                      value={profile.phone}
                      onChange={e => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Medical Bio & Experience</label>
                  <textarea 
                    disabled={!isEditing}
                    className="input-field h-32 py-4 resize-none disabled:bg-medical-cyan/30" 
                    value={profile.bio}
                    onChange={e => setProfile({...profile, bio: e.target.value})}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label">OPD Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text w-4 h-4" />
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        className="input-field pl-10 disabled:bg-medical-cyan/30" 
                        value={profile.location}
                        onChange={e => setProfile({...profile, location: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Weekly Availability</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text w-4 h-4" />
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        className="input-field pl-10 disabled:bg-medical-cyan/30" 
                        value={profile.availability}
                        onChange={e => setProfile({...profile, availability: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-4 flex justify-end gap-4">
                    <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">Discard Changes</button>
                    <button type="submit" className="btn-primary">Save Profile</button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}
