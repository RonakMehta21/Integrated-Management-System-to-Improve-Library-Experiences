from requests_oauthlib import OAuth1
import requests
import json
from settings import conf
import logging
import urllib.parse

# These two lines enable debugging at httplib level (requests->urllib3->http.client)
# You will see the REQUEST, including HEADERS and DATA, and RESPONSE with HEADERS but without DATA.
# The only thing missing will be the response.body which is not logged.
# try:
#     import http.client as http_client
# except ImportError:
#     # Python 2
#     import httplib as http_client
# http_client.HTTPConnection.debuglevel = 1
#
# # You must initialize logging, otherwise you'll not see debug output.
# logging.basicConfig()
# logging.getLogger().setLevel(logging.DEBUG)
# requests_log = logging.getLogger("requests.packages.urllib3")
# requests_log.setLevel(logging.DEBUG)
# requests_log.propagate = True

def get_tweets(string, conf):
    oauth = createOAuth1Object(conf)
    # string = "Harry Potter and the Chamber of Secrets (Book 2)"
    # url="https://api.twitter.com/1.1/search/tweets.json?q="
    twitterResourceUrl = "https://api.twitter.com/1.1/search/tweets.json?"
    params = {'q': string}
    finalUrl = twitterResourceUrl + urllib.parse.urlencode(params)
    response = requests.get(finalUrl, auth=oauth)
    return json.loads(response.text)

def get_googlebooks(string):
    googleResourceUrl = "https://www.googleapis.com/books/v1/volumes?"
    params = {'q': string}
    finalUrl = googleResourceUrl + urllib.parse.urlencode(params)
    response = requests.get(finalUrl)
    return json.loads(response.text)

def createOAuth1Object(conf):
    return OAuth1(conf['consumerKey'],
                  client_secret=conf['consumerSecret'],
                  resource_owner_key=conf['accessToken'],
                  resource_owner_secret=conf['accessSecret'],
                  signature_method='HMAC-SHA1')
