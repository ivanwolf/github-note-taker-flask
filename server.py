import flask
import psycopg2

DEBUG = True

app = flask.Flask(
    __name__,
    static_url_path="",
    static_folder="./public"
    )

app.config.from_object(__name__)

#### DB Stuff

def connect_db():
    return psycopg2.connect('dbname=note-taker user=postgres')

def get_db():
    if not hasattr(flask.g, 'psql_db'):
        flask.g.psql_db = connect_db()
    return flask.g.psql_db

@app.route('/')
def index():
    return flask.send_file('./public/index.html')

@app.route('/profile/<username>')
def get_notes(username):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT text FROM notes WHERE username=%s \
                 ORDER BY id DESC", (username,))

    notes_list = [row[0] for row in cur.fetchall()]

    return flask.jsonify(notes_list)

@app.route('/add_note')
def add_note():
    params = flask.request.args
    username, text = params['username'], params['text']

    conn = get_db()
    cur = conn.cursor()
    cur.execute("INSERT INTO notes (username, text) VALUES (%s, %s)",
                (username, text))
    conn.commit()
    cur.execute("SELECT text FROM notes WHERE username=%s \
                 ORDER BY id DESC", (username,))

    notes_list = [row[0] for row in cur.fetchall()]
    # return flask.make_response()
    return flask.jsonify(notes_list)

if __name__ == '__main__':
    app.run()
