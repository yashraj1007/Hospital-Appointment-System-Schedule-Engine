import React, { useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { Settings as SettingsIcon, Bell, Shield, Database, Globe, Save, RefreshCw, Mail, Phone, MapPin } from 'lucide-react';
import { clsx } from 'clsx';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('General');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { name: 'General', icon: Globe },
    { name: 'Notifications', icon: Bell },
    { name: 'Security', icon: Shield },
    { name: 'System', icon: Database },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings updated successfully!');
    }, 1000);
  };

  return (
    <PanelLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-black text-dark mb-2">System Settings</h1>
          <p className="text-secondary-text">Configure global hospital management parameters and preferences.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tabs */}
          <div className="w-full lg:w-64 shrink-0 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={clsx(
                  "w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all font-bold text-sm border",
                  activeTab === tab.name 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                    : "bg-white text-secondary-text border-border-gray hover:border-primary/30"
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-grow space-y-8">
            {activeTab === 'General' && (
              <div className="card animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="p-8 border-b border-border-gray">
                  <h3 className="text-lg font-black text-dark mb-1">General Information</h3>
                  <p className="text-xs text-secondary-text uppercase tracking-widest font-black">Hospital Identity & Contact</p>
                </div>
                <div className="p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label">Hospital Name</label>
                      <input type="text" className="input-field" defaultValue="MediCare Medical Center" />
                    </div>
                    <div className="space-y-2">
                      <label className="label">Contact Email</label>
                      <input type="email" className="input-field" defaultValue="admin@careconnect.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="label">Phone Number</label>
                      <input type="text" className="input-field" defaultValue="+1 (555) 900-1000" />
                    </div>
                    <div className="space-y-2">
                      <label className="label">Timezone</label>
                      <select className="input-field">
                        <option>GMT+5:30 (India Standard Time)</option>
                        <option>GMT-05:00 (Eastern Standard Time)</option>
                        <option>GMT+00:00 (UTC)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="label">Address</label>
                    <textarea 
                      className="input-field min-h-[100px]" 
                      defaultValue="123 Medical Plaza, Health Square, Tech City, 560001"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <div className="card animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="p-8 border-b border-border-gray">
                  <h3 className="text-lg font-black text-dark mb-1">Notification Preferences</h3>
                  <p className="text-xs text-secondary-text uppercase tracking-widest font-black">System alerts & user communications</p>
                </div>
                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-border-gray">
                      <div>
                        <p className="font-bold text-dark">Email Appointments</p>
                        <p className="text-xs text-secondary-text">Send confirmation emails to patients on booking.</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-border-gray">
                      <div>
                        <p className="font-bold text-dark">SMS Reminders</p>
                        <p className="text-xs text-secondary-text">Notify doctors about upcoming shifts via SMS.</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Security' && (
              <div className="card animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="p-8 border-b border-border-gray">
                  <h3 className="text-lg font-black text-dark mb-1">Security & Access</h3>
                  <p className="text-xs text-secondary-text uppercase tracking-widest font-black">Data protection & user authentication</p>
                </div>
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="label">Admin Access Key</label>
                    <input type="password" title="Access Key" className="input-field" defaultValue="••••••••••••" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
                    <div>
                      <p className="font-bold text-error-red">Strict Mode</p>
                      <p className="text-xs text-red-600/70">Enable multi-factor authentication for all admin accounts.</p>
                    </div>
                    <button className="btn-secondary text-error-red border-red-100 bg-white">Enable</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'System' && (
              <div className="card animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="p-8 border-b border-border-gray">
                  <h3 className="text-lg font-black text-dark mb-1">System Maintenance</h3>
                  <p className="text-xs text-secondary-text uppercase tracking-widest font-black">Database backups & logs</p>
                </div>
                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center justify-center p-8 bg-medical-cyan/30 border border-border-gray rounded-3xl hover:bg-medical-cyan/50 transition-colors">
                      <RefreshCw className="w-8 h-8 text-primary mb-3" />
                      <p className="font-bold text-dark text-sm">Backup Database</p>
                      <p className="text-[10px] text-secondary-text">Last: 2 hours ago</p>
                    </button>
                    <button className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-border-gray rounded-3xl hover:bg-gray-100 transition-colors">
                      <Save className="w-8 h-8 text-secondary-text mb-3" />
                      <p className="font-bold text-dark text-sm">Clear System Logs</p>
                      <p className="text-[10px] text-secondary-text">54 MB total</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4 pt-4">
              <button className="btn-secondary px-8">Reset Defaults</button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary px-12 flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}
