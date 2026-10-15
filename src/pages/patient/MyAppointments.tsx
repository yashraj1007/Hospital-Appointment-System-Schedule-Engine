import React, { useState, useEffect } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { Calendar, ClipboardList, CheckCircle, Clock, User, Filter, Search, MoreVertical, MapPin, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_APPOINTMENTS } from '../../utils/dummyData';
import { clsx } from 'clsx';
import AppointmentDetailsModal from '../../components/modals/AppointmentDetailsModal';

export default function MyAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('careconnect_appointments');
    const local = saved ? JSON.parse(saved) : [];
    // Filter for current patient
    return [...INITIAL_APPOINTMENTS, ...local].filter(a => a.patientId === user?.id || a.patientName === user?.name);
  });

  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-success-green/10 text-success-green border-success-green/20';
      case 'Pending Review': return 'bg-warning-orange/10 text-warning-orange border-warning-orange/20';
      case 'Cancelled': return 'bg-gray-100 text-gray-500 border-gray-200';
      case 'Completed': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  const handleAction = (action: 'confirm' | 'cancel' | 'complete', id: string) => {
    if (action === 'cancel') {
      if (window.confirm('Are you sure you want to cancel this appointment?')) {
        const allSaved = JSON.parse(localStorage.getItem('careconnect_appointments') || '[]');
        const updated = allSaved.map((a: any) => a.id === id ? { ...a, status: 'Cancelled' } : a);
        localStorage.setItem('careconnect_appointments', JSON.stringify(updated));
        setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
        setIsModalOpen(false);
      }
    }
  };

  return (
    <PanelLayout role="patient">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-dark mb-2">My Appointments</h1>
            <p className="text-secondary-text">Track and manage your medical consultations.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                className="input-field pl-10 h-[40px] text-sm w-full md:w-64"
              />
            </div>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="card p-20 text-center space-y-6">
            <div className="bg-medical-cyan w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="text-primary w-10 h-10" />
            </div>
            <div>
              <h2 className="text-xl font-black text-dark mb-2">No Appointments Yet</h2>
              <p className="text-secondary-text max-w-sm mx-auto">You haven't booked any appointments. Start by choosing a doctor from our expert team.</p>
            </div>
            <button
              onClick={() => window.location.href = '/patient/book-appointment'}
              className="btn-primary"
            >
              Book Your First Appointment
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointments.map((app: any) => (
              <div key={app.id} className="card group hover:border-primary transition-all">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="flex items-start gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-medical-cyan-light border border-border-gray flex flex-col items-center justify-center flex-shrink-0 group-hover:border-primary/30 transition-colors">
                        <span className="text-[10px] uppercase font-black text-primary opacity-70">
                          {app.date.split('-')[1] === '09' ? 'Sep' : 'Oct'}
                        </span>
                        <span className="text-2xl font-black text-dark">{app.date.split('-')[2]}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-dark">{app.doctor}</h3>
                          <span className={clsx(
                            "px-3 py-0.5 rounded-full text-[10px] font-black uppercase border",
                            getStatusColor(app.status)
                          )}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-primary text-sm font-semibold">{app.department}</p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4">
                          <span className="flex items-center gap-2 text-xs text-secondary-text">
                            <Clock className="w-4 h-4 text-primary/60" /> {app.time}
                          </span>
                          <span className="flex items-center gap-2 text-xs text-secondary-text">
                            <MapPin className="w-4 h-4 text-primary/60" /> Main Medical Block, Room 402
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:flex-col justify-end gap-3 lg:min-w-[180px]">
                      {app.status === 'Pending Review' || app.status === 'Confirmed' ? (
                        <button
                          onClick={() => handleAction('cancel', app.id)}
                          className="px-4 py-2 text-error-red bg-red-50 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors border border-red-100"
                        >
                          Cancel Appointment
                        </button>
                      ) : null}
                      <button 
                        onClick={() => { setSelectedApp(app); setIsModalOpen(true); }}
                        className="btn-secondary h-[40px] text-xs px-4"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AppointmentDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedApp}
        role="patient"
        onAction={handleAction}
      />
    </PanelLayout>
  );
}

