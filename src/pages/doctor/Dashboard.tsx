import React, { useState, useEffect } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { Calendar, Users, CheckCircle, Clock, ChevronRight, User, AlertCircle, FileText } from 'lucide-react';
import { INITIAL_APPOINTMENTS } from '../../utils/dummyData';
import { useAuth } from '../../context/AuthContext';
import { clsx } from 'clsx';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('careconnect_appointments');
    const local = saved ? JSON.parse(saved) : [];
    // Filter for current doctor
    return [...INITIAL_APPOINTMENTS, ...local].filter(a => a.doctor === user?.name && a.status === 'Confirmed');
  });

  const stats = [
    { title: "Today's Appointments", value: appointments.length.toString(), icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
    { title: 'Pending Reviews', value: '2', icon: AlertCircle, color: 'text-warning-orange', bg: 'bg-warning-orange/10' },
    { title: 'Completed Today', value: '8', icon: CheckCircle, color: 'text-success-green', bg: 'bg-success-green/10' },
    { title: 'Available Slots', value: '4', icon: Clock, color: 'text-primary', bg: 'bg-medical-cyan' },
  ];

  const handleMarkComplete = (id: string) => {
    const allSaved = JSON.parse(localStorage.getItem('careconnect_appointments') || '[]');
    const updated = allSaved.map((a: any) => a.id === id ? { ...a, status: 'Completed' } : a);
    localStorage.setItem('careconnect_appointments', JSON.stringify(updated));
    setAppointments(appointments.filter(a => a.id !== id));
  };

  return (
    <PanelLayout role="doctor">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-black text-dark mb-2">Good Morning, {user?.name}</h1>
          <p className="text-secondary-text">You have {appointments.length} appointments scheduled for today.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="card p-6 flex items-center gap-4">
              <div className={`${stat.bg} p-3 rounded-2xl`}>
                <stat.icon className={`${stat.color} w-8 h-8`} />
              </div>
              <div>
                <p className="text-2xl font-black text-dark">{stat.value}</p>
                <p className="text-sm text-secondary-text">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-dark">Today's Schedule</h2>
              <button className="text-primary text-sm font-semibold hover:underline">View Weekly</button>
            </div>

            <div className="space-y-4">
              {appointments.length === 0 ? (
                <div className="card p-12 text-center">
                  <CheckCircle className="w-12 h-12 text-success-green mx-auto mb-4" />
                  <p className="text-secondary-text">No more appointments for today. Great job!</p>
                </div>
              ) : (
                appointments.map((app: any, i) => (
                  <div key={app.id} className="card p-6 group hover:border-primary transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex gap-4">
                        <div className="relative">
                          <div className="w-14 h-14 bg-medical-cyan-light border border-border-gray rounded-2xl flex items-center justify-center font-black text-primary">
                            {app.time.split(':')[0]}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-green rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <h3 className="font-bold text-dark text-lg">{app.patientName}</h3>
                          <p className="text-sm text-secondary-text mb-2 flex items-center gap-2">
                            <FileText className="w-3 h-3" /> Routine Consultation
                          </p>
                          <div className="flex items-center gap-3">
                            <span className={clsx(
                              "text-[10px] font-black uppercase px-3 py-1 rounded-full",
                              app.priority === 'High' ? "bg-warning-orange/10 text-warning-orange" : 
                              app.priority === 'Emergency' ? "bg-error-red/10 text-error-red" :
                              "bg-success-green/10 text-success-green"
                            )}>
                              {app.priority} Priority
                            </span>
                            <span className="text-xs text-secondary-text font-medium">{app.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="btn-secondary h-[40px] px-4 text-xs flex-1 md:flex-none">View Patient</button>
                        <button
                          onClick={() => handleMarkComplete(app.id)}
                          className="btn-primary h-[40px] px-4 text-xs flex-1 md:flex-none"
                        >
                          Mark Completed
                        </button>
                      </div>
                    </div>
                    {app.reason && (
                      <div className="mt-6 p-4 bg-medical-cyan-light rounded-xl border border-dashed border-border-gray">
                        <p className="text-xs font-bold text-dark mb-1 uppercase tracking-wider">Patient Note:</p>
                        <p className="text-sm text-secondary-text line-clamp-1">"{app.reason}"</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-dark">Quick Actions</h2>
            <div className="grid gap-4">
              <button className="card p-4 flex items-center gap-4 hover:bg-medical-cyan-light transition-all text-left">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-dark">Update Availability</p>
                  <p className="text-xs text-secondary-text">Modify your working hours</p>
                </div>
              </button>
              <button className="card p-4 flex items-center gap-4 hover:bg-medical-cyan-light transition-all text-left">
                <div className="bg-success-green/10 p-3 rounded-xl text-success-green">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-dark">Patient Registry</p>
                  <p className="text-xs text-secondary-text">Browse your patient list</p>
                </div>
              </button>
            </div>

            <div className="card p-6 bg-primary text-white space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> Urgent Notice
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Hospital maintenance scheduled for Sunday, 13th Sept. System might be offline from 2 AM to 5 AM.
              </p>
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all">
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}
