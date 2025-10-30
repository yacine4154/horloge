
import React from 'react';
import MathClock from './components/MathClock.tsx';

const App: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 font-sans">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">Math Clock Animator</h1>
      <p className="text-gray-600 mb-8 text-center">A functional clock inspired by the math clock meme.</p>
      <MathClock />
    </main>
  );
};

export default App;
