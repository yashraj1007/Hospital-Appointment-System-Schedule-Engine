import React, { useState, useEffect } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { Users, Stethoscope, Calendar, Clock, AlertCircle, CheckCircle2, ChevronRight, Filter } from 'lucide-react';
import { INITIAL_APPOINTMENTS, DOCTORS, TIME_SLOTS } from '../../utils/dummyData';
import { clsx } from 'clsx';
import { format } from 'date-fns';

export default function AppointmentRequests() {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('careconnect_appointments');
    const local = saved ? JSON.parse(saved) : [];
    // Filter only pending ones for this page
    return [...INITIAL_APPOINTMENTS, ...local].filter(a => a.status === 'Pending Review');
  });

  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priority, setPriority] = useState('Normal');
  const [adminNotes, setAdminNotes] = useState('');
  const [allocatedSlot, setAllocatedSlot] = useState('');

  const openRequest = (app: any) => {
    setSelectedApp(app);
    setPriority(app.priority || 'Normal');
    setAdminNotes(app.adminNotes || '');
    setAllocatedSlot(app.time || '');
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    const allSaved = JSON.parse(localStorage.getItem('careconnect_appointments') || '[]');
    const isInitial = INITIAL_APPOINTMENTS.some(a => a.id === selectedApp.id);

    const updatedApp = {
      ...selectedApp,
      status: 'Confirmed',
      priority,
      adminNotes,
      time: allocatedSlot
    };

    if (isInitial) {
      // In a real app, INITIAL_APPOINTMENTS would be in DB.
      // Here we'll just push to local storage as overrides if needed.
      localStorage.setItem('careconnect_appointments', JSON.stringify([...allSaved, updatedApp]));
    } else {
      const updatedList = allSaved.map((a: any) => a.id === selectedApp.id ? updatedApp : a);
      localStorage.setItem('careconnect_appointments', JSON.stringify(updatedList));
    }

    setAppointments(appointments.filter((a: any) => a.id !== selectedApp.id));
    setIsModalOpen(false);
  };

  return (
    <PanelLayout role="admin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-dark mb-2">Appointment Requests</h1>
            <p className="text-secondary-text">Review and allocate slots for incoming patient requests.</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-border-gray">
            <Filter className="w-4 h-4 text-secondary-text ml-2" />
            <select className="bg-transparent text-sm font-bold text-dark focus:outline-none pr-4">
              <option>All Departments</option>
              <option>Cardiology</option>
              <option>Pediatrics</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4">
          {appointments.length === 0 ? (
            <div className="card p-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-success-green mx-auto mb-4" />
              <p className="text-secondary-text font-medium">No pending requests found.</p>
            </div>
          ) : (
            appointments.map((app: any) => (
              <div key={app.id} className="card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-primary transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="bg-medical-cyan p-3 rounded-2xl">
                    <Users className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-dark">{app.patientName}</h3>
                      <span className="text-[10px] bg-medical-cyan border border-primary/20 text-primary px-2 py-0.5 rounded uppercase font-black">
                        {app.id}
                      </span>
                    </div>
                    <p className="text-sm text-secondary-text">{app.department} • {app.doctor}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-secondary-text flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {app.date}
                      </span>
                      <span className="text-xs text-secondary-text flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Preferred: {app.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="flex flex-col items-end hidden md:flex">
                    <span className="text-xs font-bold text-warning-orange bg-warning-orange/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      Pending Review
                    </span>
                    <span className="text-[10px] text-secondary-text mt-1">Requested 2h ago</span>
                  </div>
                  <button
                    onClick={() => openRequest(app)}
                    className="btn-primary h-[40px] px-6 text-sm flex-1 md:flex-none"
                  >
                    View Request
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Request Details Modal */}
      {isModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-border-gray flex items-center justify-between bg-medical-cyan-light">
              <h2 className="text-xl font-black text-dark">Review Request - {selectedApp.id}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-4">Patient Information</h4>
                    <div className="card p-6 bg-medical-cyan-light/50 border-none">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-secondary-text">Name</span>
                          <span className="text-sm font-bold text-dark">{selectedApp.patientName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-secondary-text">Age / Gender</span>
                          <span className="text-sm font-bold text-dark">28 / Male</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-secondary-text">Phone</span>
                          <span className="text-sm font-bold text-dark">+1 (555) 0123</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-4">Reason for Visit</h4>
                    <div className="bg-white border border-border-gray rounded-2xl p-6 italic text-secondary-text text-sm leading-relaxed">
                      "{selectedApp.reason}"
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-4">Assign Priority</h4>
                    <div className="flex gap-3">
                      {[
                        { label: 'Emergency', color: 'bg-error-red', val: 'Emergency' },
                        { label: 'High', color: 'bg-warning-orange', val: 'High' },
                        { label: 'Normal', color: 'bg-success-green', val: 'Normal' },
                        { label: 'Routine', color: 'bg-secondary-text', val: 'Routine' }
                      ].map((p) => (
                        <button
                          key={p.val}
                          onClick={() => setPriority(p.val)}
                          className={clsx(
                            "flex-1 py-2 px-1 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all border-2",
                            priority === p.val
                              ? `border-${p.color.replace('bg-', '')} ${p.color} text-white ring-2 ring-offset-1 ring-${p.color.replace('bg-', '')}/30`
                              : "border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200"
                          )}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-4">Slot Allocation</h4>
                    <div className="card p-6 space-y-6">
                      <div>
                        <p className="text-xs font-bold text-dark mb-3">Doctor Availability: {selectedApp.doctor}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map(slot => {
                            const isAllocated = allocatedSlot === slot;
                            const isTaken = slot === "09:30 AM" || slot === "11:00 AM"; // Demo

                            return (
                              <button
                                key={slot}
                                onClick={() => !isTaken && setAllocatedSlot(slot)}
                                className={clsx(
                                  "py-2 rounded text-[10px] font-bold border transition-all",
                                  isAllocated
                                    ? "bg-primary border-primary text-white"
                                    : isTaken
                                      ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                                      : "bg-white border-border-gray text-dark hover:border-primary/50"
                                )}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <label className="label">Admin Notes (Internal)</label>
                        <textarea
                          className="input-field h-24 py-2 text-sm"
                          placeholder="Add notes for the doctor or staff..."
                          value={adminNotes}
                          onChange={e => setAdminNotes(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="btn-secondary flex-1"
                    >
                      Reject
                    </button>
                    <button
                      onClick={handleConfirm}
                      disabled={!allocatedSlot}
                      className="btn-primary flex-1 disabled:opacity-50"
                    >
                      Allocate & Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PanelLayout>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
