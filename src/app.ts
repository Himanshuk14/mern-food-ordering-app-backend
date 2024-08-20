import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.send({ message: "Server is up and running" });
});

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
import userRouter from "./routes/user.route";
import restaurantRouter from "./routes/MyRestaurant.route";
import allRestaurantRouter from "./routes/Restaurant.routes";
app.use("/users", userRouter);
app.use("/restaurants", restaurantRouter);
app.use("/all-restaurants", allRestaurantRouter);
export default app;
