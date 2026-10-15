import React from 'react';
import PanelLayout from '../layout/PanelLayout';
import { Construction } from 'lucide-react';

export default function ComingSoon({ role, pageName }: { role: 'patient' | 'doctor' | 'admin', pageName: string }) {
  return (
    <PanelLayout role={role}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="bg-medical-cyan p-6 rounded-full mb-6">
          <Construction className="w-12 h-12 text-primary animate-pulse" />
        </div>
        <h1 className="text-3xl font-black text-dark mb-4">{pageName}</h1>
        <p className="text-secondary-text max-w-md leading-relaxed">
          We are currently working hard to bring you the <span className="font-bold text-dark">{pageName}</span> feature. 
          Check back soon for updates!
        </p>
      </div>
    </PanelLayout>
  );
}
