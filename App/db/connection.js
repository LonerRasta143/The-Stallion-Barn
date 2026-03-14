const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected to ${mongoosee.conection.name}");
});
mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error: ${err}");
});