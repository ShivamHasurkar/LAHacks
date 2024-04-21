import axios from "axios"
import config from "../config/index.json"
import { useEffect, useCallback, useState } from "react"

type PriorityEmail = {
	sender: string,
	description: string,
	data?: any
}

const PrioritizeEmails = () => {

	const {api} = config
	const [priorityEmails, setPriorityEmails] = useState<PriorityEmail[] | undefined>(undefined)

	useEffect(() => {
		getPriorityEmails()
	})

	const getPriorityEmails = useCallback(async() => {
		document.getElementById("pb-loading")?.removeAttribute("value")
		try{
			
			let data = JSON.stringify({
				"email": "shivamhasurkar12@gmail.com",
				"password": "wrld pbtu peoa wjgy"
			});
			
			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: api.priorityEmailEndpoint,
				headers: { 
					'Content-Type': 'application/json'
				},
				data : data
			};
			
			axios.request(config)
			.then((response) => {
				setPriorityEmails(JSON.parse(response.data))
			})
			.catch((error) => {
				console.log(error);
			});
		}catch(e){
			console.log("error: ", e)
		}
	}, [])
	return <div className="min-w-full h-screen">
		<div className="flex justify-center items-center">
			<div className="shadow-lg rounded-lg">
				<div className="p-8 content-start" aria-busy="true" aria-describedby="progress-bar">
					<strong className="self-start"><h1>Prioritize Emails</h1></strong>
					{priorityEmails?.map(email => {
						return <div>
							<div>Sender {email.sender}</div>
							<div>Description {email.description}</div>
							<hr/>
						</div>
					})}
				</div>
			</div>
		</div>
	</div>
}

export default PrioritizeEmails