from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import bcrypt
import jwt
from datetime import datetime, timedelta
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Configure SQLite database
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'ocularai.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'  # Change this in production!

db = SQLAlchemy(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.email}>'


# Create tables (run once)
with app.app_context():
    db.create_all()


# Helper functions
def create_token(user_id):
    return jwt.encode(
        {
            'user_id': user_id,
            'exp': datetime.utcnow() + timedelta(hours=1)
        },
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )


# Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check if user exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 400

    # Hash password
    hashed = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    # Create user
    user = User(
        name=data['name'],
        email=data['email'],
        password=hashed.decode('utf-8')
    )
    db.session.add(user)
    db.session.commit()

    # Generate token
    token = create_token(user.id)

    return jsonify({
        'token': token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
    }), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    # Find user
    user = User.query.filter_by(email=data['email']).first()

    # Check credentials
    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({'message': 'Invalid credentials'}), 401

    # Generate token
    token = create_token(user.id)

    return jsonify({
        'token': token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
    })


@app.route('/api/user', methods=['GET'])
def get_user():
    # Get token from header
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Missing token'}), 401

    try:
        token = auth_header.split()[1]
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])

        user = User.query.get(data['user_id'])
        if not user:
            return jsonify({'message': 'User not found'}), 404

        return jsonify({
            'id': user.id,
            'name': user.name,
            'email': user.email
        })
    except Exception as e:
        return jsonify({'message': 'Invalid token'}), 401


if __name__ == '__main__':
    app.run(port=5000, debug=True)