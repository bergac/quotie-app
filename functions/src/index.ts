import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// to connect to realtime database
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /quotes/:pushId
exports.addQuote = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const quote = {
        quote: req.query.quote,
        author: req.query.author
    };
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database()
        .ref('/quotes')
        .push(quote);
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.send(snapshot.ref.toString());
});

exports.getQuotes = functions.https.onRequest(async (req, res) => {
    const quotes = await admin.database()
        .ref('/quotes')
        .once('value');
    res.send(quotes);
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.reverseQuote = functions.database.ref('/quotes/{quoteId}')
    .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const quote: string = `${snapshot.val()}`;
        const reversedQuote = reverseString(quote);
        console.log('Saving quote', context.params.pushId, reversedQuote);
        // const uppercase = newQuote.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        return snapshot.ref.parent.child('reversed').set(reversedQuote);
    });

function reverseString(str: string): string {
    return str.split('').reverse().join('');
}
