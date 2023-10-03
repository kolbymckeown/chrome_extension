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
        category_id = request.args.get("category_id")
        
        if cart_item_id == "all":
            if category_id:
                # Fetch all cart items associated with the user and the specified category_id ordered by date_added (descending)
                cart_items = CartItem.query.filter_by(
                    user_id=user_id, category_id=category_id).order_by(CartItem.date_added.desc()).all()

            # Fetch all cart items associated with the user
            else:
                # Fetch all cart items associated with the user (without category filtering)
                cart_items = CartItem.query.filter_by(user_id=user_id).order_by(CartItem.date_added.desc()).all()
            if not cart_items:
                return Response({"cart_items": []}, code=200).json
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

        # Extend the body dictionary with the user_id
        body['user_id'] = user_id

        new_cart_item = CartItem(
            **body
        )

        db.session.add(new_cart_item)
        db.session.commit()

        return Response({"cart_item": new_cart_item.json()}, code=201).json

    @jwt_required()
    def put(self):
        user_id = get_jwt_identity()
        body = Request().body

        cart_item_id = body.get("id")
        cart_item = find_one(CartItem, filter={"id": cart_item_id})

        if not cart_item:
            return Response({"message": "Cart item not found"}, code=401).json

        if cart_item.user_id != user_id:
            return Response({"message": "Authentication Denied"}, code=401).json

        cart_item.title = body.get("title", cart_item.title)
        cart_item.price = body.get("price", cart_item.price)
        cart_item.description = body.get("description", cart_item.description)
        cart_item.image = body.get("image", cart_item.image)
        cart_item.category_id = body.get("categoryId", cart_item.category_id)
        cart_item.quantity = body.get("quantity", cart_item.quantity)
        cart_item.purchased = body.get("purchased", cart_item.purchased)
        cart_item.store = body.get("store", cart_item.store)
        cart_item.url = body.get("url", cart_item.url)

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
