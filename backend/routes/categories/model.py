from datetime import datetime
from sqlalchemy.dialects.postgresql import JSON
from database.schema import db
import uuid


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    is_public = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.String(100), db.ForeignKey(
        'users.id'), nullable=False)
    deleted = db.Column(db.Boolean, default=False)
    public_url = db.Column(db.String(250), nullable=True)

    def json(self):
        return {
            "id": self.id,
            "title": self.title,
            "created_at": self.created_at,
            "is_public": self.is_public,
            "deleted": self.deleted,
            "public_url": self.public_url if self.is_public else ""
        }
