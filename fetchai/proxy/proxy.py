import json

from fastapi import FastAPI
from uagents import Model
from uagents.context import send_sync_message

AGENT_ADDRESS = "agent1q0ntce9a32ll98kqqglllfn2dkaqvtfl3kzlnjzzxg805hu3240ngakwudn"


class Response(Model):
    text: str

class EmailAssistant(Model):
    email: str = "patil.aditi0711@gmail.com"
    password: str = "txrv pgew upsx ucnt"


async def agent_query(req):
    response = await send_sync_message(AGENT_ADDRESS, message=req, response_type=Response)
    print(response)
    return json.loads(response.text)


app = FastAPI()


@app.get("/")
def read_root():
    return "Hello from the Agent controller"


@app.post("/prioritize")
async def make_agent_call(req: EmailAssistant):
    try:
        res = await agent_query(req)
        return f"successful call - agent response: {res}"
    except Exception as e:
        print(e)
        return "unsuccessful agent call"
