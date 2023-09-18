from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from flask import request
from datetime import datetime
from request.response import Response
from request.request import Request
from database.schema import db
from utils.database import find_one, find
from utils.dict import dissoc
from request.auth import get_app_auth_token
import sys
from .model import Category  # Import the Category model

class CategoryResource(Resource):
    @jwt_required(optional=True)
    def get(self):
        auth_token = get_jwt_identity()
        category_id = request.args.get("category_id")  # Update the parameter name

        if category_id == "all":
            try:
                categories = find(Category, filter={"user_id": auth_token}).db_entries

                return Response({
                    "categories": [dissoc(
                        category.json(), ['id']) for category in categories]
                }, code=200).json
            except Exception as e:
                print(e, file=sys.stderr)
                return Response({"message": "Something went wrong"}, code=500).json

        category = find_one(Category, filter={"id": category_id})

        if category:
            category = category.json()
            return Response({
                "category": category,
                "auth_token": None if auth_token else get_app_auth_token(category_id)
            }, code=200).json
        else:
            return Response({"message": "Category not found"}, code=404).json

    def post(self):
        body = Request().body

        new_category = Category(
            **body
        )

        db.session.add(new_category)
        db.session.commit()

        return Response({"category": new_category.json(), "auth_token": get_app_auth_token(body.get("id"))}, code=200).json

    @jwt_required()
    def put(self):
        try:
            auth_token = get_jwt_identity()

            current_category = find_one(Category, filter={"id": auth_token})

            if not current_category:
                return Response({"message": "Category not found"}, code=404).json

            updated_data = Request().body

            # Print the updated_data dictionary
            print(updated_data, file=sys.stderr)

            immutable_fields = ["id", "title", "created_at", "is_public"]

            for key, value in updated_data.items():
                print(key, value, file=sys.stderr)
                if key not in immutable_fields:
                    setattr(current_category, key, value)

            db.session.commit()

            return Response({"category": current_category.json()}, code=200).json
        except Exception as e:
            print(e, file=sys.stderr)
            return Response({"message": "Something went wrong"}, code=500).json
