/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import SwaggerUI from "swagger-ui-express";

import { AppError } from "./errors/AppError";
import { router } from "./routes";
import SwaggerFile from "./swagger.json";

import "./database";
import "./shared/container";

const app = express();

app.use(express.json());

app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(SwaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal server error ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("🚀 server started on port 3333"));
