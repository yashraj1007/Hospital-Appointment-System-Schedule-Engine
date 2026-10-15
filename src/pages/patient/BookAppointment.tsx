import React, { useState, useEffect } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { Calendar as CalendarIcon, Clock, Stethoscope, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DEPARTMENTS, DOCTORS, TIME_SLOTS } from '../../utils/dummyData';
import { useAuth } from '../../context/AuthContext';
import { format, addDays, isSameDay } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BookAppointment() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: user?.name || '',
    phone: '',
    department: '',
    doctorId: '',
    date: new Date(),
    slot: '',
    reason: ''
  });

  const selectedDoctor = DOCTORS.find(d => d.id === formData.doctorId);
  const [availableDates] = useState(() => {
    return Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i));
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save to localStorage
      const newAppointment = {
        id: `REQ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        ...formData,
        doctor: selectedDoctor?.name,
        status: 'Pending Review',
        priority: 'Normal',
        date: format(formData.date, 'yyyy-MM-dd')
      };

      const existing = JSON.parse(localStorage.getItem('careconnect_appointments') || '[]');
      localStorage.setItem('careconnect_appointments', JSON.stringify([...existing, newAppointment]));
      setStep(4);
    }
  };

  return (
    <PanelLayout role="patient">
      <div className="max-w-2xl mx-auto py-8">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-dark mb-1">Book An Appointment</h1>
          <p className="text-sm text-secondary-text">Fill in the details to schedule your visit with our specialists.</p>
        </div>

        {step === 4 ? (
          <div className="card p-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="bg-success-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="text-success-green w-12 h-12" />
            </div>
            <h2 className="text-2xl font-black text-dark">Appointment Request Submitted</h2>
            <div className="bg-medical-cyan-light p-6 rounded-2xl border border-border-gray">
              <p className="text-secondary-text mb-4 text-sm">
                Your request has been sent to the hospital administrator.
                Our team will confirm your appointment after checking doctor availability.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning-orange/10 text-warning-orange rounded-full text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                Pending Admin Review
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/patient/appointments'}
              className="btn-primary w-full"
            >
              View My Appointments
            </button>
          </div>
        ) : (
          <div className="card p-0">
            <div className="bg-medical-cyan h-2 w-full">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <h3 className="text-lg font-bold text-dark flex items-center gap-2">
                    <User className="text-primary w-5 h-5" /> Basic Information
                  </h3>
                  <div className="grid gap-6">
                    <div>
                      <label className="label">Patient Name</label>
                      <input
                        type="text"
                        className="input-field"
                        value={formData.patientName}
                        onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Phone Number</label>
                      <input
                        type="tel"
                        className="input-field"
                        placeholder="e.g. +1 234 567 890"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Select Specialty</label>
                      <select
                        className="input-field"
                        value={formData.department}
                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                        required
                      >
                        <option value="">Choose Department</option>
                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="label">Select Doctor</label>
                      <select
                        className="input-field"
                        value={formData.doctorId}
                        onChange={e => setFormData({ ...formData, doctorId: e.target.value })}
                        required
                      >
                        <option value="">Choose Doctor</option>
                        {DOCTORS.filter(d => !formData.department || d.specialty === formData.department).map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-lg font-bold text-dark flex items-center gap-2 mb-6">
                      <CalendarIcon className="text-primary w-5 h-5" /> Select Date
                    </h3>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                      {availableDates.map((date) => {
                        const isSelected = isSameDay(date, formData.date);
                        return (
                          <button
                            key={date.toString()}
                            type="button"
                            onClick={() => setFormData({ ...formData, date })}
                            className={clsx(
                              "flex flex-col items-center justify-center p-3 rounded-xl border transition-all",
                              isSelected
                                ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                                : "bg-white border-border-gray text-dark hover:border-primary/50"
                            )}
                          >
                            <span className="text-[10px] uppercase font-bold opacity-70">{format(date, 'EEE')}</span>
                            <span className="text-lg font-black">{format(date, 'dd')}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-dark flex items-center gap-2 mb-6">
                      <Clock className="text-primary w-5 h-5" /> Available Time Slots
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = formData.slot === slot;
                        const isReserved = slot === "10:30 AM" && isSameDay(formData.date, new Date(2026, 8, 10)); // Demo reservation
                        const isUnavailable = slot === "11:30 AM"; // Demo unavailable

                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isReserved || isUnavailable}
                            onClick={() => setFormData({ ...formData, slot })}
                            className={cn(
                              "py-3 rounded-xl border font-bold text-xs transition-all relative overflow-hidden",
                              isSelected
                                ? "bg-primary border-primary text-white shadow-lg"
                                : isReserved
                                  ? "bg-red-50 border-red-500 text-red-600 cursor-not-allowed opacity-60"
                                  : isUnavailable
                                    ? "bg-gray-50 border-gray-300 text-gray-400 cursor-not-allowed opacity-40"
                                    : "bg-green-50 border-green-500 text-green-700 hover:bg-green-100"
                            )}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-border-gray">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary-text">
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-100"></div> Available
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary-text">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-100"></div> Booked
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary-text">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div> Unavailable
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary-text">
                        <div className="w-3 h-3 rounded-full bg-primary shadow-sm shadow-primary/20"></div> Selected
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-lg font-bold text-dark flex items-center gap-2 mb-4">
                      <AlertCircle className="text-primary w-5 h-5" /> Reason for Visit
                    </h3>
                    <textarea
                      className="input-field h-32 py-3 resize-none"
                      placeholder="Describe your symptoms or reason for appointment..."
                      value={formData.reason}
                      onChange={e => setFormData({ ...formData, reason: e.target.value })}
                      required
                    />
                    <p className="text-xs text-secondary-text mt-2 italic">
                      Your reason for visit helps the administrator determine appointment priority.
                    </p>
                  </div>

                  <div className="bg-medical-cyan-light border border-border-gray rounded-2xl p-6">
                    <h4 className="font-bold text-dark mb-4">Appointment Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-secondary-text">Doctor</p>
                        <p className="font-bold text-dark">{selectedDoctor?.name}</p>
                      </div>
                      <div>
                        <p className="text-secondary-text">Department</p>
                        <p className="font-bold text-dark">{formData.department}</p>
                      </div>
                      <div>
                        <p className="text-secondary-text">Date</p>
                        <p className="font-bold text-dark">{format(formData.date, 'dd MMMM yyyy')}</p>
                      </div>
                      <div>
                        <p className="text-secondary-text">Time Slot</p>
                        <p className="font-bold text-dark">{formData.slot}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="btn-secondary flex-1"
                  >
                    Back
                  </button>
                )}
                <button type="submit" className="btn-primary flex-1">
                  {step === 3 ? 'Request Appointment' : 'Next Step'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </PanelLayout>
  );
}
