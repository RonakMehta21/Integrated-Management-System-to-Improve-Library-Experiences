import unittest
import mock
from functions import get_tweets

class functionsTest(unittest.TestCase):

    def setUp(self):
        self.testConf = {
            "consumerKey": "testConsumerKey",
            "consumerSecret": "testConsumerSecret",
            "twitterEndpoint": "http://testEndpointUrl",
            "accessToken": "testAccessToken",
            "accessSecret": "testAccessSecret"
        }

    '''
    Author: Chetan Kulkarni
    '''
    @mock.patch('functions.requests')
    def test_get_tweet(self, mock_requests):

        # Mocking the requests' GET method to send an appropriate response
        tweet = get_tweets(self.testConf)
        mock_requests.get
