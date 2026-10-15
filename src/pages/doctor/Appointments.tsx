import React, { useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { Search, Filter, Calendar, Clock, User, CheckCircle, ChevronRight, FileText } from 'lucide-react';
import { INITIAL_APPOINTMENTS } from '../../utils/dummyData';
import { useAuth } from '../../context/AuthContext';
import { clsx } from 'clsx';
import AppointmentDetailsModal from '../../components/modals/AppointmentDetailsModal';

export default function DoctorAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('careconnect_appointments');
    const local = saved ? JSON.parse(saved) : [];
    return [...INITIAL_APPOINTMENTS, ...local].filter(a => a.doctor === user?.name);
  });

  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = (action: 'confirm' | 'cancel' | 'complete', id: string) => {
    const newStatus = action === 'confirm' ? 'Confirmed' : action === 'cancel' ? 'Cancelled' : 'Completed';
    const updated = appointments.map(a => a.id === id ? { ...a, status: newStatus } : a);
    setAppointments(updated);
    
    // Update local storage
    const saved = JSON.parse(localStorage.getItem('careconnect_appointments') || '[]');
    const isLocal = saved.some((s: any) => s.id === id);
    if (isLocal) {
      localStorage.setItem('careconnect_appointments', JSON.stringify(saved.map((s: any) => s.id === id ? { ...s, status: newStatus } : s)));
    }
    
    setIsModalOpen(false);
    alert(`Appointment ${newStatus.toLowerCase()} successfully!`);
  };

  return (
    <PanelLayout role="doctor">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-dark mb-2">My Appointments</h1>
            <p className="text-secondary-text">Full history and upcoming consultations for your patients.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patient..."
                className="input-field pl-10 h-[40px] text-sm w-full md:w-64"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {appointments.length === 0 ? (
            <div className="card p-20 text-center">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-secondary-text font-medium">No appointments found in your schedule.</p>
            </div>
          ) : (
            appointments.map((app: any) => (
              <div key={app.id} className="card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-primary transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-medical-cyan rounded-2xl flex flex-col items-center justify-center border border-primary/10">
                    <span className="text-[10px] font-black text-primary uppercase opacity-60">
                      {app.date.split('-')[1] === '09' ? 'Sep' : 'Oct'}
                    </span>
                    <span className="text-xl font-black text-dark">{app.date.split('-')[2]}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-dark">{app.patientName}</h3>
                      <span className={clsx(
                        "px-2 py-0.5 rounded text-[10px] font-black uppercase",
                        app.status === 'Confirmed' ? "bg-success-green/10 text-success-green" :
                        app.status === 'Completed' ? "bg-blue-100 text-blue-700" :
                        app.status === 'Cancelled' ? "bg-gray-100 text-gray-500" :
                        "bg-warning-orange/10 text-warning-orange"
                      )}>
                        {app.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-secondary-text flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {app.time}
                      </span>
                      <span className="text-xs text-secondary-text flex items-center gap-1">
                        <FileText className="w-3 h-3" /> {app.reason ? "Initial Consultation" : "Follow-up"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="flex flex-col items-end hidden md:flex">
                    <span className={clsx(
                      "text-[10px] font-black uppercase px-3 py-1 rounded-full",
                      app.priority === 'High' ? "bg-warning-orange text-white" : 
                      app.priority === 'Emergency' ? "bg-error-red text-white" :
                      "bg-success-green/10 text-success-green"
                    )}>
                      {app.priority} Priority
                    </span>
                  </div>
                  <button 
                    onClick={() => { setSelectedApp(app); setIsModalOpen(true); }}
                    className="btn-secondary h-[40px] px-6 text-sm flex-1 md:flex-none"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AppointmentDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedApp}
        role="doctor"
        onAction={handleAction}
      />
    </PanelLayout>
  );
}

