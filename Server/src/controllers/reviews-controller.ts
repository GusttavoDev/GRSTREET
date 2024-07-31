import ReviewRepository from "../repositories/ReviewRepository"
import CreateReviewUseCase from "../use-cases/ReviewsUseCases/CreateReviewUseCase";
import EditReviewUseCase from "../use-cases/ReviewsUseCases/EditReviewUseCase";
import ListReviewsUseCase from "../use-cases/ReviewsUseCases/ListReviewsUseCase";
import DeleteReviewUseCase from "../use-cases/ReviewsUseCases/DeleteReviewUseCase";
import GetReviewUseCase from "../use-cases/ReviewsUseCases/GetReviewUseCase";

const ReviewsRepository = new ReviewRepository();

const addReviewController = new CreateReviewUseCase(ReviewsRepository);
const editReviewController = new EditReviewUseCase(ReviewsRepository);
const listReviewController = new ListReviewsUseCase(ReviewsRepository);
const removeReviewController = new DeleteReviewUseCase(ReviewsRepository);
const getReviewUseCase = new GetReviewUseCase(ReviewsRepository);

export {
    addReviewController,
    editReviewController,
    listReviewController,
    removeReviewController,
    getReviewUseCase
}