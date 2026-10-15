import React, { useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { Search, Filter, Calendar, Clock, User, Stethoscope, ChevronRight, Download } from 'lucide-react';
import { INITIAL_APPOINTMENTS } from '../../utils/dummyData';
import { clsx } from 'clsx';
import AppointmentDetailsModal from '../../components/modals/AppointmentDetailsModal';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('careconnect_appointments');
    const local = saved ? JSON.parse(saved) : [];
    return [...INITIAL_APPOINTMENTS, ...local];
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
    const newStatus = action === 'confirm' ? 'Confirmed' : action === 'cancel' ? 'Cancelled' : 'Completed';
    const updated = appointments.map(a => a.id === id ? { ...a, status: newStatus } : a);
    setAppointments(updated);
    
    // Save to local storage for persistence in this demo
    const saved = JSON.parse(localStorage.getItem('careconnect_appointments') || '[]');
    const isLocal = saved.some((s: any) => s.id === id);
    if (isLocal) {
      localStorage.setItem('careconnect_appointments', JSON.stringify(saved.map((s: any) => s.id === id ? { ...s, status: newStatus } : s)));
    } else {
      // If it's from INITIAL_APPOINTMENTS, we just track it in state or we'd need a more complex sync.
      // For demo, we'll just alert.
    }
    
    setIsModalOpen(false);
    alert(`Appointment ${newStatus.toLowerCase()} successfully!`);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Patient,Doctor,Department,Date,Time,Status"].join(",") + "\n"
      + appointments.map(a => `${a.id},${a.patientName},${a.doctor},${a.department},${a.date},${a.time},${a.status}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "careconnect_appointments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PanelLayout role="admin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-dark mb-2">All Appointments</h1>
            <p className="text-secondary-text">Centralized database of all hospital consultations.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={handleExport}
              className="btn-secondary flex items-center gap-2 h-[40px] px-4 text-sm"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <div className="flex-1 md:flex-none relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID or Patient..."
                className="input-field pl-10 h-[40px] text-sm w-full md:w-64"
              />
            </div>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-medical-cyan-light border-b border-border-gray">
                <tr>
                  <th className="px-6 py-4 text-xs font-black text-dark uppercase tracking-wider">Appointment ID</th>
                  <th className="px-6 py-4 text-xs font-black text-dark uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-4 text-xs font-black text-dark uppercase tracking-wider">Doctor & Dept</th>
                  <th className="px-6 py-4 text-xs font-black text-dark uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 text-xs font-black text-dark uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-4 text-xs font-black text-dark uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-black text-dark uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-gray">
                {appointments.map((app: any) => (
                  <tr key={app.id} className="hover:bg-medical-cyan-light transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded">
                        {app.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {app.patientName.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-dark">{app.patientName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-dark">{app.doctor}</p>
                        <p className="text-xs text-secondary-text">{app.department}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-dark flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-primary/60" /> {app.date}
                        </p>
                        <p className="text-xs text-secondary-text flex items-center gap-2">
                          <Clock className="w-3 h-3 text-primary/60" /> {app.time}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "text-[10px] font-black uppercase px-2 py-1 rounded",
                        app.priority === 'High' ? "bg-warning-orange text-white" : 
                        app.priority === 'Emergency' ? "bg-error-red text-white" :
                        "bg-success-green text-white"
                      )}>
                        {app.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase border",
                        getStatusColor(app.status)
                      )}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => { setSelectedApp(app); setIsModalOpen(true); }}
                        className="text-secondary-text hover:text-primary transition-colors flex items-center justify-end w-full"
                      >
                        <span className="text-xs font-bold mr-2 group-hover:underline">View Details</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AppointmentDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedApp}
        role="admin"
        onAction={handleAction}
      />
    </PanelLayout>
  );
}

