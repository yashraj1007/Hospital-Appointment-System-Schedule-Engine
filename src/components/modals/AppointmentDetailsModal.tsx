import React from 'react';
import { X, Calendar, Clock, User, Stethoscope, MapPin, Phone, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: any;
  role: 'patient' | 'doctor' | 'admin';
  onAction?: (action: 'confirm' | 'cancel' | 'complete', id: string) => void;
}

export default function AppointmentDetailsModal({ isOpen, onClose, appointment, role, onAction }: AppointmentDetailsModalProps) {
  if (!isOpen || !appointment) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-success-green/10 text-success-green border-success-green/20';
      case 'Pending Review': return 'bg-warning-orange/10 text-warning-orange border-warning-orange/20';
      case 'Cancelled': return 'bg-gray-100 text-gray-500 border-gray-200';
      case 'Completed': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-border-gray">
          <div>
            <h2 className="text-xl font-black text-dark">Appointment Details</h2>
            <p className="text-xs text-secondary-text mt-1">ID: {appointment.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-medical-cyan rounded-xl transition-colors">
            <X className="w-6 h-6 text-secondary-text" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={clsx(
                  "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                  getStatusColor(appointment.status)
                )}>
                  {appointment.status}
                </div>
                <div className={clsx(
                  "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white",
                  appointment.priority === 'Emergency' ? 'bg-error-red' : 
                  appointment.priority === 'High' ? 'bg-warning-orange' : 'bg-success-green'
                )}>
                  {appointment.priority} Priority
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-medical-cyan flex flex-col items-center justify-center font-black text-primary">
                  <span className="text-[10px] uppercase opacity-60">Sep</span>
                  <span className="text-2xl">{appointment.date.split('-')[2]}</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-dark">{appointment.time}</p>
                  <p className="text-sm text-secondary-text">{appointment.date}</p>
                </div>
              </div>
            </div>

            <div className="bg-medical-cyan/30 p-6 rounded-2xl border border-border-gray flex flex-col justify-center gap-4 md:w-64">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs font-bold text-dark">Main Block, Room 402</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs font-bold text-dark">+1 (555) 098-7654</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-secondary-text uppercase tracking-widest flex items-center gap-2">
                <User className="w-3 h-3" /> Patient Information
              </h3>
              <div className="p-4 bg-gray-50 rounded-xl border border-border-gray">
                <p className="font-bold text-dark">{appointment.patientName}</p>
                <p className="text-xs text-secondary-text mt-1">Patient ID: CC-P-00234</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black text-secondary-text uppercase tracking-widest flex items-center gap-2">
                <Stethoscope className="w-3 h-3" /> Medical Provider
              </h3>
              <div className="p-4 bg-gray-50 rounded-xl border border-border-gray">
                <p className="font-bold text-dark">{appointment.doctor}</p>
                <p className="text-xs text-secondary-text mt-1">{appointment.department}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-secondary-text uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="w-3 h-3" /> Reason for Visit
            </h3>
            <div className="p-4 bg-medical-cyan/20 rounded-xl border border-medical-cyan border-dashed">
              <p className="text-sm text-dark leading-relaxed">
                {appointment.reason || "General health consultation regarding recurring symptoms. Patient requested full blood work and neurological assessment."}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-border-gray flex justify-end gap-4">
          <button onClick={onClose} className="btn-secondary px-8">Close</button>
          
          {role !== 'patient' && appointment.status === 'Pending Review' && (
            <>
              <button 
                onClick={() => onAction?.('cancel', appointment.id)}
                className="px-6 py-2 bg-red-50 text-red-700 font-bold rounded-xl text-sm border border-red-200 flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
              <button 
                onClick={() => onAction?.('confirm', appointment.id)}
                className="px-6 py-2 bg-primary text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                <CheckCircle className="w-4 h-4" /> Confirm
              </button>
            </>
          )}

          {appointment.status === 'Confirmed' && (
            <button 
              onClick={() => onAction?.('cancel', appointment.id)}
              className="px-6 py-2 bg-red-50 text-red-700 font-bold rounded-xl text-sm border border-red-200 flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" /> Cancel Appointment
            </button>
          )}

          {role === 'doctor' && appointment.status === 'Confirmed' && (
            <button 
              onClick={() => onAction?.('complete', appointment.id)}
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-sm flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" /> Mark Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
