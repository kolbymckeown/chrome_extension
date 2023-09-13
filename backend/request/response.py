from flask import jsonify, make_response


class Response:
    def __init__(self, body={}, code=200):
        self.json = make_response(
            jsonify({
                **body,
                "status_code": code
            }), code
        )
