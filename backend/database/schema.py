import os
from app import app
from flask_sqlalchemy import SQLAlchemy
import sys


app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DB_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
print(os.environ['DB_URI'], file=sys.stderr)


db = SQLAlchemy(app)
