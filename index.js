const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { getUserId } = require("./middlewares/authMiddlewares");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") {
        return res.status(200);
    }
    next();
});

app.use(getUserId);

require("./routes/authRoutes")(app);
require("./routes/productRoutes")(app);
require("./routes/apartmentRoutes")(app);
require("./routes/orderRoutes")(app);

try {
    mongoose.connect(
        "mongodb+srv://ravi:mongodb@vendor-app-dev-sn8zo.mongodb.net/dev?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    app.listen(5000);
} catch (error) {
    console.log(error);
}
