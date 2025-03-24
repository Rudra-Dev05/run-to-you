import { useState } from 'react';

function RunMap({ run }) {
  const [mapMode, setMapMode] = useState('standard'); // standard, satellite, terrain
  const [showElevation, setShowElevation] = useState(false);
  
  // Mock data for elevation profile
  const elevationPoints = run?.elevationData || [
    { distance: 0, elevation: 50 },
    { distance: 1, elevation: 65 },
    { distance: 2, elevation: 80 },
    { distance: 3, elevation: 72 },
    { distance: 4, elevation: 90 },
    { distance: 5, elevation: 85 },
  ];
  
  // Find min and max elevation for scaling
  const minElevation = Math.min(...elevationPoints.map(p => p.elevation));
  const maxElevation = Math.max(...elevationPoints.map(p => p.elevation));
  const elevationRange = maxElevation - minElevation;
  
  // Calculate path points for the elevation chart
  const chartWidth = 100; // percentage width
  const chartHeight = 80; // pixels
  
  const getElevationPath = () => {
    return elevationPoints.map((point, index) => {
      const x = (point.distance / run?.distance) * chartWidth;
      const normalizedElevation = elevationRange === 0 ? 0 : (point.elevation - minElevation) / elevationRange;
      const y = chartHeight - (normalizedElevation * chartHeight);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="relative">
        {/* Map Image - In a real app, this would be replaced with an actual map library */}
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          {/* Placeholder for the map - would be replaced with actual map implementation */}
          {run?.mapImageUrl ? (
            <img 
              src={run.mapImageUrl} 
              alt="Run route" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
                <p>Map data not available</p>
              </div>
            </div>
          )}
          
          {/* Route Overlay - Just a placeholder to show how it might look */}
          {run?.routePoints && run.routePoints.length > 0 && (
            <svg 
              className="absolute top-0 left-0 w-full h-full" 
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path 
                d="M10,50 Q30,20 50,50 T90,50"
                stroke="#ef4444"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          )}
          
          {/* Map Controls */}
          <div className="absolute top-3 right-3 bg-white rounded-lg shadow-md p-1">
            <div className="flex flex-col space-y-1">
              <button 
                className={`p-2 rounded-md text-xs font-medium ${mapMode === 'standard' ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setMapMode('standard')}
              >
                Map
              </button>
              <button 
                className={`p-2 rounded-md text-xs font-medium ${mapMode === 'satellite' ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setMapMode('satellite')}
              >
                Satellite
              </button>
              <button 
                className={`p-2 rounded-md text-xs font-medium ${mapMode === 'terrain' ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setMapMode('terrain')}
              >
                Terrain
              </button>
            </div>
          </div>
          
          {/* Start & End Markers */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </div>
          
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
        
        {/* Elevation Toggle Button */}
        <button 
          className="absolute bottom-3 left-3 flex items-center space-x-1 bg-white rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 shadow-md hover:bg-gray-50"
          onClick={() => setShowElevation(!showElevation)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
          <span>Elevation</span>
          <span className={`transition-transform duration-200 ${showElevation ? 'rotate-180' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </button>
      </div>
      
      {/* Elevation Chart */}
      {showElevation && (
        <div className="px-4 pt-3 pb-4">
          <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Elevation Profile</h4>
          <div className="w-full" style={{ height: '80px' }}>
            <svg viewBox="0 0 100 80" width="100%" height="80" preserveAspectRatio="none">
              {/* Gradient for the area under the line */}
              <defs>
                <linearGradient id="elevationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(239, 68, 68, 0.2)" />
                  <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
                </linearGradient>
              </defs>
              
              {/* Background Grid Lines */}
              <line x1="0" y1="20" x2="100" y2="20" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="40" x2="100" y2="40" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="60" x2="100" y2="60" stroke="#f3f4f6" strokeWidth="1" />
              
              {/* Area under the elevation line */}
              <path 
                d={`${getElevationPath()} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`}
                fill="url(#elevationGradient)"
              />
              
              {/* Elevation line */}
              <path 
                d={getElevationPath()}
                stroke="#ef4444"
                strokeWidth="2"
                fill="none"
              />
              
              {/* Elevation points */}
              {elevationPoints.map((point, i) => {
                const x = (point.distance / run?.distance) * chartWidth;
                const normalizedElevation = elevationRange === 0 ? 0 : (point.elevation - minElevation) / elevationRange;
                const y = chartHeight - (normalizedElevation * chartHeight);
                
                return (
                  <circle 
                    key={i}
                    cx={x} 
                    cy={y} 
                    r="2"
                    fill="#ef4444" 
                  />
                );
              })}
            </svg>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>0 km</span>
            <span>{run?.distance} km</span>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <div>
              <span className="text-gray-500">Min: </span>
              <span className="font-medium">{minElevation}m</span>
            </div>
            <div>
              <span className="text-gray-500">Max: </span>
              <span className="font-medium">{maxElevation}m</span>
            </div>
            <div>
              <span className="text-gray-500">Gain: </span>
              <span className="font-medium">{run?.elevationGain || '120'}m</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Run Stats */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
        <div className="p-3 text-center">
          <p className="text-xs text-gray-500">Distance</p>
          <p className="text-lg font-bold text-gray-900">{run?.distance || '0'} km</p>
        </div>
        <div className="p-3 text-center">
          <p className="text-xs text-gray-500">Duration</p>
          <p className="text-lg font-bold text-gray-900">{run?.duration || '00:00'}</p>
        </div>
        <div className="p-3 text-center">
          <p className="text-xs text-gray-500">Pace</p>
          <p className="text-lg font-bold text-gray-900">{run?.pace || '0:00'}/km</p>
        </div>
      </div>
    </div>
  );
}

export default RunMap; 