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
    <div style={{ backgroundImage: "url('../assets/images/IMG_5650.png')",  width: '100vw' }}>
      <header className="flex justify-between items-center p-6 bg-sky-500 text-white">
        
        <img src="../assets/images/logo.png" style={{ width: '150px', height: '150px', zIndex:10 }} alt="logo"/>
      </header>
    <div className=" ">
      <div className="relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
    
        <Section />
      </div>
      </div>
    </div>

      <Chatbot />
      <div className="flex flex-col items-center justify-center bg-background">
      <div className="mt-20 py-12 px-16 sm:px-7 lg:px-10">
        <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-3xl">
          <span className="block">Together for Tomorrow: Connecting Seniors with Local Hands Ready to Help!</span>
          
        </h1>
        </div>
        </div>
      {/* <div className="quote-section">
        <p className="quote-text">Together for Tomorrow: Connecting Seniors with Local Hands Ready to Help!</p>
      </div> */}

      <Serve />

      <LazyLoad>
        <>
          
          
          <About />
          <Canvas />
          
        </>
      </LazyLoad>
    </div>
  );
};

export default App;
