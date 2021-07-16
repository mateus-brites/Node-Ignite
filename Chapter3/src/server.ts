import "reflect-metadata";
import express from "express";
import SwaggerUI from "swagger-ui-express";

import { router } from "./routes";
import SwaggerFile from "./swagger.json";

import "./database";
import "./shared/container";

const app = express();

app.use(express.json());

app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(SwaggerFile));

app.use(router);

app.listen(3333, () => console.log("🚀 server started on port 3333"));
