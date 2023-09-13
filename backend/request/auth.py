import datetime
from flask_jwt_extended import create_access_token


def get_app_auth_token(id):
    expires = datetime.timedelta(days=7)
    return create_access_token(identity=id, expires_delta=expires)
