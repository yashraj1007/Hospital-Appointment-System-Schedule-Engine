import React from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { Users, Stethoscope, Calendar, Clock, AlertCircle, CheckCircle2, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Patients', value: '1,284', icon: Users, color: 'text-primary', bg: 'bg-primary/10', trend: '+12%', up: true },
    { title: 'Active Doctors', value: '42', icon: Stethoscope, color: 'text-success-green', bg: 'bg-success-green/10', trend: '0%', up: true },
    { title: 'Today Appointments', value: '24', icon: Calendar, color: 'text-warning-orange', bg: 'bg-warning-orange/10', trend: '+4%', up: true },
    { title: 'Pending Requests', value: '8', icon: AlertCircle, color: 'text-error-red', bg: 'bg-error-red/10', trend: '-2%', up: false },
  ];

  const handleDownloadReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Metric,Value"].join(",") + "\n"
      + stats.map(s => `${s.title},${s.value}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "medicare_admin_dashboard_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PanelLayout role="admin">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-dark mb-2">Hospital Administration</h1>
            <p className="text-secondary-text">Overview of hospital operations and appointment statistics.</p>
          </div>
          <div className="hidden sm:block">
            <button 
              onClick={handleDownloadReport}
              className="btn-primary"
            >
              Download Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="card p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className={`${stat.bg} p-3 rounded-2xl`}>
                  <stat.icon className={`${stat.color} w-8 h-8`} />
                </div>
                <span className={clsx(
                  "text-xs font-bold flex items-center gap-1",
                  stat.up ? "text-success-green" : "text-error-red"
                )}>
                  {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-3xl font-black text-dark">{stat.value}</p>
                <p className="text-sm text-secondary-text font-medium">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-dark">Recent Requests</h2>
              <Link to="/admin/requests" className="text-primary text-sm font-semibold hover:underline">View All Requests</Link>
            </div>

            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-medical-cyan-light border-b border-border-gray">
                    <tr>
                      <th className="px-6 py-4 text-xs font-black text-dark uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-4 text-xs font-black text-dark uppercase tracking-wider">Department</th>
                      <th className="px-6 py-4 text-xs font-black text-dark uppercase tracking-wider">Doctor</th>
                      <th className="px-6 py-4 text-xs font-black text-dark uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-4 text-xs font-black text-dark uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-gray">
                    {[
                      { name: 'Rahul Patil', dept: 'Cardiology', doc: 'Dr. Sharma', prio: 'High', color: 'text-warning-orange' },
                      { name: 'Sneha Gupta', dept: 'Pediatrics', doc: 'Dr. Varma', prio: 'Normal', color: 'text-success-green' },
                      { name: 'Amit Kumar', dept: 'Orthopedics', doc: 'Dr. Patel', prio: 'Emergency', color: 'text-error-red' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-medical-cyan-light transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                              {row.name.charAt(0)}
                            </div>
                            <span className="text-sm font-bold text-dark">{row.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-secondary-text">{row.dept}</td>
                        <td className="px-6 py-4 text-sm text-secondary-text font-medium">{row.doc}</td>
                        <td className="px-6 py-4">
                          <span className={clsx("text-[10px] font-black uppercase px-2 py-1 rounded-full bg-opacity-10", row.color, `bg-${row.color.split('-')[1]}-500`)}>
                            {row.prio}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link to="/admin/requests" className="text-primary hover:underline text-xs font-bold">Review</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weekly Schedule Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-dark">Weekly Appointment Schedule</h2>
              <div className="card p-6">
                <div className="grid grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 p-2 rounded-xl bg-gray-50 border border-border-gray">
                      <span className="text-[10px] font-black uppercase text-secondary-text tracking-widest">{day}</span>
                      <span className="text-lg font-black text-dark">{14 + i}</span>
                      <div className="w-full space-y-1">
                        <div className="h-1 bg-primary rounded-full w-[80%]"></div>
                        <div className="h-1 bg-medical-cyan rounded-full w-[40%]"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-dark">System Activity</h2>
            <div className="card p-6 space-y-6">
              {[
                { label: 'Admin Login', time: '10:45 AM', user: 'Sarah' },
                { label: 'Report Exported', time: '09:30 AM', user: 'System' },
                { label: 'New Patient Registration', time: '08:15 AM', user: 'Rahul' },
                { label: 'Server Update', time: '04:00 AM', user: 'Automated' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-medical-cyan p-2 rounded-lg mt-1">
                    <Clock className="text-primary w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark">{activity.label}</p>
                    <p className="text-[10px] text-secondary-text">{activity.time} • by {activity.user}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-dark">System Health</h2>
            <div className="card p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-dark">Occupancy Rate</span>
                  <span className="text-primary">84%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[84%]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-dark">Doctor Availability</span>
                  <span className="text-success-green">92%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-success-green rounded-full w-[92%]"></div>
                </div>
              </div>
              <div className="pt-6 border-t border-border-gray">
                <div className="flex items-center gap-4">
                  <div className="bg-medical-cyan p-3 rounded-xl">
                    <Activity className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark">Server Status</p>
                    <p className="text-xs text-success-green font-bold">Operational • 99.9%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
