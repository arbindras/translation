const express = require("express");
const bodyParser = require("body-parser");
const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

const app = express();
// credentials
const CREDENTIALS = require("./en-to-fr-arb-9fb50e02520f.json");

// Configuration for the client
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Translation of English into French"));

// Translation endpoint
app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;
    const [translation] = await translate.translate(text, {
      from: "en",
      to: "fr",
    });
    res.status(200).json({ translation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
