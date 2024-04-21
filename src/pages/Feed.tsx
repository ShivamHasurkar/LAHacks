import React, { useState, useEffect} from 'react';

import { PlusIcon, UserIcon } from '@heroicons/react/solid'; // Ensure you have @heroicons/react installed
import postsData from './posts.json'; // Make sure this path is correct
import Divider from '../components/Divider';
import { useRouter } from 'next/dist/client/router';
//import fs from 'fs';


type User = {
  name: string;
  avatar: string;
};

type Post = {
  id: number;
  user: User;
  timestamp: string;
  message: string;
  serviceType: string;
  availability: string;
  role: string;
};

const serviceTypes = [
  'Food Delivery',
  'Transportation',
  'House Maintenance',
  'Cleaning Services',
  'Personal Assistance',
  'Tech Support',
  'Companionship/Social Visits',
  'Medical Assistance',
  'Errand Running',
  'Exercise & Wellness Activities'
];

const availabilities = [
  'Weekdays',
  'Weekends',
  'Mornings',
  'Afternoons',
  'Evenings',
  'Full-Time',
  'Part-Time'
];

const role =[
  'Volenteer',
  'Elder'
]
//const location = useLocation();
   

  const Feed = () => {
    // useEffect(() => {
    //   // Function to get the URL query parameters
    //   const getFiltersFromURL = () => {
    //     const queryParams = new URLSearchParams(location.search);
    //     const serviceFilter = queryParams.get('serviceType');
    //     const availabilityFilter = queryParams.get('availability');
  
    //     // Set filters based on URL query parameters
    //     if (serviceFilter) {
    //       setActiveServiceType(serviceFilter);
    //     }
  
    //     if (availabilityFilter) {
    //       setActiveAvailability(availabilityFilter);
    //     }
    //   };
  
    //   // Load posts and apply filters on component mount
    //   setPosts(postsData);
    //   getFiltersFromURL();
    // }, [location]);
    


  
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>(postsData);
  //const [posts, setPosts] = useState<Post[]>(post_def);
  const [newMessage, setNewMessage] = useState<string>('');
  const [activeServiceType, setActiveServiceType] = useState("all");
  const [activeAvailability, setActiveAvailability] = useState('all');
  const [newServiceType, setNewServiceType] = useState('all');
  const [newAvailability, setNewAvailability] = useState('all');

  useEffect(() => {
    setActiveServiceType(router.query.serviceType ? router.query.serviceType as string : "all")
  }, [router.query])

  const [userName, setUserName] = useState<string>(''); // To capture the user's name from input
  const [userAvatar] = useState<string>('default_avatar_url'); // Default or captured from input


  const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleServiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveServiceType(e.target.value);
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveAvailability(e.target.value);
  };

  const handleNewServiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewServiceType(e.target.value);
  };

  const handleNewAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewAvailability(e.target.value);
  };

  


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser: User = {
      name: userName,
      avatar: userAvatar,
    };

    const newPost: Post = {
      id: posts.length + 1, // This is a simple approach; for real apps consider using a unique ID generator or backend-provided ID
      user: {
        name: currentUser.name, // Replace with the actual current user's name
        avatar: currentUser.avatar, // Replace with the actual current user's avatar path
      },
      timestamp: new Date().toLocaleString(), // Generates current date and time as a string
      message: newMessage,
      serviceType: activeServiceType,
      availability: activeAvailability,
      role:"Volunteer"
    };
    setPosts((posts) => [...posts, newPost]);
    setNewMessage(''); // Clear the input after submission
    // let file = JSON.stringify(posts);

    // fs.writeFile('./posts.json', file, (err) => {
    // if (err) {
    //     console.log('Error writing file:', err);
    // } else {
    //     console.log('Successfully wrote file');
    // }
//});
  };

  const [showPopup, setShowPopup] = useState(false);

  
  const performAction = () => {
    
    setTimeout(() => setShowPopup(true), 4000);
        // Maybe hide the popup after some time automatically
        setTimeout(() => setShowPopup(false), 7000);
      
    } 




  const FilterButtons = () => <div className="flex flex-wrap justify-center gap-4 mb-4">
      <select
        className="py-1 px-3 rounded-full border text-blue-500"
        value={activeServiceType}
        onChange={handleServiceTypeChange}
      >
        <option value="all">All Services</option>
        {serviceTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        className="py-1 px-3 rounded-full border text-blue-500"
        value={activeAvailability}
        onChange={handleAvailabilityChange}
      >
        <option value="all">Anytime</option>
        {availabilities.map((availability) => (
          <option key={availability} value={availability}>
            {availability}
          </option>
        ))}
      </select>
    </div>

  const filteredPosts = posts.filter((post) =>
  (activeServiceType === 'all' || post.serviceType === activeServiceType) &&
  (activeAvailability === 'all' || post.availability === activeAvailability)
);



  return (
    <div className=" bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Student Feed Header */}

        <div className="bg-white shadow p-4 rounded-lg mb-6">
  <div className="bg-white rounded-lg my-4  px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
      Community Feed
    </h1>
    <Divider/>


</div>
          <img
                
                src="../assets/images/people.png"
              />
        </div>
        
       { <FilterButtons/>}

        {/* Feed */}
        <div className="space-y-4">
  {filteredPosts.map((post) => (
    <div key={post.id} onClick={ performAction} className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex space-x-3">
          <UserIcon className="h-10 w-10 text-gray-400" />
          <div>
            <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
            <time className="text-sm text-gray-500">{post.timestamp}</time>
          </div>
        </div>
      </div>
      <p className="mt-1 text-gray-700">{post.message}</p>
      <div className="flex justify-end items-center mt-4">
        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-medium mr-2">
          {post.serviceType}
        </span>
        
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
          {post.availability}
          
        </span>
        <span className="bg-green-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
          {post.role}
        </span>
      </div>
    </div>
  ))}
  {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg">The volenteer has been notified via calendar!    </h4>
                        <button onClick={() => setShowPopup(false)} className="text-lg font-semibold">  &times;</button>
                    </div>
                </div>
            </div>
        )}
</div>
        
        {/* Message Input Form */}
        <form 
          onSubmit={handleSubmit}
          className="fixed bottom-0 left-0 right-0 bg-white py-4 px-6 flex justify-between items-center shadow-lg"
        >
          <div className="flex-grow mr-4">
            <input 
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              className="border border-gray-300 rounded-lg p-2 w-full focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex-grow mr-4">
            <input 
              type="text" 
              value={newMessage}
              onChange={handleNewMessageChange}
              placeholder="Type a message..."
              className="border border-gray-300 rounded-lg p-2 w-full focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            {/* Service Type and Availability Select */}
            <select 
            value={newServiceType}
            onChange={handleNewServiceTypeChange}
            className="border-gray-300 rounded-lg p-2 mr-2 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">Service</option>
             {serviceTypes.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
          </select>
          <select 
            value={newAvailability}
            onChange={handleNewAvailabilityChange}
            className="border-gray-300 rounded-lg p-2 mr-2 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">Availability</option>
           {availabilities.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
          </select>
            <button type="submit" className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Feed;
