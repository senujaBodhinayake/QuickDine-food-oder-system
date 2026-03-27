// src/components/Footer.jsx
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-emerald-800 text-neutral-content p-6 fixed bottom-0 w-full z-50 shadow-md">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <h3 className="font-bold mb-2">QuickDine</h3>
          <p>&copy; {new Date().getFullYear()} QuickDine. All rights reserved.</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Contact</h3>
          <p className="flex items-center gap-2"><Phone size={16} /> +94 77 123 4567</p>
          <p className="flex items-center gap-2"><Mail size={16} /> support@quickdine.com</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Address</h3>
          <p className="flex items-center gap-2"><MapPin size={16} /> 123 Main Street, Galle, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;