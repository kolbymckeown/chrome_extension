import os
from app import app
from flask_sqlalchemy import SQLAlchemy


app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DB_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
