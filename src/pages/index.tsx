import React from 'react';
import About from '../components/About';
import Canvas from '../components/Canvas';
import Chatbot from '../components/Chatbot';
import LazyLoad from '../components/LazyLoad';
import Section from '../components/Section';

import Serve from '../components/Serve'



const App = () => {
  return (

    <div>
    <div style={{ backgroundImage: "url('/assets/images/IMG_5650.png')",  zIndex:100}}>
      <header className="flex justify-between items-center p-6 bg-sky-500 text-white">
        
        <img src="../assets/images/logo.jpeg" style={{ width: '150px', height: '150px' }} alt="logo"/>
      </header>
    <div className=" ">
      <div className="relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
    
        <Section />
      </div>
      </div>
    </div>

      <Chatbot />

      <div className="quote-section">
        <p className="quote-text">Together for Tomorrow: Connecting Seniors with Local Hands Ready to Help!</p>
      </div>

      <Serve />

      <LazyLoad>
        <>
          <Canvas />
          <About />
        </>
      </LazyLoad>
    </div>
  );
};

export default App;
