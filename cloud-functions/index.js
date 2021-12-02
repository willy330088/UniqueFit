const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });

exports.getGoogleNearbySearch = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      functions.logger.info('Hello logs!', { structuredData: true });
      axios(
        encodeURI(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${request.query.lat},${request.query.lng}&radius=5000&keyword=健身房&language=zh-TW&key=AIzaSyAbsCYT5vZNuhGd3Z2e5GoqDk_N_lntlGI`
        )
      )
        .then((res) => JSON.parse(JSON.stringify(res.data)))
        .then((json) => response.json(json));
    });
  }
);
