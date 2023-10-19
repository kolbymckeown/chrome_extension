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
                categories = find(Category, filter={"user_id": auth_token, "deleted": False}).db_entries

                return Response({
                    "categories": [category.json() for category in categories]
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

    @jwt_required()
    def post(self):
        body = Request().body
        user_id = get_jwt_identity()

        # Extend the body dictionary with the user_id
        body['user_id'] = user_id

        new_category = Category(**body)

        db.session.add(new_category)
        db.session.commit()

        return Response({"category": new_category.json(), "auth_token": get_app_auth_token(body.get("id"))}, code=200).json

    @jwt_required()
    def put(self):
        try:
            auth_token = get_jwt_identity()
            category_id = Request().body['id']
            current_category = find_one(Category, filter={"id": category_id})

            if not current_category:
                return Response({"message": "Category not found"}, code=404).json

            updated_data = Request().body

            # Print the updated_data dictionary
            print(updated_data, file=sys.stderr)

            immutable_fields = ["id", "created_at"]

            for key, value in updated_data.items():
                print(key, value, file=sys.stderr)
                if key not in immutable_fields:
                    setattr(current_category, key, value)

            db.session.commit()

            return Response({"category": current_category.json()}, code=200).json
        except Exception as e:
            print(e, file=sys.stderr)
            return Response({"message": "Something went wrong"}, code=500).json

    @jwt_required()
    def delete(self):
        user_id = get_jwt_identity()
        category_id = request.args.get('category_id')

        # Ensure the user has the necessary permissions to delete this category
        category = Category.query.filter_by(id=category_id, user_id=user_id).first()
        if not category:
            return {"message": "Category not found or you don't have permission to delete it"}, 404

        # Try to set the 'deleted' column to True
        try:
            category.deleted = True
            db.session.commit()
            return {"message": "Category deleted successfully"}, 200
        except Exception as e:
            db.session.rollback()
            return {"message": f"Failed to delete the category: {str(e)}"}, 500
