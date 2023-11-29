from flask_restful import Resource
from flask import request
from database.schema import db
from routes.cart_item.model import CartItem
from routes.categories.model import Category
import sys


class PublicCategoryResource(Resource):
    def get(self):
        category_id = request.args.get("category_id")
        try:
            # Fetch the category
            category = Category.query.filter_by(id=category_id).first()

            # Check if the category exists and is public
            if not category or not category.is_public:
                return {"message": "This category is not made public"}, 403

            # Query the cart items
            cart_items = CartItem.query.filter_by(
                category_id=category_id).all()
            return {
                "cart_items": [dissoc(item.json(), "user_id", "date_added") for item in cart_items],
                "title": category.title,
            }, 200

        except Exception as e:
            return {"message": "Something went wrong"}, 500


def dissoc(d, *keys):
    return {k: v for k, v in d.items() if k not in keys}
