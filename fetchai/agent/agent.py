import imaplib
import email
from typing import Dict, List
import ast
import re
import json
from uagents import Agent, Context, Protocol, Model
from pydantic import Field
from ai_engine import UAgentResponse, UAgentResponseType
import google.generativeai as genai
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import datetime
from pytz import timezone

SERVICE_ACCOUNT_FILE = 'credentials.json'
SCOPES = ['https://www.googleapis.com/auth/calendar']
CALENDAR_ID = 'shivamhasurkar12@gmail.com'


class Response(Model):
    text: str

class EmailAssistant(Model):
    email: str = "patil.aditi0711@gmail.com"
    password: str = "txrv pgew upsx ucnt"


SEED_PHRASE = "Thisisjustarandomlinktokeepitsecure-aditya'smachine"
AGENT_MAILBOX_KEY = "2371679f-111c-4194-84ac-6ebe267c794e"

email_assistant_agent = Agent(
    name="Email Assistant Agent",
    seed=SEED_PHRASE,
    port=8500,
    endpoint="http://localhost:8500/submit"
)

print(email_assistant_agent.address)
email_assistant_protocol = Protocol("Email Assistant Protocol")

PROMPT = "As an AI mail assistant, your task is to identify and prioritize the top 5 most urgent emails that I should respond to immediately from a given list. Evaluate the urgency of each email based on the following criteria:\
\
Sentiment Analysis: Determine the emotional tone of the email to gauge urgency (e.g., expressions of frustration, urgency, or critical need).\
Context of the Email: Identify if the email contains high-priority information such as work deadlines, direct requests from key figures like a CEO, or other time-sensitive inquiries.\
Urgency of Tone: Analyze the wording for signs of immediacy, like \"as soon as possible,\" \"urgent,\" or \"immediate action required.\" \
Spam Detection:\
Ensure that you exclude any emails that appear to be spam or irrelevant marketing messages.\
Output:\
you will return a json array with json objects of the following format:\
[{\
    \"sender\": email address of the sender,\
    \"subject\": Subject of the email,\
    \"description\": a brief summary of the email,\
    data:{\
        any additional data extracted from the email in the form of key value pairs\
    }\
}]\
Suppose there is a email asking for a meeting to be setup at a specified time. Then you will include the start time, end time in the data object.\
Make sure you keep the format consistent. All the values will be of string type.\
Always format the date and time into datetime format preferably dd-mm-yyyy hh:mm\
The time data should always have \"start\" and \"end\" as the keys\
Your response must be just like a normal JSON with the format specified.\
Again, this is very important: Do not include the word \'json\' or backticks in you response. Your response must be a valid JSON array starting with the opening square brace.\
Make sure your response is JSON parsable without any further processing. Do not include any special characters outside the JSON body response.\
"


async def get_gemini_response(emails_content: List[Dict[str, str]]):
    genai.configure(
        api_key="AIzaSyApKT0dYpL3fFsIakHHeldnltNub5g1X6Y")
    model = genai.GenerativeModel(
        'gemini-1.5-pro-latest', system_instruction=PROMPT)
    email_parts = [
        {'text': json.dumps(email)} for email in emails_content]
    response = model.generate_content({'role': "user", "parts": email_parts})
    return response.text


async def retrieve_emails(unread_emails: List, mail: imaplib.IMAP4_SSL):
    emails_content = []
    for e_id in unread_emails:
        status, response = mail.fetch(e_id, '(RFC822)')
        msg_json = {}
        if status == 'OK':
            email_msg = response[0][1].decode()
            msg_data = email.message_from_string(email_msg)

            msg_json["subject"] = msg_data["subject"]
            msg_json["from"] = msg_data["from"]
            if isinstance(msg_json["subject"], bytes):
                msg_json["subject"] = msg_json["subject"].decode()

            if msg_data.is_multipart():
                for part in msg_data.walk():
                    content_type = part.get_content_type()
                    content_disposition = str(part.get("Content-Disposition"))
                    try:
                        body = part.get_payload(decode=True).decode()
                    except:
                        pass
                    if content_type == "text/plain" and "attachment" not in content_disposition:
                        msg_json["body"] = body
            else:
                content_type = msg_data.get_content_type()

                body = msg_data.get_payload(decode=True).decode()
                if content_type == "text/plain":
                    msg_json["body"] = body

            mail.store(e_id, '-FLAGS', '\\Seen')
            emails_content.append(msg_json)
    return emails_content

async def schedule_event(formatted_emails: str, service: any, original_email: str):
    email_json = json.loads(json.loads(formatted_emails))
    print("sender:", email_json[0]["sender"])
    for i in range(len(email_json)):
        __email = email_json[i]
        if "data" in __email:
            
            if "start" in __email["data"]:
                start = __email["data"]["start"]

                if "end" in __email["data"]:
                    end = __email["data"]["end"]
                event = {
                    'summary': __email["subject"],
                    'description': __email["description"],
                    'start': {
                        'dateTime': timezone('America/Los_Angeles').localize(datetime.datetime.strptime(start, "%d-%m-%Y %H:%M")).isoformat(),
                        'timeZone': 'America/Los_Angeles',
                    },
                    'end': {
                        'dateTime': timezone('America/Los_Angeles').localize(datetime.datetime.strptime(end, "%d-%m-%Y %H:%M")).isoformat(),
                        'timeZone': 'America/Los_Angeles',
                    },
                }

                event = service.events().insert(calendarId=CALENDAR_ID, body=event).execute()
                print('Event created: %s' % (event.get('htmlLink')))


@email_assistant_protocol.on_message(model=EmailAssistant, replies={Response})
async def suggest_top_priority_emails(ctx: Context, sender: str, msg: EmailAssistant):
    print("message as received: ", msg)
    ctx.logger.info(msg.email)

    username = msg.email
    password = msg.password

    credentials = Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)

    service = build('calendar', 'v3', credentials=credentials)

    mail = imaplib.IMAP4_SSL("imap.gmail.com")
    mail.login(username, password)

    mail.select("inbox")

    date = (datetime.date.today() -
            datetime.timedelta(days=2)).strftime("%d-%b-%Y")
    status, response = mail.search(None, '(UNSEEN)', f'(SINCE "{date}")')

    if status == "OK":
        unread_msg_nums = response[0].split()

        print(f"There are {len(unread_msg_nums)} unread emails for today.")

        emails_content = await retrieve_emails(unread_msg_nums, mail)

        prioritized_emails = await get_gemini_response(emails_content=emails_content)

        string_converted = json.dumps(prioritized_emails)

        await schedule_event(string_converted, service, msg.email)

        mail.close()
        mail.logout()

        ctx.logger.info(prioritized_emails)
        await ctx.send(
            sender, Response(text=string_converted))

    else:
        print("Failed to retrieve emails.")
        await ctx.send(
            sender, Response(text="success")
        )

email_assistant_agent.include(email_assistant_protocol, publish_manifest=True)
email_assistant_agent.run()