import { useState, useEffect } from 'react';

function StatsDashboard({ stats, period = 'week' }) {
  const [activeTab, setActiveTab] = useState(period);
  const [chartData, setChartData] = useState([]);
  const [isAnimated, setIsAnimated] = useState(false);
  
  // Mock data for different time periods
  const mockData = {
    week: {
      distances: [5.2, 0, 7.4, 3.1, 0, 10.2, 4.5],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      totalDistance: 30.4,
      totalRuns: 5,
      avgPace: '5:23',
      avgDistance: 6.1,
      maxDistance: 10.2,
      totalTime: '2:45:12',
      elevationGain: 320,
    },
    month: {
      distances: [25.5, 32.1, 18.7, 40.2],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      totalDistance: 116.5,
      totalRuns: 18,
      avgPace: '5:31',
      avgDistance: 6.5,
      maxDistance: 12.3,
      totalTime: '10:42:35',
      elevationGain: 1250,
    },
    year: {
      distances: [95.2, 112.3, 124.8, 98.7, 143.2, 158.7, 130.5, 140.2, 120.3, 125.5, 110.2, 105.8],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      totalDistance: 1465.4,
      totalRuns: 215,
      avgPace: '5:40',
      avgDistance: 6.8,
      maxDistance: 21.1,
      totalTime: '138:15:44',
      elevationGain: 15430,
    }
  };
  
  // Calculate max value for chart scaling
  const getMaxValue = (data) => {
    return Math.max(...data) * 1.2; // Add 20% padding
  };
  
  // Update chart data when the active tab changes
  useEffect(() => {
    setIsAnimated(false);
    const data = stats?.[activeTab] || mockData[activeTab];
    setChartData(data);
    
    // Trigger animation after a short delay
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [activeTab, stats]);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-100">
        <div className="flex">
          <button
            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'week' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('week')}
          >
            This Week
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'month' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('month')}
          >
            This Month
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'year' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('year')}
          >
            This Year
          </button>
        </div>
      </div>
      
      {/* Distance Chart */}
      <div className="p-4 pt-5">
        <div className="flex justify-between items-baseline mb-4">
          <h3 className="text-base font-semibold text-gray-900">Distance Overview</h3>
          <div className="flex items-center space-x-1 text-xs">
            <span className="h-3 w-3 rounded-full bg-primary-500 inline-block"></span>
            <span className="text-gray-500">Distance (km)</span>
          </div>
        </div>
        
        <div className="h-40 relative">
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gray-100"></div>
          <div className="absolute inset-y-0 left-0 w-[1px] bg-gray-100"></div>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pointer-events-none">
            <span>{getMaxValue(chartData.distances || [0]).toFixed(0)}</span>
            <span>{(getMaxValue(chartData.distances || [0]) / 2).toFixed(0)}</span>
            <span className="mb-1">0</span>
          </div>
          
          {/* Chart Bars */}
          <div className="absolute inset-0 pl-6 flex items-end justify-between">
            {(chartData.distances || []).map((value, index) => {
              const maxValue = getMaxValue(chartData.distances || [0]);
              const height = maxValue === 0 ? 0 : (value / maxValue) * 100;
              
              return (
                <div key={index} className="flex flex-col items-center justify-end h-full" style={{ width: `${100 / (chartData.distances?.length || 1)}%` }}>
                  <div 
                    className="w-5/6 bg-primary-500 rounded-t-md relative group"
                    style={{ 
                      height: isAnimated ? `${height}%` : '0%',
                      transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 p-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {value.toFixed(1)} km
                    </div>
                  </div>
                  <span className="mt-1 text-xs text-gray-500">{chartData.labels?.[index] || ''}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-gray-100 divide-x divide-gray-100">
        <div className="p-4 text-center">
          <span className="block text-xs text-gray-500 uppercase tracking-wider">Total Distance</span>
          <span className="block text-lg font-bold text-gray-900 mt-1">{chartData.totalDistance?.toFixed(1) || 0} km</span>
        </div>
        <div className="p-4 text-center">
          <span className="block text-xs text-gray-500 uppercase tracking-wider">Total Runs</span>
          <span className="block text-lg font-bold text-gray-900 mt-1">{chartData.totalRuns || 0}</span>
        </div>
        <div className="p-4 text-center">
          <span className="block text-xs text-gray-500 uppercase tracking-wider">Avg Pace</span>
          <span className="block text-lg font-bold text-gray-900 mt-1">{chartData.avgPace || '0:00'}/km</span>
        </div>
        <div className="p-4 text-center">
          <span className="block text-xs text-gray-500 uppercase tracking-wider">Elevation Gain</span>
          <span className="block text-lg font-bold text-gray-900 mt-1">{chartData.elevationGain || 0}m</span>
        </div>
      </div>
      
      {/* Additional Stats */}
      <div className="px-4 py-5 border-t border-gray-100">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Additional Stats</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Total Time</span>
              <span className="block text-sm font-semibold text-gray-900">{chartData.totalTime || '0:00:00'}</span>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Avg Distance</span>
              <span className="block text-sm font-semibold text-gray-900">{chartData.avgDistance?.toFixed(1) || 0} km</span>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Longest Run</span>
              <span className="block text-sm font-semibold text-gray-900">{chartData.maxDistance?.toFixed(1) || 0} km</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary Note */}
      <div className="px-4 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary-500">
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h5 className="text-sm font-medium text-gray-900">Summary</h5>
            {activeTab === 'week' && (
              <p className="text-sm text-gray-600 mt-1">
                {chartData.totalRuns > 0 
                  ? `You've covered ${chartData.totalDistance?.toFixed(1)} km this week across ${chartData.totalRuns} runs. Your longest run was ${chartData.maxDistance} km.` 
                  : "You haven't logged any runs this week. Time to lace up those shoes!"}
              </p>
            )}
            {activeTab === 'month' && (
              <p className="text-sm text-gray-600 mt-1">
                {chartData.totalRuns > 0 
                  ? `This month you've completed ${chartData.totalRuns} runs covering ${chartData.totalDistance?.toFixed(1)} km. Your average pace is ${chartData.avgPace}/km.` 
                  : "No runs recorded for this month yet. Set a goal to get started!"}
              </p>
            )}
            {activeTab === 'year' && (
              <p className="text-sm text-gray-600 mt-1">
                {chartData.totalRuns > 0 
                  ? `You've run ${chartData.totalDistance?.toFixed(1)} km this year across ${chartData.totalRuns} runs, with ${chartData.elevationGain}m of elevation gain.` 
                  : "You haven't recorded any runs this year. There's still time to reach your goals!"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsDashboard; 