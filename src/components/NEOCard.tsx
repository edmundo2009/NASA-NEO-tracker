import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import type { NEO } from '../types/neo';

interface NEOCardProps {
  neo: NEO;
  isSelected: boolean;
  onClick: () => void;
}

export default function NEOCard({ neo, isSelected, onClick }: NEOCardProps) {
  const diameter = {
    min: neo.estimated_diameter.kilometers.estimated_diameter_min,
    max: neo.estimated_diameter.kilometers.estimated_diameter_max,
  };
  
  const averageSize = (diameter.min + diameter.max) / 2;
  const approachData = neo.close_approach_data[0];
  const lunarDistance = parseFloat(approachData.miss_distance.lunar);

  return (
    <div
      onClick={onClick}
      className={`
        p-3 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform
        ${isSelected ? 'scale-[1.02] ring-2 ring-indigo-500' : 'hover:scale-[1.01]'}
        ${neo.is_potentially_hazardous_asteroid ? 'bg-red-50 hover:bg-red-100' : 'bg-white hover:bg-gray-50'}
        ${neo.is_potentially_hazardous_asteroid ? 'border border-red-400' : 'border border-gray-200'}
        ${isSelected && neo.is_potentially_hazardous_asteroid ? 'ring-red-500' : ''}
      `}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-base font-semibold truncate pr-6">{neo.name.replace('(', '').replace(')', '')}</h3>
        {neo.is_potentially_hazardous_asteroid && (
          <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
        )}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-500">Size:</span>
          <span className="ml-1">{averageSize.toFixed(2)} km</span>
        </div>

        <div>
          <span className="text-gray-500">Distance:</span>
          <span className="ml-1">{lunarDistance.toFixed(1)} LD</span>
        </div>
      </div>

      <div className="mt-2 flex justify-end">
        <ArrowRight className={`h-4 w-4 transition-colors duration-300 ${isSelected ? 'text-indigo-600' : 'text-indigo-400'}`} />
      </div>
    </div>
  );
}