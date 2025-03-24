import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Onboarding() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    fitnessGoals: '',
    distanceUnit: 'km',
    paceUnit: 'min/km',
  });

  const { bio, location, fitnessGoals, distanceUnit, paceUnit } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would update the profile in the Redux store
      // and make an API call to save the data
      console.log('Profile data:', formData);
      
      // Navigate to dashboard after completing onboarding
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tell us more about yourself to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <div className="mt-1">
                <textarea
                  id="bio"
                  name="bio"
                  rows="3"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Tell us about yourself"
                  value={bio}
                  onChange={onChange}
                ></textarea>
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1">
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="City, Country"
                  value={location}
                  onChange={onChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="fitnessGoals" className="block text-sm font-medium text-gray-700">
                Fitness Goals
              </label>
              <div className="mt-1">
                <textarea
                  id="fitnessGoals"
                  name="fitnessGoals"
                  rows="2"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="What are your running goals?"
                  value={fitnessGoals}
                  onChange={onChange}
                ></textarea>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Preferences</label>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="distanceUnit" className="block text-xs font-medium text-gray-500">
                    Distance Unit
                  </label>
                  <select
                    id="distanceUnit"
                    name="distanceUnit"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={distanceUnit}
                    onChange={onChange}
                  >
                    <option value="km">Kilometers (km)</option>
                    <option value="mi">Miles (mi)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="paceUnit" className="block text-xs font-medium text-gray-500">
                    Pace Unit
                  </label>
                  <select
                    id="paceUnit"
                    name="paceUnit"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={paceUnit}
                    onChange={onChange}
                  >
                    <option value="min/km">min/km</option>
                    <option value="min/mi">min/mi</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save & Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Onboarding; 