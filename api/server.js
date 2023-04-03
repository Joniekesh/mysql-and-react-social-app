import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";
import likeRoute from "./routes/like.js";
import commentRoute from "./routes/comment.js";
import relationshipRoute from "./routes/relationship.js";
import storyRoute from "./routes/story.js";
import multer from "multer";

import { Server } from "socket.io";
import http from "http";
import {
	addUser,
	getOnlineUsers,
	getUser,
	removeUser,
} from "./utils/socketHelperFunctions.js";

dotenv.config();

const app = express();

// Middlewares
// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Credentials", true);
// 	next();
// });
app.use(
	cors({
		origin: "https://mysql-social-app.netlify.app",
	})
);
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "https://mysql-social-app.netlify.app",
	},
});

io.on("connection", (socket) => {
	socket.on("addUser", (fullname) => {
		addUser(socket.id, fullname);
		console.log("user connected");

		const users = getOnlineUsers();

		socket.emit("getOnlineUsers", users);
	});

	socket.on("sendNotification", ({ sender, receiver, type }) => {
		const user = getUser(receiver);

		io.to(user?.socketId).emit("getNotifications", { sender, type });
	});

	socket.on("disconnect", () => {
		removeUser(socket.id);
		console.log("user left");
	});
});

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../client/public/upload");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname);
	},
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
	const file = req.file;
	res.status(200).json(file.filename);
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/likes", likeRoute);
app.use("/api/comments", commentRoute);
app.use("/api/relationships", relationshipRoute);
app.use("/api/stories", storyRoute);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
	console.log(
		`SERVER running in ${process.env.NODE_ENV} MODE on PORT ${PORT}`.cyan.bold
	)
);
