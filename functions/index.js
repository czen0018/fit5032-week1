// Week 9 - Cloud Functions for the NoMash Library

// 2.1 onRequest maps firebase-functions HTTPS (v2) requests
const {onRequest} = require("firebase-functions/https");
// Firestore trigger used in Task 9.2 (runs when a new book document is created)
const {onDocumentCreated} = require("firebase-functions/firestore");
const {setGlobalOptions} = require("firebase-functions");
const logger = require("firebase-functions/logger");

// 2.2 Firebase admin SDK so the function can access Firestore
const admin = require("firebase-admin");
const {FieldValue} = require("firebase-admin/firestore");

// 2.3 cors to avoid the CORS policy issue described in 9.1.2
const cors = require("cors")({origin: true});

admin.initializeApp();
setGlobalOptions({maxInstances: 10});

/**
 * Task 9.1 - countBooks
 * 2.4 / 2.5 / 2.6: returns the number of documents in the "books" collection.
 * URL: https://countbooks-xxxxx.a.run.app  (shown in Firebase console after deploy)
 */
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      logger.info(`countBooks: ${count} book(s) found`);
      res.status(200).json({count});
    } catch (error) {
      logger.error("Error counting books:", error);
      res.status(500).send("Error counting books");
    }
  });
});

/**
 * Task 9.2 - capitalizeBook
 * Firestore trigger: every time a new document is added to "books",
 * every string field is converted to UPPER CASE and written back.
 * The original (lower-case) values are kept in "originalData" so the
 * before/after result can be shown in the browser.
 */
exports.capitalizeBook = onDocumentCreated("books/{bookId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    logger.warn("capitalizeBook: no data in event");
    return;
  }

  const data = snapshot.data();

  // Skip documents that were already processed (avoid an infinite loop)
  if (data.capitalized === true) {
    return;
  }

  const capitalizedData = {};
  for (const [key, value] of Object.entries(data)) {
    capitalizedData[key] =
      typeof value === "string" ? value.toUpperCase() : value;
  }

  await snapshot.ref.update({
    ...capitalizedData,
    originalData: data,
    capitalized: true,
    capitalizedAt: FieldValue.serverTimestamp(),
  });

  logger.info(`capitalizeBook: document ${event.params.bookId} capitalised`, {
    before: data,
    after: capitalizedData,
  });
});

/**
 * Week 10 Task 10.2 - getAllBooks
 * REST API endpoint that returns every document in "books" as JSON.
 */
exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await admin.firestore().collection("books").get();
      const books = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));

      logger.info(`getAllBooks: returning ${books.length} book(s)`);
      res.status(200).json({count: books.length, books});
    } catch (error) {
      logger.error("Error getting all books:", error);
      res.status(500).send("Error getting all books");
    }
  });
});
