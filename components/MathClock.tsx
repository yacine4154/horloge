
import React, { useState, useEffect } from 'react';

const expressions = [
  { value: 1, jsx: <span>e<sup>πi</sup> cos π</span> },
  { value: 2, jsx: <span>log<sub>10</sub>(100)</span> },
  { value: 3, jsx: <span className="flex items-center text-sm sm:text-base">∫<span className="flex flex-col -ml-1 text-[0.6rem] leading-tight"><span className="translate-y-0.5">2</span><span className="-translate-y-0.5">1</span></span><span className="ml-1">2xdx</span></span> },
  { value: 4, jsx: <span>(2sin(π/2))<sup>2</sup></span> },
  { value: 5, jsx: <span><sup>3</sup>√125</span> },
  { value: 6, jsx: <span>3!</span> },
  { value: 7, jsx: <span>0111<sub>2</sub></span> },
  { value: 8, jsx: <span className="flex items-center text-sm sm:text-base">Π<span className="flex flex-col -ml-1 text-[0.6rem] leading-tight"><span className="translate-y-0.5">1</span><span className="-translate-y-0.5">k=0</span></span><span className="ml-1">(2k+2)</span></span> },
  { value: 9, jsx: <span>√81</span> },
  { value: 10, jsx: <span>log<sub>2</sub>(1024)</span> },
  { value: 11, jsx: <span>B<sub>16</sub></span> },
  { value: 12, jsx: <span className="flex items-center text-sm sm:text-base">∑<span className="flex flex-col -ml-2 text-[0.6rem] leading-tight"><span className="translate-y-0.5">3</span><span className="-translate-y-0.5">i=1</span></span><span className="ml-1">(3i-2)</span></span> },
];

const MathClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      clearInterval(timerId);
      document.head.removeChild(styleSheet);
    };
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).replace(',', '').toUpperCase();

  return (
    <div className="relative w-[90vw] h-[90vw] sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] bg-white rounded-full border-8 border-black shadow-2xl">
      {/* Central Animated Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full overflow-hidden z-20">
         <div
            className="w-full h-full"
            style={{
                background: 'conic-gradient(from 0deg, #f3f4f6, #e5e7eb, #d1d5db, #e5e7eb, #f3f4f6)',
                animation: 'spin 10s linear infinite',
            }}
         />
      </div>

      {/* Clock Numbers */}
      {expressions.map(({ value, jsx }) => {
        const angle = (value * 30) - 90;
        const angleRad = (angle * Math.PI) / 180;
        const radius = 0.4; // 40% of the half-width
        
        const x = `calc(50% + ${Math.cos(angleRad) * 100 * radius}%)`;
        const y = `calc(50% + ${Math.sin(angleRad) * 100 * radius}%)`;

        return (
          <div
            key={value}
            className="absolute z-10 text-gray-900 font-serif text-base sm:text-xl md:text-2xl"
            style={{ 
                top: y, 
                left: x,
                transform: 'translate(-50%, -50%)',
             }}
          >
            {jsx}
          </div>
        );
      })}

      {/* Date Display */}
      <div 
        className="absolute bottom-[25%] left-1/2 -translate-x-1/2 z-10 bg-gray-100 text-gray-800 text-[0.6rem] sm:text-xs font-mono tracking-wider px-2 py-1 rounded shadow-sm border border-gray-300"
        aria-label={`Current date: ${formattedDate}`}
      >
        {formattedDate}
      </div>

      {/* Hands */}
      <div className="absolute top-0 left-0 w-full h-full z-30">
        {/* Hour Hand */}
        <div 
            className="absolute bottom-1/2 left-1/2 w-1.5 md:w-2 bg-black rounded-full" 
            style={{
                height: '25%',
                transformOrigin: 'bottom',
                transform: `translateX(-50%) rotate(${hourDeg}deg)`,
            }}
        />
        {/* Minute Hand */}
        <div 
            className="absolute bottom-1/2 left-1/2 w-1 md:w-1.5 bg-black rounded-full" 
            style={{
                height: '35%',
                transformOrigin: 'bottom',
                transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
            }}
        />
        {/* Second Hand */}
        <div 
            className="absolute bottom-1/2 left-1/2 w-0.5 md:w-1 bg-black rounded-full" 
            style={{
                height: '40%',
                transformOrigin: 'bottom',
                transform: `translateX(-50%) rotate(${secondDeg}deg)`,
            }}
        />
        {/* Center Pivot */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 md:w-4 md:h-4 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-white"/>
      </div>
    </div>
  );
};

export default MathClock;
