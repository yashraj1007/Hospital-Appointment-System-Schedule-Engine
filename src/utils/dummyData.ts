export const DEPARTMENTS = [
  "General Medicine",
  "Cardiology",
  "Orthopedics",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Gynecology",
  "Opthalmology"
];

export const DOCTORS = [
  {
    id: "doc1",
    name: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    experience: "12 Years",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&h=400&fit=crop",
    availability: "Mon, Wed, Fri",
    rating: 4.8
  },
  {
    id: "doc2",
    name: "Dr. Priya Varma",
    specialty: "Pediatrics",
    experience: "8 Years",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&h=400&fit=crop",
    availability: "Tue, Thu, Sat",
    rating: 4.9
  },
  {
    id: "doc3",
    name: "Dr. Amit Patel",
    specialty: "Orthopedics",
    experience: "15 Years",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&h=400&fit=crop",
    availability: "Daily",
    rating: 4.7
  },
  {
    id: "doc4",
    name: "Dr. Sneha Reddy",
    specialty: "Dermatology",
    experience: "10 Years",
    image: "https://images.unsplash.com/photo-1559839734-2b71f153678e?q=80&w=400&h=400&fit=crop",
    availability: "Mon, Tue, Thu",
    rating: 4.6
  }
];

export const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "REQ001",
    patientName: "Rahul Patil",
    patientId: "p1",
    department: "Cardiology",
    doctor: "Dr. Rahul Sharma",
    date: "2026-09-10",
    time: "10:30 AM",
    reason: "Chest discomfort and mild shortness of breath during physical activity.",
    priority: "High",
    status: "Pending Review",
    adminNotes: ""
  }
];
