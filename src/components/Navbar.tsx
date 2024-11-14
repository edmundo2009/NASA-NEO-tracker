import React from 'react';
import { Calendar, Rocket, Menu, X } from 'lucide-react';

interface NavbarProps {
  onDateChange: (date: string) => void;
  currentDate: string;
  onMenuClick: () => void;
  isMobileMenuOpen: boolean;
}

export default function Navbar({ onDateChange, currentDate, onMenuClick, isMobileMenuOpen }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Rocket className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">NEO Tracker</span>
          </div>
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5" />
            <input
              type="date"
              value={currentDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="bg-indigo-700 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              onClick={onMenuClick}
              className="sm:hidden ml-4 p-2 hover:bg-indigo-700 rounded-md"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}