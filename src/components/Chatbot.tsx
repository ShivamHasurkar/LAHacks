import React, { ChangeEvent, useState } from 'react';
import { model } from '../gemini/gemini';
import { ChatSession, Content } from '@google/generative-ai';
import { responseToJson } from '../gemini/response-utils';
import posts from '../pages/posts.json';


type Action = {
  actionText: string;
  actionDescription: string;
  actionTag : string;
};

type ActionMessage = {
  content: Content;
  actions: Action[];
};

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
};

function App() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ActionMessage[]>([]);
  const [chat, setChat] = useState<ChatSession | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState<Post[]>(posts);

  const toggleChatbot = async () => {
    setIsOpen(!isOpen);
  
    if (!isOpen && !chat) { // If opening the chat window and no chat session exists
      await startChat();
    }
  };

  // Only start a new chat when chat session is not already initialized
  const startChat = async () => {
    if (!chat) {
      const newChat = model.startChat();
      setChat(newChat);
    }
  };
  const userMessageStyle = "bg-blue-600 text-white p-3 rounded-lg max-w-xs ml-auto";
const botMessageStyle = "bg-gray-300 p-3 rounded-lg max-w-xs mr-auto";



  const handlePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const sendMessage = async (message: string) => {
    if (chat && message.trim()) {
      const result = await chat.sendMessage(message);
      const response = responseToJson(result.response.text().trim());

      setMessages((prevMessages) => [
        ...prevMessages,
        { content: { role: 'user', parts: [{ text: message }] }, actions: [] },
        { content: { role: 'model', parts: [{ text: response.text }] }, actions: response.actions },
      ]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await sendMessage(prompt);
    setPrompt('');
  };

  const [showPopup, setShowPopup] = useState(false);

  
  const performAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const actionId = e.currentTarget.id
    if (actionId === "post") {
      // Perform the posting action
      console.log('Hey')
      const newPost: Post = {
        id: posts.length + 1,
        user: {
          name: "My Granny",
          avatar: "default_avatar_url",
        },
        timestamp: new Date().toLocaleString(),
        message: "I'm looking for a ",
        serviceType: "",
        availability: "",
      };
      setPost((currentPosts) => [...currentPosts, newPost]);
      setShowPopup(true);

        // Maybe hide the popup after some time automatically
        setTimeout(() => setShowPopup(false), 7000);
      
    } 
  };

  return (
    <div className='chatbot-container'>
      <button onClick={toggleChatbot} className="chatbot-button">
        <img src="/assets/images/chat1.png" alt="Chat" />
      </button>

{isOpen && (
  <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
    <div className="relative w-full max-w-md bg-white rounded-t-lg shadow-xl bottom-0 mb-20">
      <div className="chat-header flex justify-between items-center p-4 bg-blue-600 text-white rounded-t-lg">
        <h2>Chat with us!</h2>
        <button onClick={toggleChatbot} className="close-button">
          X
        </button>
      </div>
      <div className="chat-messages p-4 overflow-y-auto h-96">
        {messages.map((message, index) => (
          <div key={index} className={message.content.role === 'user' ? userMessageStyle : botMessageStyle}>
            {message?.content?.parts[0]?.text}
            {message.actions.map((action, actionIndex) => (
              <button id={action.actionTag} key={actionIndex} onClick={(e) => performAction(e)}  className="mt-2 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
                {action.actionText}
              </button>
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex w-full border-t border-gray-200 p-4">
        <input
          className="flex-grow p-2 mr-4 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
          placeholder='Enter prompt'
          onChange={handlePromptChange}
          value={prompt}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  </div>
)}
{showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg">Added your request to the community feed!    </h4>
                        <button onClick={() => setShowPopup(false)} className="text-lg font-semibold">  &times;</button>
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}

export default App;
