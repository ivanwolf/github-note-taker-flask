import flask

DEBUG = True
SECRET_KEY = 'this is a secret'

app = flask.Flask(__name__)

app.config.from_object(__name__)

@app.route('/')
def index():
    return flask.send_file('../public/index.html')

@app.route('/profile/<username>')
def get_notes(username):
    pass