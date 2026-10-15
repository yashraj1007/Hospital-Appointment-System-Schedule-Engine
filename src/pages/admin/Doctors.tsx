import React, { useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { Search, Plus, User, Mail, Phone, Stethoscope, Trash2, Edit2, X, Check, Download, Camera, ExternalLink } from 'lucide-react';

const INITIAL_DOCTORS = [
  { id: 1, name: 'Dr. Rahul Sharma', specialty: 'Cardiology', email: 'rahul.s@careconnect.com', phone: '+1 234 567 8901', status: 'Active', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop' },
  { id: 2, name: 'Dr. Sarah Jenkins', specialty: 'Pediatrics', email: 'sarah.j@careconnect.com', phone: '+1 234 567 8902', status: 'On Leave', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop' },
  { id: 3, name: 'Dr. Michael Chen', specialty: 'Neurology', email: 'michael.c@careconnect.com', phone: '+1 234 567 8903', status: 'Active', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop' },
  { id: 4, name: 'Dr. Elena Rodriguez', specialty: 'Orthopedics', email: 'elena.r@careconnect.com', phone: '+1 234 567 8904', status: 'Active', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop' },
];

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [newDoctor, setNewDoctor] = useState({ 
    name: '', 
    specialty: 'Cardiology', 
    email: '', 
    phone: '', 
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
  });

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(search.toLowerCase()) || 
    doc.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to remove this doctor from the system?')) {
      setDoctors(doctors.filter(doc => doc.id !== id));
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = {
      ...newDoctor,
      id: Date.now(),
    };
    setDoctors([doc, ...doctors]);
    setIsAdding(false);
    setNewDoctor({ 
      name: '', 
      specialty: 'Cardiology', 
      email: '', 
      phone: '', 
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
    });
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Name,Specialty,Email,Phone,Status"].join(",") + "\n"
      + doctors.map(d => `${d.id},${d.name},${d.specialty},${d.email},${d.phone},${d.status}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "careconnect_doctors.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PanelLayout role="admin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-dark mb-1">Doctor Management</h1>
            <p className="text-sm text-secondary-text">Manage clinical staff, specialties and availability.</p>
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
              className="btn-primary flex items-center gap-2 self-start"
            >
              <Plus className="w-4 h-4" /> Add New Doctor
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="card p-4 flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
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
                <h2 className="text-xl font-black text-dark">Add New Doctor</h2>
                <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-medical-cyan rounded-lg transition-colors">
                  <X className="w-5 h-5 text-secondary-text" />
                </button>
              </div>
              <form onSubmit={handleAdd} className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img 
                      src={newDoctor.image} 
                      alt="Preview" 
                      className="w-32 h-32 rounded-3xl object-cover border-4 border-medical-cyan"
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        const url = prompt('Enter Image URL:', newDoctor.image);
                        if (url) setNewDoctor({...newDoctor, image: url});
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
                    <input 
                      type="text" 
                      required 
                      className="input-field" 
                      placeholder="e.g. Dr. Jane Smith"
                      value={newDoctor.name}
                      onChange={e => setNewDoctor({...newDoctor, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="label">Specialty</label>
                    <select 
                      className="input-field"
                      value={newDoctor.specialty}
                      onChange={e => setNewDoctor({...newDoctor, specialty: e.target.value})}
                    >
                      <option>Cardiology</option>
                      <option>Pediatrics</option>
                      <option>Neurology</option>
                      <option>Orthopedics</option>
                      <option>Dermatology</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Phone Number</label>
                    <input 
                      type="text" 
                      required 
                      className="input-field" 
                      placeholder="+1 (555) 000-0000"
                      value={newDoctor.phone}
                      onChange={e => setNewDoctor({...newDoctor, phone: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="label">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      className="input-field" 
                      placeholder="jane.s@careconnect.com"
                      value={newDoctor.email}
                      onChange={e => setNewDoctor({...newDoctor, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button type="button" onClick={() => setIsAdding(false)} className="btn-secondary">Cancel</button>
                  <button type="submit" className="btn-primary">Add Doctor</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {selectedDoctor && (
          <div className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-dark">Doctor Profile Details</h2>
                <button onClick={() => setSelectedDoctor(null)} className="p-2 hover:bg-medical-cyan rounded-lg transition-colors">
                  <X className="w-5 h-5 text-secondary-text" />
                </button>
              </div>
              <div className="flex gap-8 mb-8">
                <img src={selectedDoctor.image} className="w-40 h-40 rounded-3xl object-cover shadow-lg border-4 border-medical-cyan" alt="" />
                <div className="space-y-4 py-2">
                  <div>
                    <h3 className="text-2xl font-black text-dark">{selectedDoctor.name}</h3>
                    <p className="text-primary font-bold uppercase tracking-widest text-sm">{selectedDoctor.specialty}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                    <div>
                      <p className="text-[10px] font-black text-secondary-text uppercase mb-1">Email</p>
                      <p className="text-sm font-bold text-dark">{selectedDoctor.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-secondary-text uppercase mb-1">Phone</p>
                      <p className="text-sm font-bold text-dark">{selectedDoctor.phone}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-secondary-text uppercase mb-1">Status</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${selectedDoctor.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {selectedDoctor.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-medical-cyan/20 rounded-2xl border border-medical-cyan border-dashed">
                <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-3">Professional Bio</h4>
                <p className="text-sm text-dark leading-relaxed">
                  Dedicated healthcare professional with over 10 years of experience in clinical excellence. Specialized in providing comprehensive patient care and advancing medical practices through continuous research and patient-centered treatment plans.
                </p>
              </div>
              <div className="mt-8 flex justify-end">
                <button onClick={() => setSelectedDoctor(null)} className="btn-primary px-8">Close Profile</button>
              </div>
            </div>
          </div>
        )}

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="card p-6 flex gap-6 hover:border-primary transition-all group">
              <div className="relative shrink-0">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${doc.status === 'Active' ? 'bg-success-green' : 'bg-warning-yellow'}`}></div>
              </div>
              <div className="flex-grow space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-dark text-lg">{doc.name}</h3>
                    <p className="text-primary font-bold text-xs uppercase tracking-wider">{doc.specialty}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-medical-cyan rounded-lg text-secondary-text hover:text-primary">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(doc.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-secondary-text hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-secondary-text">
                    <Mail className="w-4 h-4" />
                    <span>{doc.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-text">
                    <Phone className="w-4 h-4" />
                    <span>{doc.phone}</span>
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${doc.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {doc.status}
                  </span>
                  <button 
                    onClick={() => setSelectedDoctor(doc)}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    View Profile <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

