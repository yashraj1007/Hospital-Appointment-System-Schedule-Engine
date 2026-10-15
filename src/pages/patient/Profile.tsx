import React, { useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit3, Heart, Save, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PatientProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'Rahul Patil',
    email: 'rahul.patil@example.com',
    phone: '+1 (555) 012-3456',
    dob: '12 May 1998',
    gender: 'Male',
    address: '456 Oak Avenue, High Street, New York, NY 10012',
    emergencyContact: 'Sunita Patil',
    emergencyRelation: 'Spouse',
    emergencyPhone: '+1 (555) 987-6543'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <PanelLayout role="patient">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-dark">My Profile</h1>
            <p className="text-sm text-secondary-text">Manage your personal information and security.</p>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={isEditing ? "btn-secondary" : "btn-primary flex items-center gap-2"}
          >
            {isEditing ? 'Cancel' : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="card p-8 text-center flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-medical-cyan rounded-3xl mx-auto flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
                  <User className="w-16 h-16 text-primary" />
                </div>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-xl text-white shadow-lg">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold text-dark mb-1">{profile.name}</h2>
              <p className="text-sm text-secondary-text mb-6">Patient ID: CC-P-00234</p>
              <div className="flex justify-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full">Verified</span>
              </div>
            </div>

            <div className="card p-6 space-y-4">
              <h3 className="font-bold text-dark text-sm border-b border-border-gray pb-3">Emergency Contact</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-black text-secondary-text opacity-70 mb-1 block">Full Name</label>
                  {isEditing ? (
                    <input 
                      className="input-field h-10 text-sm" 
                      value={profile.emergencyContact} 
                      onChange={e => setProfile({...profile, emergencyContact: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm font-bold text-dark">{profile.emergencyContact}</p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] uppercase font-black text-secondary-text opacity-70 mb-1 block">Relationship</label>
                  {isEditing ? (
                    <input 
                      className="input-field h-10 text-sm" 
                      value={profile.emergencyRelation} 
                      onChange={e => setProfile({...profile, emergencyRelation: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm font-bold text-dark">{profile.emergencyRelation}</p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] uppercase font-black text-secondary-text opacity-70 mb-1 block">Contact Number</label>
                  {isEditing ? (
                    <input 
                      className="input-field h-10 text-sm" 
                      value={profile.emergencyPhone} 
                      onChange={e => setProfile({...profile, emergencyPhone: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm font-bold text-dark">{profile.emergencyPhone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            <div className="card p-8">
              <h3 className="text-lg font-bold text-dark mb-8 flex items-center gap-3">
                <Shield className="text-primary w-5 h-5" /> Personal Information
              </h3>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Full Name</label>
                    <input 
                      disabled={!isEditing}
                      className="input-field disabled:bg-medical-cyan/30" 
                      value={profile.name}
                      onChange={e => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input 
                      disabled={!isEditing}
                      className="input-field disabled:bg-medical-cyan/30" 
                      value={profile.email}
                      onChange={e => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="label">Phone Number</label>
                    <input 
                      disabled={!isEditing}
                      className="input-field disabled:bg-medical-cyan/30" 
                      value={profile.phone}
                      onChange={e => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="label">Date of Birth</label>
                    <input 
                      disabled={!isEditing}
                      className="input-field disabled:bg-medical-cyan/30" 
                      value={profile.dob}
                      onChange={e => setProfile({...profile, dob: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Residential Address</label>
                  <textarea 
                    disabled={!isEditing}
                    className="input-field h-24 py-3 resize-none disabled:bg-medical-cyan/30" 
                    value={profile.address}
                    onChange={e => setProfile({...profile, address: e.target.value})}
                  />
                </div>
                {isEditing && (
                  <div className="pt-4 flex justify-end gap-4">
                    <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">Discard</button>
                    <button type="submit" className="btn-primary">Save Changes</button>
                  </div>
                )}
              </form>
            </div>

            <div className="card p-8 border-dashed border-primary/30">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <Heart className="text-primary w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-dark text-lg">Health Card ID</h3>
                  <p className="text-sm text-secondary-text leading-relaxed">
                    Your unique Health Card ID allows you to access medical records across all MediCare branches.
                  </p>
                  <p className="text-2xl font-black text-primary tracking-widest mt-4">8823 - 4492 - 1102</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}

