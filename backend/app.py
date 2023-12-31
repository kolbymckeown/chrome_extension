import os
from flask import request
from flask_restful import Api
from flask_cors import CORS
from config import app
from flask_jwt_extended import JWTManager
from request.exception import AppException, template
from routes.users.controller import UsersResource
from routes.cart_item.controller import CartItemResource
from routes.categories.controller import CategoryResource
from routes.public_categories.controller import PublicCategoryResource

# Convert the list of whitelisted origins to a list with stripped elements
WHITELIST_ORIGINS = [x.strip() for x in os.environ['WHITE_ORIGIN'].split(
    ',')] if 'WHITE_ORIGIN' in os.environ else ["http://localhost:3000", "https://chrome-extension-dusky.vercel.app"]

cors = CORS(app, resources={r"*": {"origins": WHITELIST_ORIGINS}})


def register_error_handler():
    def errorhandler(error):
        if isinstance(error, AppException):
            response = error.to_json()
            response.status_code = error.status_code
        else:
            error_template = template(str(error), code=400)
            response = AppException(**error_template).to_json()
            response.status_code = 400

        return response

    app.errorhandler(Exception)(errorhandler)


def register_resources(api):
    api.add_resource(UsersResource, '/users')
    api.add_resource(CartItemResource, '/cart-item')
    api.add_resource(CategoryResource, '/categories')
    api.add_resource(PublicCategoryResource, '/public-category')


api = Api(app)
jwt = JWTManager(app)

register_error_handler()
register_resources(api)
