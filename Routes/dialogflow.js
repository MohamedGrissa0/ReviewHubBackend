// Import the packages we need
const router = require("express").Router();
const dialogflow = require('@google-cloud/dialogflow');
require('dotenv').config();

// Your credentials
const CREDENTIALS = process.env.CREDENTIALS


// Your google dialogflow project-id
const PROJECT_ID = CREDENTIALS.project_id;

// Configuration for the client
const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email
  }
};

// Create a new session
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

// Detect intent method
const detectIntent = async (languageCode, queryText, sessionId) => {

  let sessionPath = sessionClient.projectAgentSessionPath(PROJECT_ID, sessionId);

  // The text query request.
  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: queryText,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  console.log(result);

  return {
    response: result.fulfillmentText
  };
}

// Home route
router.get('/', (req, res) => {
  res.send(`Hello World.!`);
});

// Dialogflow route
router.post('/dialogflow', async (req, res) => {

  let languageCode = req.body.languageCode;
  let queryText = req.body.queryText;
  let sessionId = req.body.sessionId;

  let responseData = await detectIntent(languageCode, queryText, sessionId);

  res.send(responseData.response);
});

module.exports = router; // Export the router object
