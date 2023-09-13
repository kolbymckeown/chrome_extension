from datetime import datetime
from sqlalchemy.dialects.postgresql import JSON
from database.schema import db
import uuid


class Users(db.Model):
    id = db.Column(db.String(100), primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    profile_complete = db.Column(db.Boolean, default=False)

    def json(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "profile_complete": self.profile_complete,
        }
