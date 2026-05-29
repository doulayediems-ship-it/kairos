import React, { useState, useEffect } from 'react';
import { FiClock, FiGlobe } from 'react-icons/fi';

function DigitalClock() {
  const [times, setTimes] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  const timezones = [
    { name: 'New York', zone: 'America/New_York', flag: '🗽' },
    { name: 'London', zone: 'Europe/London', flag: '🇬🇧' },
    { name: 'Paris', zone: 'Europe/Paris', flag: '🇫🇷' },
    { name: 'Tokyo', zone: 'Asia/Tokyo', flag: '🇯🇵' },
    { name: 'Sydney', zone: 'Australia/Sydney', flag: '🇦🇺' },
    { name: 'Dubai', zone: 'Asia/Dubai', flag: '🇦🇪' },
    { name: 'Hong Kong', zone: 'Asia/Hong_Kong', flag: '🇭🇰' },
    { name: 'Singapore', zone: 'Asia/Singapore', flag: '🇸🇬' },
    { name: 'São Paulo', zone: 'America/Sao_Paulo', flag: '🇧🇷' },
    { name: 'Mumbai', zone: 'Asia/Kolkata', flag: '🇮🇳' },
    { name: 'Los Angeles', zone: 'America/Los_Angeles', flag: '🌴' },
    { name: 'Toronto', zone: 'America/Toronto', flag: '🇨🇦' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const newTimes = {};
      timezones.forEach((tz) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: tz.zone,
        });
        newTimes[tz.zone] = formatter.format(now);
      });

      setTimes(newTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeOfDay = (timeString) => {
    const hour = parseInt(timeString.split(':')[0]);
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  const getBackgroundColor = (timeString) => {
    const timeOfDay = getTimeOfDay(timeString);
    switch (timeOfDay) {
      case 'morning':
        return 'from-orange-100 to-yellow-100';
      case 'afternoon':
        return 'from-blue-100 to-cyan-100';
      case 'evening':
        return 'from-purple-100 to-pink-100';
      case 'night':
        return 'from-slate-800 to-slate-900';
      default:
        return 'from-blue-100 to-blue-200';
    }
  };

  const getTextColor = (timeString) => {
    const timeOfDay = getTimeOfDay(timeString);
    return timeOfDay === 'night' ? 'text-white' : 'text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <FiClock size={40} className="text-cyan-400 animate-spin" />
          <h1 className="text-5xl font-bold text-white">Global Clock</h1>
        </div>
        <p className="text-gray-400 text-lg">Current time across the world</p>
      </div>

      {/* Current Local Time */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-8 text-center shadow-2xl">
          <h2 className="text-gray-100 text-sm font-semibold mb-2 uppercase tracking-wider">Your Local Time</h2>
          <div className="text-6xl font-mono font-bold text-white mb-2">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            })}
          </div>
          <div className="text-cyan-100 text-lg">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>

      {/* Timezone Clocks Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timezones.map((tz) => {
            const timeString = times[tz.zone] || '--:--:--';
            return (
              <div
                key={tz.zone}
                className={`bg-gradient-to-br ${getBackgroundColor(
                  timeString
                )} rounded-lg p-6 shadow-lg border-2 border-opacity-20 ${
                  getTimeOfDay(timeString) === 'night'
                    ? 'border-white'
                    : 'border-gray-400'
                } transform hover:scale-105 transition-transform duration-300`}
              >
                {/* Flag and City Name */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-4xl">{tz.flag}</span>
                  <div>
                    <h3 className={`text-xl font-bold ${getTextColor(timeString)}`}>
                      {tz.name}
                    </h3>
                    <p className={`text-sm ${getTextColor(timeString)} opacity-70`}>
                      {tz.zone}
                    </p>
                  </div>
                </div>

                {/* Digital Time Display */}
                <div
                  className={`bg-black bg-opacity-20 rounded p-4 mb-3 font-mono text-center backdrop-blur-sm`}
                >
                  <div className={`text-4xl font-bold ${getTextColor(timeString)}`}>
                    {timeString}
                  </div>
                </div>

                {/* Time of Day Badge */}
                <div className="flex justify-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      {
                        morning: 'bg-orange-500',
                        afternoon: 'bg-blue-500',
                        evening: 'bg-purple-500',
                        night: 'bg-indigo-900',
                      }[getTimeOfDay(timeString)]
                    }`}
                  >
                    {getTimeOfDay(timeString).toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 text-center">
        <div className="flex items-center justify-center space-x-2 text-gray-400">
          <FiGlobe size={20} />
          <p>Times are updated every second in real-time</p>
        </div>
      </div>
    </div>
  );
}

export default DigitalClock;
