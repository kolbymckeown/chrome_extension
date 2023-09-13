import os
from flask import Flask

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.environ['JWT_SECRET']

if __name__ == "__main__":
    app.run(debug=True)
