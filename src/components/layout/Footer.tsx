import React from 'react';
import { Heart, Mail, Phone, MapPin, Globe, Share2, Info, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight">MediCare</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              MediCare is a leading healthcare provider dedicated to delivering world-class medical services with compassion and excellence. Your health is our priority.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <Globe className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <Share2 className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <Info className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">About Medicare</a></li>
              <li><a href="#departments" className="hover:text-primary transition-colors">Our Departments</a></li>
              <li><a href="#doctors" className="hover:text-primary transition-colors">Our Specialists</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Latest News</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Career Opportunities</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6">Patient Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Book Appointment</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Health Packages</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Emergency Services</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Insurance Partners</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Patient Stories</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Medical Plaza, Health Square, Tech City, 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>contact@medicare.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>&copy; 2026 MediCare Hospital Scheduling System. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
