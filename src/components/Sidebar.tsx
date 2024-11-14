import React from 'react';
import { AlertTriangle, Ruler, Target, Menu, X } from 'lucide-react';

interface SidebarProps {
  filters: {
    minSize: number;
    maxSize: number;
    showHazardous: boolean;
    maxDistance: number;
  };
  onFilterChange: (filters: any) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ filters, onFilterChange, isMobileOpen, onMobileClose }: SidebarProps) {
  const sidebarClasses = `
    fixed inset-x-0 top-16 bg-white shadow-lg z-40 transition-all duration-300 ease-in-out
    sm:relative sm:top-0 sm:w-64 sm:h-auto sm:shadow-none sm:transform-none sm:z-0
    ${isMobileOpen ? 'translate-y-0' : '-translate-y-full sm:translate-y-0'}
  `;

  return (
    <div className={sidebarClasses}>
      <div className="p-4 space-y-6 max-h-[40vh] sm:max-h-none overflow-y-auto">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Ruler className="h-5 w-5 mr-2" />
            Size Range (km)
          </h2>
          <div className="space-y-2">
            <label className="block text-sm">
              Minimum Size
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={filters.minSize}
                onChange={(e) => onFilterChange({ ...filters, minSize: parseFloat(e.target.value) })}
                className="w-full"
              />
              <span className="text-xs text-gray-500">{filters.minSize} km</span>
            </label>
            <label className="block text-sm">
              Maximum Size
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={filters.maxSize}
                onChange={(e) => onFilterChange({ ...filters, maxSize: parseFloat(e.target.value) })}
                className="w-full"
              />
              <span className="text-xs text-gray-500">{filters.maxSize} km</span>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Distance
          </h2>
          <label className="block text-sm">
            Max Distance (lunar distances)
            <input
              type="range"
              min="0"
              max="100"
              value={filters.maxDistance}
              onChange={(e) => onFilterChange({ ...filters, maxDistance: parseInt(e.target.value) })}
              className="w-full"
            />
            <span className="text-xs text-gray-500">{filters.maxDistance} LD</span>
          </label>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Hazard Filter
          </h2>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.showHazardous}
              onChange={(e) => onFilterChange({ ...filters, showHazardous: e.target.checked })}
              className="form-checkbox h-4 w-4 text-indigo-600"
            />
            <span className="text-sm">Show Potentially Hazardous</span>
          </label>
        </div>
      </div>
    </div>
  );
}