import { Router, Request, Response } from "express";
import {
    addReviewController,
    editReviewController,
    listReviewController,
    removeReviewController,
    getReviewUseCase
} from "../controllers/reviews-controller";
import IReview from "../entities/IReview";

const reviewRouter = Router();

// List reviews for a product
reviewRouter.get("/product/:productId", async (request: Request, response: Response) => {
    try {
        const productId = request.params.productId;
        const reviews = await listReviewController.execute(productId);
        return response.json(reviews);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Get a review by ID
reviewRouter.get("/:id", async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const review = await getReviewUseCase.execute(id);
        if (review) {
            return response.json(review);
        } else {
            return response.status(404).send({ message: "Review not found" });
        }
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Create a new review
reviewRouter.post("/", async (request: Request, response: Response) => {
    try {
        const { user_id, product_id, stars, comment }: Omit<IReview, "id"> = request.body;
        await addReviewController.execute({ user_id, product_id, stars, comment });
        return response.status(201).send({ message: "Review created successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Edit an existing review
reviewRouter.put("/", async (request: Request, response: Response) => {
    try {
        const { id, user_id, product_id, stars, comment }: IReview = request.body;
        await editReviewController.execute({ id, user_id, product_id, stars, comment });
        return response.status(200).send({ message: "Review updated successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Remove a review
reviewRouter.delete("/", async (request: Request, response: Response) => {
    try {
        const { id } = request.body;
        await removeReviewController.execute(id);
        return response.status(200).send({ message: "Review deleted successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

export default reviewRouter;
