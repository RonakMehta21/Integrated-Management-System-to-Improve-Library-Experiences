from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from functions import get_tweets, get_googlebooks
from settings import conf
import json

app = Flask(__name__)

# Supporting Cross Origin requests for all APIs
cors = CORS(app)

# Swagger spec integration with the UI
# SWAGGER_URL = '/swagger'
# API_URL = '/static/swagger.json'
# SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
#     SWAGGER_URL,
#     API_URL,
#     config={
#         'app_name': "Twitter Tweets"
#     }
# )
# app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)


@app.route('/v1/tweets/<string>', methods=['GET'])
def getTweets(string):
    return jsonify(get_tweets(string, conf))

@app.route('/v1/googlebooks/<string>', methods=['GET'])
def getGoogleBooks(string):
    return jsonify(get_googlebooks(string))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
