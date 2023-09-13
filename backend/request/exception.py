from flask import jsonify


def template(message, code=500, body=None):
    return {'message': message, 'status_code': code, 'body': body}


class AppException(Exception):
    status_code = 500

    def __init__(self, message, status_code=None, body=None):
        Exception.__init__(self)
        self.message = message
        self.body = body

        if status_code is not None:
            self.status_code = status_code

    def to_json(self):
        return jsonify({
            "message": self.message,
            "status_code": self.status_code,
            "body": self.body
        })
