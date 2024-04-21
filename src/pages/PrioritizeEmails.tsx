import axios from "axios"
import config from "../config/index.json"
import { useEffect, useCallback, useState } from "react"
import priorityEmails from './mails.json';

type PriorityEmail = {
	sender: string,
	description: string,
	data?: any
}

const PrioritizeEmails = () => {

	// const {api} = config
	// const [priorityEmails, setPriorityEmails] = useState<PriorityEmail[] | undefined>(undefined)

	// useEffect(() => {
	// 	getPriorityEmails()
	// })

	// const getPriorityEmails = useCallback(async() => {
	// 	document.getElementById("pb-loading")?.removeAttribute("value")
	// 	try{
			
	// 		let data = JSON.stringify({
	// 			"email": "shivamhasurkar12@gmail.com",
	// 			"password": "wrld pbtu peoa wjgy"
	// 		});
			
	// 		let config = {
	// 			method: 'post',
	// 			maxBodyLength: Infinity,
	// 			url: api.priorityEmailEndpoint,
	// 			headers: { 
	// 				'Content-Type': 'application/json'
	// 			},
	// 			data : data
	// 		};
			
	// 		axios.request(config)
	// 		.then((response) => {
	// 			setPriorityEmails(JSON.parse(response.data))
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// 	}catch(e){
	// 		console.log("error: ", e)
	// 	}
	// }, [])

	return  (<div className="bg-gray-100 p-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Prioritized Mails from your mailbox!</h2>
  <div className="mx-auto" style={{ maxWidth: '90%' }}> {/* Increase the width to 90% of the parent */}
    {priorityEmails.map((email, index) => (
      <div key={index} className="bg-white p-6 rounded-lg shadow mb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="w-1/3 pr-4"> {/* Adjust the width and padding */}
            <span className="text-sm font-bold text-gray-600">Sender:</span>
            <span className="block text-sm text-gray-800">{email.sender}</span>
            <span className="text-sm font-bold text-gray-600">Subject:</span>
            <span className="block text-sm text-gray-800">{email.subject}</span>
          </div>
          <div className="w-2/3"> {/* Adjust the width */}
            <p className="text-sm text-gray-800 whitespace-pre-wrap">{email.description}</p>
            {email.data.start && email.data.end && (
              <p className="text-sm text-gray-500 mt-2">
                Start: {new Date(email.data.start).toLocaleString()} - End: {new Date(email.data.end).toLocaleString()}
              </p>
            )}
          </div>
        </div>
        <hr />
      </div>
    ))}
  </div>
</div>
);
		
}

export default PrioritizeEmails