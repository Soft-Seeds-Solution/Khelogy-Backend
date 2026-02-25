import express from "express";
import cors from "cors"
import connectToMongoDb from "./db.js";
import productController from "./Controllers/ProductController.js";
import GameCatController from "./Controllers/GameCatController.js";
import CategoryController from "./Controllers/CategoryController.js";
import UserController from "./Controllers/UserController.js";
import trackController from "./Controllers/TrackRecordController.js";
import favController from "./Controllers/FavouriteController.js";
import blogsController from "./Controllers/BlogsController.js";
const app = express()
app.use(cors({
    origin: "*"
}))
app.use(express.json())
connectToMongoDb()
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

app.use("/api/gameCat", GameCatController)
app.use("/api/category", CategoryController)
app.use("/api/games", productController)
app.use("/api/user", UserController)
app.use("/api/track", trackController)
app.use("/api/fav", favController)
app.use("/api/blogs", blogsController)

app.listen(8000, () => {
    console.log("App listing at http://localhost:8000");
})