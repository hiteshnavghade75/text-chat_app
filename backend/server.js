const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');
const userRoutes = require('./routes/user.routes');

const connectToMongoDB = require('./db/connection');
const { app, server } = require('./socket/socket');

const PORT = process.env.PORT || 5000; 

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

const buildPath = path.resolve(__dirname, '..', 'frontend', 'build');

app.use(express.static(buildPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`)
});


