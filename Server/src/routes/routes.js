"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const users_routes_1 = __importDefault(require("./users-routes"));
const products_routes_1 = __importDefault(require("./products-routes"));
const color_routes_1 = __importDefault(require("./color-routes"));
const categories_routes_1 = __importDefault(require("./categories-routes"));
const subcategories_routes_1 = __importDefault(require("./subcategories-routes"));
const purchases_routes_1 = __importDefault(require("./purchases-routes"));
const review_routes_1 = __importDefault(require("./review-routes"));
const admins_routes_1 = __importDefault(require("./admins-routes"));
const config_routes_1 = __importDefault(require("./config-routes"));
const payments_routes_1 = __importDefault(require("./payments-routes"));
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.use("/payment", payments_routes_1.default);
routes.use("/users", users_routes_1.default);
routes.use("/products", products_routes_1.default);
routes.use("/colors", color_routes_1.default);
routes.use("/categories", categories_routes_1.default);
routes.use("/subCategories", subcategories_routes_1.default);
routes.use("/purchases", purchases_routes_1.default);
routes.use("/review", review_routes_1.default);
routes.use("/admins", admins_routes_1.default);
routes.use("/config", config_routes_1.default);
