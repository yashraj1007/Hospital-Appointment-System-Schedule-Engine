import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Shield, Activity, Calendar, Users, MapPin, Phone, Mail, ChevronRight, CheckCircle2, Award, Clock } from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../../utils/dummyData';
import Footer from '../../components/layout/Footer';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-border-gray sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary">
              <Heart className="text-white w-6 h-6 fill-current" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-dark">MediCare</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="text-dark hover:text-primary transition-colors">Home</Link>
            <a href="#doctors" className="text-secondary-text hover:text-dark transition-colors">Doctors</a>
            <a href="#departments" className="text-secondary-text hover:text-dark transition-colors">Departments</a>
            <a href="#about" className="text-secondary-text hover:text-dark transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-dark hover:text-primary transition-colors hidden sm:block">Login</Link>
            <button
              onClick={() => navigate('/login')}
              className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm transition-all hover:opacity-90"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-medical-cyan py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right hidden lg:block"></div>
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 bg-white border border-border-gray px-4 py-1.5 rounded-full text-secondary-text font-bold text-xs uppercase tracking-wider shadow-sm">
              <Shield className="w-4 h-4 text-primary" />
              Certified Excellence in Healthcare
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-dark leading-tight tracking-tight">
              Compassionate Care, <br />
              <span className="text-primary">Advanced Medicine.</span>
            </h1>
            <p className="text-lg text-secondary-text max-w-xl leading-relaxed font-medium">
              Experience world-class medical care with the latest technology and compassionate experts. Book hospital appointments instantly and manage your records online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/login')} className="btn-primary px-10 shadow-lg shadow-primary/20">
                Book An Appointment
              </button>
              <a href="#about" className="btn-secondary px-10 bg-white/50 backdrop-blur">
                Learn More
              </a>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="text-2xl font-black text-dark">50+</p>
                <p className="text-xs font-bold text-secondary-text uppercase tracking-widest">Specialists</p>
              </div>
              <div className="w-px h-8 bg-border-gray"></div>
              <div className="text-center">
                <p className="text-2xl font-black text-dark">25k+</p>
                <p className="text-xs font-bold text-secondary-text uppercase tracking-widest">Patients</p>
              </div>
              <div className="w-px h-8 bg-border-gray"></div>
              <div className="text-center">
                <p className="text-2xl font-black text-dark">15+</p>
                <p className="text-xs font-bold text-secondary-text uppercase tracking-widest">Years Exp</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="relative z-10 card p-4 transform transition-all hover:-translate-y-2 duration-500 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&h=900&fit=crop"
                alt="Modern Hospital Building"
                className="rounded-xl"
              />
              <div className="absolute -bottom-6 -left-6 card p-6 flex items-center gap-4 shadow-2xl bg-white border-primary/20">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Activity className="text-primary w-8 h-8" />
                </div>
                <div>
                  <p className="text-2xl font-black text-dark">99.9%</p>
                  <p className="text-sm text-secondary-text font-bold">Patient Satisfaction</p>
                </div>
              </div>
            </div>
            {/* Abstract elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 -right-20 w-48 h-48 bg-medical-cyan rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white border-y border-border-gray">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-2xl font-black text-dark mb-2 tracking-tight uppercase">Why Choose MediCare?</h2>
          <p className="text-sm text-secondary-text max-w-2xl mx-auto">Providing comprehensive medical services with a modern approach to patient care.</p>
        </div>
        <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Calendar, title: "Easy Booking", desc: "Select your preferred slot and doctor in seconds." },
            { icon: Users, title: "Top Doctors", desc: "Consult with highly experienced medical professionals." },
            { icon: Shield, title: "Secure Data", desc: "Your medical records are encrypted and strictly private." },
            { icon: Activity, title: "Real-time Tracking", desc: "Track your appointment status and reports instantly." }
          ].map((f, i) => (
            <div key={i} className="card p-8 hover:border-primary/50 transition-colors">
              <div className="bg-medical-cyan p-4 rounded-2xl w-fit mb-6">
                <f.icon className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">{f.title}</h3>
              <p className="text-secondary-text">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&h=1200&fit=crop" 
                alt="Medical Team" 
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-primary text-white p-8 rounded-3xl shadow-xl hidden md:block">
                <p className="text-4xl font-black mb-1">15+</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Years of Service</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">About MediCare</h3>
                <h2 className="text-4xl font-black text-dark leading-tight">We Are Committed To Your <br />Health & Wellbeing</h2>
              </div>
              <p className="text-secondary-text leading-relaxed">
                MediCare Hospital has been at the forefront of medical innovation for over 15 years. We provide comprehensive healthcare services through our state-of-the-art facilities and a team of dedicated specialists.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: CheckCircle2, text: "Qualified Specialists" },
                  { icon: Award, text: "Award Winning Care" },
                  { icon: Clock, text: "24/7 Emergency Room" },
                  { icon: Activity, text: "Modern Equipment" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-bold text-dark text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-24 bg-medical-cyan/30">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-black text-dark mb-2 tracking-tight">Specialized Departments</h2>
          <p className="text-sm text-secondary-text max-w-xl mx-auto">Explore our wide range of medical specialties designed to cater to your every health need.</p>
        </div>
        <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Cardiology', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', desc: 'Comprehensive heart care and cardiovascular surgery.' },
            { name: 'Neurology', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop', desc: 'Expert diagnosis for brain and nervous system disorders.' },
            { name: 'Pediatrics', image: 'https://images.unsplash.com/photo-1502740479091-635887520276?w=600&h=400&fit=crop', desc: 'Specialized healthcare for infants, children, and teens.' },
          ].map((dept, i) => (
            <div key={i} className="card overflow-hidden group hover:border-primary transition-all">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={dept.image} 
                  alt={dept.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-medical-cyan p-2 rounded-lg">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-dark text-lg">{dept.name}</h3>
                </div>
                <p className="text-sm text-secondary-text leading-relaxed mb-4">{dept.desc}</p>
                <button className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:underline">
                  Learn More <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Doctors */}
      <section id="doctors" className="py-24 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black text-dark mb-4">Meet Our Experts</h2>
            <p className="text-secondary-text">Highly qualified doctors across various departments ready to assist you.</p>
          </div>
          <button 
            onClick={() => {
              const el = document.getElementById('doctors');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary mt-6 md:mt-0 px-8"
          >
            View All Doctors
          </button>
        </div>
        <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOCTORS.slice(0, 3).map((doc) => (
            <div key={doc.id} className="card group">
              <div className="relative overflow-hidden h-64">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                  {doc.specialty}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-dark mb-1">{doc.name}</h3>
                <p className="text-sm text-secondary-text mb-4">{doc.experience} Experience</p>
                <button onClick={() => navigate('/login')} className="w-full btn-primary h-[40px] text-sm">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

