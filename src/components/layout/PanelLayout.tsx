import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  LayoutDashboard,
  Calendar,
  User,
  Bell,
  LogOut,
  Menu,
  X,
  Heart,
  Users,
  ClipboardList,
  Stethoscope,
  Settings,
  PieChart,
  MessageSquare,
  Check
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function PanelLayout({ children, role }: { children: React.ReactNode, role: 'patient' | 'doctor' | 'admin' }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const patientLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/patient/dashboard' },
    { name: 'Book Appointment', icon: Calendar, path: '/patient/book-appointment' },
    { name: 'My Appointments', icon: ClipboardList, path: '/patient/appointments' },
    { name: 'Notifications', icon: Bell, path: '/patient/notifications' },
    { name: 'Profile', icon: User, path: '/patient/profile' },
  ];

  const doctorLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/doctor/dashboard' },
    { name: 'Appointments', icon: Calendar, path: '/doctor/appointments' },
    { name: 'Patients', icon: Users, path: '/doctor/patients' },
    { name: 'Notifications', icon: Bell, path: '/doctor/notifications' },
    { name: 'Profile', icon: User, path: '/doctor/profile' },
  ];

  const adminLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Requests', icon: MessageSquare, path: '/admin/requests' },
    { name: 'Appointments', icon: Calendar, path: '/admin/appointments' },
    { name: 'Doctors', icon: Stethoscope, path: '/admin/doctors' },
    { name: 'Patients', icon: Users, path: '/admin/patients' },
    { name: 'Reports', icon: PieChart, path: '/admin/reports' },
    { name: 'Profile', icon: User, path: '/admin/profile' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const links = role === 'patient' ? patientLinks : role === 'doctor' ? doctorLinks : adminLinks;

  return (
    <div className="min-h-screen bg-medical-cyan flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-border-gray fixed lg:static inset-y-0 left-0 z-50 transition-all duration-300 transform",
          isSidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-20 flex items-center px-6 gap-3 border-b border-border-gray">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary shrink-0">
            <Heart className="text-white w-5 h-5 fill-current" />
          </div>
          {isSidebarOpen && <span className="text-xl font-extrabold tracking-tight text-dark">MediCare</span>}
        </div>

        <nav className="p-4 space-y-2 h-[calc(100vh-160px)] overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-secondary-text hover:bg-medical-cyan hover:text-dark"
                )
              }
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span>{link.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border-gray">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-error-red hover:bg-red-50 rounded-xl transition-all font-medium"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-border-gray flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-medical-cyan rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex items-center gap-4 relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-medical-cyan rounded-lg transition-colors group"
            >
              <Bell className="w-6 h-6 text-secondary-text group-hover:text-primary" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-error-red rounded-full border-2 border-white"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-border-gray rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50">
                <div className="p-4 border-b border-border-gray flex items-center justify-between bg-medical-cyan-light">
                  <h3 className="font-bold text-dark">Notifications</h3>
                  <button 
                    onClick={markAllAsRead}
                    className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div 
                        key={n.id} 
                        className={cn(
                          "p-4 border-b border-border-gray hover:bg-gray-50 transition-colors cursor-pointer relative",
                          !n.isRead && "bg-primary/5"
                        )}
                        onClick={() => markAsRead(n.id)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <p className={cn("text-sm font-bold", !n.isRead ? "text-dark" : "text-secondary-text")}>
                            {n.title}
                          </p>
                          {n.isRead && <Check className="w-3 h-3 text-success-green" />}
                        </div>
                        <p className="text-xs text-secondary-text line-clamp-2 mb-1">{n.message}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{n.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                      <p className="text-sm text-secondary-text font-medium">No notifications yet</p>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-gray-50 border-t border-border-gray text-center">
                  <button 
                    onClick={() => {
                      navigate(`/${role}/notifications`);
                      setShowNotifications(false);
                    }}
                    className="text-[10px] font-black text-secondary-text uppercase tracking-widest hover:text-primary"
                  >
                    View All Activity
                  </button>
                </div>
              </div>
            )}

            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-dark">{user?.name}</span>
              <span className="text-xs text-secondary-text capitalize">{user?.role}</span>
            </div>
            <div className="w-10 h-10 bg-medical-cyan border border-border-gray rounded-full flex items-center justify-center overflow-hidden">
              <User className="text-primary w-6 h-6" />
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8 flex-1">
          {children}
        </main>
      </div>

      {/* Mobile Backdrop */}
      {!isSidebarOpen && (
        <div
          className="fixed inset-0 bg-dark/20 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}
    </div>
  );
}
