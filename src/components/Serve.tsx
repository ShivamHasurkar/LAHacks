import React from 'react';
import config from '../config/index.json';


const Serve= () => {
  const { services } = config; // You should define this 'services' structure in your config.json
  const { title, items: serviceList } = services;


  return (
    <div className="py-12 bg-white" id="services"> {/* bg-white is a Tailwind class for white background */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
          {title} {/* Tailwind classes for styling the title */}
        </h2>
        <div className="mt-10 flex justify-center gap-8"> {/* Flex and gap classes for layout */}
          {serviceList.map((service) => (
            <div key={service.name} className="flex flex-col items-center p-4 text-center"> {/* Flex column layout */}
              <img
                className="mb-4 h-20 w-20"
                src={service.icon}
                alt={service.name}
              />
               <button className="mt-2 text-lg leading-6 font-medium text-gray-900 bg-transparent border border-gray-300 rounded-full px-6 py-2 text-center cursor-pointer hover:bg-gray-100">
               <a href={`/Feed?serviceType=${service.filter}`}>
                {service.name}
              </a>
             
                
              
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Serve;
