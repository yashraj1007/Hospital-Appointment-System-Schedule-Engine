import React, { useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { User, Mail, Shield, Camera, Save, Key, Bell, Globe } from 'lucide-react';

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Admin Sarah',
    role: 'System Administrator',
    email: 'admin.sarah@medicare.com',
    department: 'IT & Infrastructure',
    accessLevel: 'Super Admin',
    lastLogin: 'Today, 08:45 AM',
    image: ''
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Settings updated successfully!');
  };

  const handleUpdatePhoto = () => {
    const url = prompt('Enter Image URL:', profile.image);
    if (url !== null) setProfile({ ...profile, image: url });
  };

  return (
    <PanelLayout role="admin">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-dark">System Administrator Profile</h1>
            <p className="text-sm text-secondary-text">Manage your administrative credentials and security settings.</p>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={isEditing ? "btn-secondary" : "btn-primary flex items-center gap-2"}
          >
            {isEditing ? 'Cancel' : <><Save className="w-4 h-4" /> Edit Admin Profile</>}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Side Info */}
          <div className="space-y-6">
            <div className="card p-8 text-center flex flex-col items-center">
              <div className="relative mb-6">
                {profile.image ? (
                  <img 
                    src={profile.image} 
                    alt="Admin" 
                    className="w-32 h-32 rounded-3xl object-cover border-4 border-medical-cyan shadow-xl"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-3xl bg-primary flex items-center justify-center text-white text-5xl font-black shadow-xl">
                    {profile.name[0]}
                  </div>
                )}
                <button 
                  onClick={handleUpdatePhoto}
                  className="absolute -bottom-2 -right-2 bg-dark p-2.5 rounded-2xl text-white shadow-lg hover:scale-110 transition-transform"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-dark">{profile.name}</h2>
              <p className="text-primary font-bold text-xs uppercase tracking-wider mb-4">{profile.role}</p>
              <div className="inline-flex items-center gap-1.5 bg-dark text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                <Shield className="w-3 h-3" /> {profile.accessLevel}
              </div>
            </div>

            <div className="card p-6 divide-y divide-border-gray">
              <div className="py-3 flex justify-between text-xs font-bold">
                <span className="text-secondary-text uppercase tracking-wider">Last Login</span>
                <span className="text-dark">{profile.lastLogin}</span>
              </div>
              <div className="py-3 flex justify-between text-xs font-bold">
                <span className="text-secondary-text uppercase tracking-wider">Permissions</span>
                <span className="text-green-600 uppercase">Full Access</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="card p-8">
              <h3 className="font-bold text-dark mb-6 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Personal Information
              </h3>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Admin Display Name</label>
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      className="input-field disabled:bg-medical-cyan/30" 
                      value={profile.name}
                      onChange={e => setProfile({...profile, name: e.target.value})}
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
                    <label className="label">Department</label>
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      className="input-field disabled:bg-medical-cyan/30" 
                      value={profile.department}
                      onChange={e => setProfile({...profile, department: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="label">Security Role</label>
                    <input 
                      type="text" 
                      disabled
                      className="input-field bg-medical-cyan/30" 
                      value={profile.accessLevel}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-4 flex justify-end gap-4">
                    <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">Discard</button>
                    <button type="submit" className="btn-primary">Update Details</button>
                  </div>
                )}
              </form>
            </div>

            {/* Security Section */}
            <div className="card p-8">
              <h3 className="font-bold text-dark mb-6 flex items-center gap-2">
                <Key className="w-4 h-4 text-primary" /> Security & Access
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-medical-cyan/30 rounded-xl border border-border-gray">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-lg">
                      <Bell className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark">Two-Factor Authentication</p>
                      <p className="text-xs text-secondary-text">Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Enable</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-medical-cyan/30 rounded-xl border border-border-gray">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-lg">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark">Session Management</p>
                      <p className="text-xs text-secondary-text">Monitor and manage your active login sessions.</p>
                    </div>
                  </div>
                  <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Manage</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}
