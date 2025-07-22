from flask import Flask,  request, jsonify, abort


from database import db, Users
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SERVER_PORT'] = 5001
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.app_context().push()

db.init_app(app)

@app.route('/users', methods = ["GET"])
def users():
    users_data = {}
    try:
        all_users = Users.query.all()
        users_data = [{user.id: user.get_dict()} for user in all_users]

    except:
        print("Ошибка чтения из бд")
    return jsonify(users_data)

@app.route('/users/<int:user_id>', methods = ["GET"])
def users_id(user_id):
    user_data = {}
    try:
        user = Users.query.filter(Users.id == user_id).first()
        print(user)
        if user:
            user_data = {user.id: user.get_dict()}
        else:
            return "Юзера с таким ID нет"
    except:
        print("Ошибка чтения из бд")

    return jsonify(user_data)



@app.route('/users/add', methods = ["GET", "POST"])
def users_add():
    if request.method == "POST":
        uni_email = Users.query.filter(Users.email == request.json['email']).first()
        if uni_email:
            print("error")
            abort(500, description="Пользователь с таким email уже существует")
        try:
            user = Users(name=request.json['name'], age=request.json['age'], email=request.json['email'])
            db.session.add(user)
            db.session.commit()
        except:
            db.session.rollback()
            print("Ошибка добавления в БД")
    return {}

if __name__ == '__main__':
    app.run(port=app.config['SERVER_PORT'], debug=True)