import React from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { Calendar, ClipboardList, CheckCircle, Bell, ChevronRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function PatientDashboard() {
  const { user } = useAuth();

  const stats = [
    { title: 'Upcoming Appointment', value: '1', icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
    { title: 'Pending Request', value: '0', icon: ClipboardList, color: 'text-warning-orange', bg: 'bg-warning-orange/10' },
    { title: 'Completed Visits', value: '12', icon: CheckCircle, color: 'text-success-green', bg: 'bg-success-green/10' },
    { title: 'Notifications', value: '3', icon: Bell, color: 'text-primary', bg: 'bg-medical-cyan' },
  ];

  return (
    <PanelLayout role="patient">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-black text-dark mb-2">Welcome Back, {user?.name}!</h1>
          <p className="text-secondary-text">Manage your hospital appointments easily.</p>
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
          <div className="lg:col-span-2 space-y-8">
            {/* Live Availability Calendar */}
            <div className="card p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-dark flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" /> Live Appointment Schedule
                  </h2>
                  <p className="text-xs text-secondary-text mt-1">Real-time availability for the current week.</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-secondary-text">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Available
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-secondary-text">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Booked
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={day} className="text-center">
                    <p className="text-[10px] font-black text-secondary-text uppercase tracking-widest mb-4">{day}</p>
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((slot) => {
                        const status = Math.random() > 0.4 ? 'available' : 'booked';
                        return (
                          <div 
                            key={slot} 
                            className={cn(
                              "h-10 rounded-xl border transition-all cursor-pointer hover:scale-105",
                              status === 'available' ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                            )}
                            title={status === 'available' ? 'Click to book' : 'Slot occupied'}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-dark">Upcoming Appointment</h2>
              <Link to="/patient/appointments" className="text-primary text-sm font-semibold hover:underline">View All</Link>
            </div>

            <div className="card p-6 border-l-4 border-l-primary">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-medical-cyan rounded-full overflow-hidden shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&h=400&fit=crop"
                      alt="Doctor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark text-lg">Dr. Rahul Sharma</h3>
                    <p className="text-primary text-sm font-semibold">Cardiology</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-secondary-text">
                        <Calendar className="w-3 h-3" /> 10 Sept 2026
                      </span>
                      <span className="flex items-center gap-1 text-xs text-secondary-text">
                        <CheckCircle className="w-3 h-3" /> 10:30 AM
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <span className="px-4 py-1 bg-success-green/10 text-success-green text-xs font-bold rounded-full text-center">Confirmed</span>
                  <button className="btn-secondary h-[36px] text-xs px-4">View Details</button>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/10">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-xl font-black text-dark">Need a new appointment?</h3>
                <p className="text-secondary-text">Book a consultation with our expert doctors in just few clicks.</p>
              </div>
              <Link to="/patient/book-appointment" className="btn-primary whitespace-nowrap">
                Book Appointment
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-dark">Recent Activity</h2>
            <div className="card divide-y divide-border-gray">
              {[
                { title: 'Appointment Confirmed', time: '2 hours ago', icon: CheckCircle, color: 'text-success-green' },
                { title: 'New Message from Admin', time: '5 hours ago', icon: Bell, color: 'text-primary' },
                { title: 'Profile Updated', time: '1 day ago', icon: User, color: 'text-secondary-text' },
              ].map((item, i) => (
                <div key={i} className="p-4 flex items-start gap-4 hover:bg-medical-cyan-light transition-colors">
                  <div className={`mt-1 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark">{item.title}</p>
                    <p className="text-xs text-secondary-text">{item.time}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-border-gray ml-auto mt-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}
