import React, { useEffect, useState } from 'react';

interface CircularLoaderProps {
  size?: number;
  strokeWidth?: number;
  duration?: number;
  className?: string;
}

export const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = 64,
  strokeWidth = 4,
  duration = 2000,
  className = '',
}) => {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        // Restart animation
        setTimeout(() => setProgress(0), 200);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [duration]);

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-blue-600 dark:text-blue-400 transition-all duration-150 ease-out"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
