import React from 'react';
import config from '../config/index.json';

const Section= () => {
  const { section } = config;

  return (
    <div className="flex flex-col items-center justify-center bg-background min-h-screen">
      <div className="py-10 mx-auto  px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">{section.title}</span>
          <span className="block text-primary">{section.subtitle}</span>
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
          {section.description}
        </p>
        
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center gap-4"> {/* Added flex and gap for spacing */}
  <a
    href={section.action1.href}
    className="flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-secondary md:py-4 md:text-lg md:px-10"
  >
    {section.action1.text}
  </a>
  <a
    href={section.action2.href}
    className="flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-secondary md:py-4 md:text-lg md:px-10"
  >
    {section.action2.text}
  </a>
</div>
      </div>
      {/* Assuming SectionImage is another component that returns an <img> */}
      <SectionImage />
    </div>
  );
};

const SectionImage = () => {
  // Replace with the actual image path
  return (

    <div className="min-w-full object-contain sm:h-72 md:h-96 lg:h-90">
      <img
        className="relative w-screen"
        src="../assets/images/IMG_5654.png"
        alt="happy team image"
      />
    </div>

  );
};

export default Section;
