import requests
import json
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from flask import request
from datetime import datetime
from request.response import Response
from request.request import Request
from routes.users.model import Users
from database.schema import db
from utils.database import find_one, find
from utils.dict import dissoc
from request.auth import get_app_auth_token
import sys


class UsersResource(Resource):
    @jwt_required(optional=True)
    def get(self):
        auth_token = get_jwt_identity()
        user_id = auth_token if auth_token else request.args.get("user_id")

        if user_id == "all":
            try:
                all_users = find(Users, {}).db_entries
                return Response({
                    "users": [dissoc(
                        user.json(), ['id']) for user in all_users]
                }, code=200).json
            except Exception as e:
                print(e, file=sys.stderr)
                return Response({"message": "Something went wrong"}, code=500).json

        user = find_one(Users, filter={"id": user_id})

        if user:
            user = user.json()
            return Response({
                "user": user,
                "auth_token": None if auth_token else get_app_auth_token(user_id)
            }, code=200).json
        else:
            return Response({"message": "User not found"}, code=404).json

    def post(self):
        body = Request().body

        new_user = Users(
            **body
        )

        db.session.add(new_user)
        db.session.commit()

        return Response({"user": new_user.json(), "auth_token": get_app_auth_token(body.get("id"))}, code=200).json

    @jwt_required()
    def put(self):
        try:
            auth_token = get_jwt_identity()

            current_user = find_one(Users, filter={"id": auth_token})

            if not current_user:
                return Response({"message": "User not found"}, code=404).json

            updated_data = Request().body

            # Print the updated_data dictionary
            print(updated_data, file=sys.stderr)

            immutable_fields = ["id", "email",
                                "first_name", "last_name", "profile_complete"]

            for key, value in updated_data.items():
                print(key, value, file=sys.stderr)
                if key not in immutable_fields:
                    setattr(current_user, key, value)

            if not current_user.profile_complete:
                setattr(current_user, "profile_complete", True)

            db.session.commit()

            return Response({"user": current_user.json()}, code=200).json
        except Exception as e:
            print(e, file=sys.stderr)
            return Response({"message": "Something went wrong"}, code=500).json
