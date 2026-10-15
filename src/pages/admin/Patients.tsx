import React, { useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { Search, User, Mail, Calendar, MapPin, ChevronRight, Filter, Download, X, Phone, Heart, Clipboard, ExternalLink, Plus, Camera } from 'lucide-react';

const INITIAL_PATIENTS = [
  { id: 1, name: 'John Doe', age: 34, email: 'john.doe@email.com', lastVisit: 'Aug 24, 2026', visits: 4, gender: 'Male', phone: '+1 (555) 123-4567', bloodType: 'O+' },
  { id: 2, name: 'Sarah Wilson', age: 28, email: 's.wilson@email.com', lastVisit: 'Sep 01, 2026', visits: 2, gender: 'Female', phone: '+1 (555) 234-5678', bloodType: 'A-' },
  { id: 3, name: 'Robert Brown', age: 45, email: 'rbrown@email.com', lastVisit: 'Aug 15, 2026', visits: 8, gender: 'Male', phone: '+1 (555) 345-6789', bloodType: 'B+' },
  { id: 4, name: 'Emily Davis', age: 22, email: 'emily.d@email.com', lastVisit: 'Aug 30, 2026', visits: 1, gender: 'Female', phone: '+1 (555) 456-7890', bloodType: 'AB+' },
  { id: 5, name: 'Michael Miller', age: 56, email: 'm.miller@email.com', lastVisit: 'Sep 02, 2026', visits: 12, gender: 'Male', phone: '+1 (555) 567-8901', bloodType: 'O-' },
];

export default function AdminPatients() {
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'Male',
    phone: '',
    bloodType: 'O+',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'
  });

  const filteredPatients = INITIAL_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Name,Email,Age,Gender,Visits,Last Visit"].join(",") + "\n"
      + INITIAL_PATIENTS.map(p => `${p.id},${p.name},${p.email},${p.age},${p.gender},${p.visits},${p.lastVisit}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "careconnect_patients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Patient added successfully!');
    setIsAdding(false);
  };

  return (
    <PanelLayout role="admin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-dark mb-1">Patient Directory</h1>
            <p className="text-sm text-secondary-text">Access and manage patient medical profiles and history.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleExport}
              className="btn-secondary flex items-center gap-2 h-[42px] px-4 text-sm"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button 
              onClick={() => setIsAdding(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Patient
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients by name, email or ID..."
              className="input-field pl-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Add Modal */}
        {isAdding && (
          <div className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-dark">Add New Patient</h2>
                <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-medical-cyan rounded-lg transition-colors">
                  <X className="w-5 h-5 text-secondary-text" />
                </button>
              </div>
              <form onSubmit={handleAdd} className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img 
                      src={newPatient.image} 
                      alt="Preview" 
                      className="w-32 h-32 rounded-3xl object-cover border-4 border-medical-cyan shadow-xl"
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        const url = prompt('Enter Image URL:', newPatient.image);
                        if (url) setNewPatient({...newPatient, image: url});
                      }}
                      className="absolute -bottom-2 -right-2 bg-primary p-2.5 rounded-2xl text-white shadow-lg hover:scale-110 transition-transform"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="label">Full Name</label>
                    <input type="text" required className="input-field" placeholder="Patient Full Name" />
                  </div>
                  <div>
                    <label className="label">Age</label>
                    <input type="number" required className="input-field" placeholder="Age" />
                  </div>
                  <div>
                    <label className="label">Gender</label>
                    <select className="input-field">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="label">Email Address</label>
                    <input type="email" required className="input-field" placeholder="patient@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button type="button" onClick={() => setIsAdding(false)} className="btn-secondary">Cancel</button>
                  <button type="submit" className="btn-primary">Register Patient</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-dark">Patient Record</h2>
                <button onClick={() => setSelectedPatient(null)} className="p-2 hover:bg-medical-cyan rounded-lg transition-colors">
                  <X className="w-5 h-5 text-secondary-text" />
                </button>
              </div>
              <div className="flex items-center gap-6 mb-8 p-6 bg-medical-cyan/20 rounded-3xl border border-medical-cyan border-dashed">
                <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center font-black text-white text-3xl shadow-xl">
                  {selectedPatient.name[0]}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-dark">{selectedPatient.name}</h3>
                  <p className="text-[10px] font-black text-secondary-text uppercase tracking-widest">ID: #PT-10{selectedPatient.id} • {selectedPatient.gender}, {selectedPatient.age} Years</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-secondary-text uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3" /> Contact Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-border-gray">
                      <span className="text-xs text-secondary-text">Email</span>
                      <span className="text-xs font-bold text-dark">{selectedPatient.email}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border-gray">
                      <span className="text-xs text-secondary-text">Phone</span>
                      <span className="text-xs font-bold text-dark">{selectedPatient.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-secondary-text uppercase tracking-widest flex items-center gap-2">
                    <Heart className="w-3 h-3 text-error-red" /> Health Overview
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-border-gray">
                      <span className="text-xs text-secondary-text">Blood Type</span>
                      <span className="text-xs font-bold text-dark">{selectedPatient.bloodType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border-gray">
                      <span className="text-xs text-secondary-text">Total Visits</span>
                      <span className="text-xs font-bold text-dark">{selectedPatient.visits} Appointments</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-border-gray">
                <h4 className="text-xs font-black text-secondary-text uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Clipboard className="w-3 h-3" /> Recent Medical History
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-border-gray">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-success-green/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-success-green" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-dark uppercase tracking-widest">Last Checkup Report</p>
                        <p className="text-xs text-secondary-text">{selectedPatient.lastVisit}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Opening medical report for ${selectedPatient.name} (File ID: CHK-2026-${selectedPatient.id})`)}
                      className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                    >
                      View Report File
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button onClick={() => setSelectedPatient(null)} className="btn-primary px-8">Close Record</button>
              </div>
            </div>
          </div>
        )}

        {/* Patients Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-medical-cyan border-b border-border-gray">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary-text">Patient</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary-text">Contact Info</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary-text">Gender/Age</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary-text">Visits</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary-text">Last Visit</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary-text text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-gray">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-medical-cyan/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {patient.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-dark">{patient.name}</p>
                          <p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest">ID: #PT-10{patient.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-secondary-text">
                          <Mail className="w-3 h-3" />
                          <span>{patient.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-dark">{patient.gender}, {patient.age}y</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-12 bg-medical-cyan rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${Math.min(patient.visits * 10, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-dark">{patient.visits}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-secondary-text font-medium">
                        <Calendar className="w-4 h-4" />
                        {patient.lastVisit}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedPatient(patient)}
                        className="p-2 hover:bg-medical-cyan rounded-lg text-secondary-text hover:text-primary transition-all flex items-center justify-end w-full gap-2 group-hover:bg-primary/5"
                      >
                        <span className="text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">View Profile</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPatients.length === 0 && (
            <div className="p-12 text-center text-secondary-text">
              No patients found matching your search.
            </div>
          )}
        </div>
      </div>
    </PanelLayout>
  );
}

