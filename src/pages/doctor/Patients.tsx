import React, { useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { Search, Mail, Phone, Calendar, ChevronRight, FileText, Activity } from 'lucide-react';

const MY_PATIENTS = [
  { id: 1, name: 'John Doe', age: 34, lastAppointment: 'Aug 24, 2026', condition: 'Hypertension', status: 'Stable' },
  { id: 2, name: 'Sarah Wilson', age: 28, lastAppointment: 'Sep 01, 2026', condition: 'Regular Checkup', status: 'Healthy' },
  { id: 3, name: 'Robert Brown', age: 45, lastAppointment: 'Aug 15, 2026', condition: 'Chronic Chest Pain', status: 'Critical' },
  { id: 4, name: 'Emily Davis', age: 22, lastAppointment: 'Aug 30, 2026', condition: 'Arrhythmia', status: 'Monitoring' },
];

export default function DoctorPatients() {
  const [search, setSearch] = useState('');

  const filteredPatients = MY_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.condition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PanelLayout role="doctor">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-dark mb-1">My Patient List</h1>
          <p className="text-sm text-secondary-text">Monitor your assigned patients and their medical histories.</p>
        </div>

        <div className="card p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text w-5 h-5" />
            <input
              type="text"
              placeholder="Search by patient name or medical condition..."
              className="input-field pl-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="card p-6 flex flex-col gap-6 hover:border-primary transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-medical-cyan flex items-center justify-center font-bold text-primary text-xl">
                    {patient.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-dark">{patient.name}</h3>
                    <p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest">{patient.age} Years • Male</p>
                  </div>
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                  patient.status === 'Critical' ? "bg-red-50 text-red-700 border-red-100" :
                  patient.status === 'Stable' ? "bg-blue-50 text-blue-700 border-blue-100" :
                  "bg-green-50 text-green-700 border-green-100"
                )}>
                  {patient.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-medical-cyan/30 p-4 rounded-xl border border-border-gray">
                <div>
                  <p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest mb-1">Condition</p>
                  <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-primary" />
                    <span className="text-xs font-bold text-dark">{patient.condition}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest mb-1">Last Seen</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-primary" />
                    <span className="text-xs font-bold text-dark">{patient.lastAppointment}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button 
                  onClick={() => alert(`Accessing medical history records for ${patient.name}...`)}
                  className="flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                >
                  <FileText className="w-3.5 h-3.5" /> View Medical History
                </button>
                <button className="p-2 hover:bg-medical-cyan rounded-lg text-secondary-text hover:text-primary transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
