from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.schema import db
from routes.users.model import Users
from request.response import Response
from request.request import Request
from utils.database import find_one, find
import sys

from .model import CartItem


class CartItemResource(Resource):

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        cart_item_id = request.args.get("cart_item_id")

        if cart_item_id == "all":
            # Fetch all cart items associated with the user
            cart_items = CartItem.query.filter_by(user_id=user_id).all()
            if not cart_items:
                return Response({"message": "No cart items found"}, code=401).json
            return Response({"cart_items": [item.json() for item in cart_items]}, code=200).json
        else:
            # Fetch a specific cart item
            cart_item = find_one(CartItem, filter={"id": cart_item_id})
            if not cart_item:
                return Response({"message": "Cart item not found"}, code=401).json
            if cart_item.user_id != user_id:
                return Response({"message": "Authentication Denied"}, code=401).json
            return Response({"cart_item": cart_item.json()}, code=200).json

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        body = Request().body

        new_cart_item = CartItem(
            user_id=user_id,
            title=body.get("title"),
            price=body.get("price"),
            description=body.get("description"),
            image=body.get("image"),
            category=body.get("category"),
            quantity=body.get("quantity")
        )

        db.session.add(new_cart_item)
        db.session.commit()

        return Response({"cart_item": new_cart_item.json()}, code=201).json

    @jwt_required()
    def put(self):
        user_id = get_jwt_identity()
        body = Request().body

        cart_item_id = body.get("cart_item_id")
        cart_item = find_one(CartItem, filter={"id": cart_item_id})

        if not cart_item:
            return Response({"message": "Cart item not found"}, code=401).json

        if cart_item.user_id != user_id:
            return Response({"message": "Authentication Denied"}, code=401).json

        cart_item.title = body.get("title", cart_item.title)
        cart_item.price = body.get("price", cart_item.price)
        cart_item.description = body.get("description", cart_item.description)
        cart_item.image = body.get("image", cart_item.image)
        cart_item.category = body.get("category", cart_item.category)
        cart_item.quantity = body.get("quantity", cart_item.quantity)

        db.session.commit()

        return Response({"cart_item": cart_item.json()}, code=201).json

    @jwt_required()
    def delete(self):
        user_id = get_jwt_identity()
        cart_item_id = request.args.get("cart_item_id")

        cart_item = find_one(CartItem, filter={"id": cart_item_id})

        if not cart_item:
            return Response({"message": "Cart item not found"}, code=401).json

        if cart_item.user_id != user_id:
            return Response({"message": "Authentication Denied"}, code=401).json

        db.session.delete(cart_item)
        db.session.commit()

        return Response({"message": "Cart item deleted"}, code=200).json
