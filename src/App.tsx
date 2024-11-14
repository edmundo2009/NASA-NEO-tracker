import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NEOCard from './components/NEOCard';
import NEODetail from './components/NEODetail';
import type { NEO, NEOResponse } from './types/neo';

const NASA_API_KEY = 'DEMO_KEY';

function App() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [neos, setNeos] = useState<NEO[]>([]);
  const [selectedNeo, setSelectedNeo] = useState<NEO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [filters, setFilters] = useState({
    minSize: 0,
    maxSize: 10,
    showHazardous: false,
    maxDistance: 100,
  });

  useEffect(() => {
    const fetchNEOs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${NASA_API_KEY}`
        );
        const data: NEOResponse = await response.json();
        setNeos(data.near_earth_objects[date] || []);
      } catch (err) {
        setError('Failed to fetch NEO data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNEOs();
  }, [date]);

  const filteredNeos = neos.filter((neo) => {
    const avgSize = (
      neo.estimated_diameter.kilometers.estimated_diameter_min +
      neo.estimated_diameter.kilometers.estimated_diameter_max
    ) / 2;
    const lunarDistance = parseFloat(neo.close_approach_data[0].miss_distance.lunar);

    return (
      avgSize >= filters.minSize &&
      avgSize <= filters.maxSize &&
      lunarDistance <= filters.maxDistance &&
      (!filters.showHazardous || neo.is_potentially_hazardous_asteroid)
    );
  });

  const handleNeoClick = (neo: NEO) => {
    setSelectedNeo(neo);
    if (window.innerWidth < 640) { // sm breakpoint
      setShowMobileDetail(true);
      setIsMobileSidebarOpen(false);
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
    if (showMobileDetail) {
      setShowMobileDetail(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        onDateChange={setDate} 
        currentDate={date}
        onMenuClick={toggleMobileSidebar}
        isMobileMenuOpen={isMobileSidebarOpen}
      />
      
      <div className="flex relative">
        <Sidebar
          filters={filters}
          onFilterChange={setFilters}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        <main className={`flex-1 p-4 ${isMobileSidebarOpen ? 'sm:block hidden' : 'block'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2 space-y-4">
                <h2 className="text-xl font-semibold">Near Earth Objects</h2>
                
                {loading && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading NEO data...</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                    {error}
                  </div>
                )}

                {!loading && !error && filteredNeos.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No objects found matching your criteria
                  </div>
                )}

                <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-12rem)]">
                  {filteredNeos.map((neo) => (
                    <NEOCard
                      key={neo.id}
                      neo={neo}
                      isSelected={selectedNeo?.id === neo.id}
                      onClick={() => handleNeoClick(neo)}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop Detail View */}
              <div className="hidden sm:block w-full sm:w-1/2 sticky top-20">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-8rem)]">
                  <NEODetail neo={selectedNeo} onClose={() => {}} isMobile={false} />
                </div>
              </div>

              {/* Mobile Detail View */}
              {showMobileDetail && (
                <div className="fixed inset-0 z-50 sm:hidden bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <NEODetail 
                      neo={selectedNeo} 
                      onClose={() => setShowMobileDetail(false)}
                      isMobile={true}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;