from flask import Flask, request, jsonify
from model.vectorization import vector_rec

app = Flask(__name__)


@app.route('/', methods=['POST'])
def vector_recommendation():
    user_id = int(request.form['user_id'])
    rec = vector_rec(user_id)
    return rec

if __name__ == '__main__':
    app.run(debug=True)
