import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// to connect to realtime database
admin.initializeApp();

// Add quote to the Realtime Database under the path /quotes
exports.addQuote = functions.https.onRequest(async (req, res) => {
    // extract 'quote' and 'author' from url query
    const quote = {
        quote: req.query.quote,
        author: req.query.author
    };
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database()
        .ref('/quotes')
        .push(quote);

    // Return the url of the created quote
    res.send(snapshot.ref.toString());
});

// Retrieve all the quotes present in the database
exports.getQuotes = functions.https.onRequest(async (req, res) => {
    const quotes = await admin.database()
        .ref('/quotes')
        .once('value');
    res.send(quotes);
});
