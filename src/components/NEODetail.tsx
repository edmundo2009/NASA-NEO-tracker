import React from 'react';
import { AlertTriangle, Calendar, Target, Ruler, Rocket, X } from 'lucide-react';
import type { NEO } from '../types/neo';

interface NEODetailProps {
  neo: NEO | null;
  onClose: () => void;
  isMobile: boolean;
}

export default function NEODetail({ neo, onClose, isMobile }: NEODetailProps) {
  if (!neo) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Select an object to view details</p>
      </div>
    );
  }

  const approachData = neo.close_approach_data[0];
  const diameter = {
    min: neo.estimated_diameter.kilometers.estimated_diameter_min,
    max: neo.estimated_diameter.kilometers.estimated_diameter_max,
  };

  return (
    <div className="relative">
      {isMobile && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="h-6 w-6" />
        </button>
      )}

      <div className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold">{neo.name.replace('(', '').replace(')', '')}</h2>
          {neo.is_potentially_hazardous_asteroid && (
            <div className="flex items-center text-red-500">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <span className="text-sm font-semibold">Potentially Hazardous</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
              <div>
                <h3 className="font-semibold">Approach Date</h3>
                <p>{approachData.close_approach_date}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Ruler className="h-5 w-5 mr-2 text-indigo-500" />
              <div>
                <h3 className="font-semibold">Estimated Diameter</h3>
                <p>{diameter.min.toFixed(2)} - {diameter.max.toFixed(2)} km</p>
              </div>
            </div>

            <div className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-indigo-500" />
              <div>
                <h3 className="font-semibold">Miss Distance</h3>
                <p>{parseFloat(approachData.miss_distance.lunar).toFixed(1)} lunar distances</p>
                <p className="text-sm text-gray-500">
                  ({parseInt(approachData.miss_distance.kilometers).toLocaleString()} km)
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Rocket className="h-5 w-5 mr-2 text-indigo-500" />
              <div>
                <h3 className="font-semibold">Relative Velocity</h3>
                <p>{parseInt(approachData.relative_velocity.kilometers_per_hour).toLocaleString()} km/h</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Size Comparison</h3>
              <div className="relative h-40 bg-white rounded-lg overflow-hidden">
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-indigo-500 rounded-full"
                  style={{
                    width: `${Math.min(100, diameter.max * 20)}%`,
                    height: `${Math.min(100, diameter.max * 20)}%`,
                  }}
                />
                <div className="absolute bottom-2 left-2 text-xs text-gray-500">
                  Size relative to viewport (scaled)
                </div>
              </div>
            </div>

            <a
              href={neo.nasa_jpl_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View NASA JPL Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}