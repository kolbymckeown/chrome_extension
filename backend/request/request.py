import json
from flask import request


class Request:
    def __init__(self):
        self.body = json.loads(request.data)
