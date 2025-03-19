"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviews_controller_1 = require("../controllers/reviews-controller");
const reviewRouter = (0, express_1.Router)();
// List reviews for a product
reviewRouter.get("/product/:productId", async (request, response) => {
    try {
        const productId = request.params.productId;
        const reviews = await reviews_controller_1.listReviewController.execute(productId);
        return response.json(reviews);
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Get a review by ID
reviewRouter.get("/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const review = await reviews_controller_1.getReviewUseCase.execute(id);
        if (review) {
            return response.json(review);
        }
        else {
            return response.status(404).send({ message: "Review not found" });
        }
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Create a new review
reviewRouter.post("/", async (request, response) => {
    try {
        const { user_id, product_id, stars, comment } = request.body;
        await reviews_controller_1.addReviewController.execute({ user_id, product_id, stars, comment });
        return response.status(201).send({ message: "Review created successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Edit an existing review
reviewRouter.put("/", async (request, response) => {
    try {
        const { id, user_id, product_id, stars, comment } = request.body;
        await reviews_controller_1.editReviewController.execute({ id, user_id, product_id, stars, comment });
        return response.status(200).send({ message: "Review updated successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Remove a review
reviewRouter.delete("/", async (request, response) => {
    try {
        const { id } = request.body;
        await reviews_controller_1.removeReviewController.execute(id);
        return response.status(200).send({ message: "Review deleted successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
exports.default = reviewRouter;
