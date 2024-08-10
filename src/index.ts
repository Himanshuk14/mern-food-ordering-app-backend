import express, { Request, Response } from "express";
import connectDB from "./db/index";
import "dotenv/config";
import app from "./app";
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running in  on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error.message));
