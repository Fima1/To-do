
from flask import Flask
from flask import jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
import os.path
from flask_cors import CORS

basedir = os.path.abspath(os.path.dirname(__file__))


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')


CORS(app) 

db = SQLAlchemy(app)

@app.route('/api')
def json_test():
     return jsonify([*map(task_serialize, Task.query.all())]) 
     
@app.route('/create_task', methods=['POST'])
def create():
    request_data = json.loads(request.data)
    task = Task(task_name=request_data['name'], task_description =  request_data['description'])
    db.session.add(task)
    db.session.commit()

    return {'201': 'task created successfully'}


@app.route('/delete_task', methods = ['POST'])
def delete():
    request_data = json.loads(request.data)
    Task.query.filter_by(id=request_data['id']).delete()
    db.session.commit()

    return {'204': 'Deleted successfully'}

@app.route('/edit_task',  methods = ['POST'])
def edit():
    request_data = json.loads(request.data)
    task = Task.query.filter_by(id=request_data['id']).first()
    task.task_name = request_data['name']
    task.task_description = request_data['description']
    db.session.add(task)
    db.session.commit()

    return {'204': 'task updated successfully'}

class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.Text)
    task_description = db.Column(db.Text)

    def __str__(self):
        return f'{self.id} {self.content}'


def task_serialize(task):
    return {
        'id': task.id,
        'name': task.task_name,
        'description': task.task_description
        }

@app.route('/')
def sample():
    return '<h1>Testing Flask</h1>'

if __name__ == '__main__':
    app.run(debug=True)

