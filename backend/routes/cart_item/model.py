from database.schema import db
from datetime import datetime


class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_added = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(250), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(250), default='', nullable=True)
    image = db.Column(db.String(250), default='', nullable=True)
    category_id = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, default=1, nullable=True)
    purchased = db.Column(db.Boolean, default=False, nullable=False)
    url = db.Column(db.String(250), nullable=False)
    store = db.Column(db.String(250), nullable=False)

    def json(self):
        return {
            "id": self.id,
            "date_added": self.date_added,
            "title": self.title,
            "price": self.price,
            "description": self.description,
            "image": self.image,
            "category_id": self.category_id,
            "quantity": self.quantity,
            "purchased": self.purchased,
            "url": self.url,
            "store": self.store
        }
