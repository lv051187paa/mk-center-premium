<?php
//ini_set('display_errors', 1);

class ReviewController extends Controller
{

    public function __construct() {
        $this->_model = $this->model("Review");
    }

    public function index(): void
    {
        Request::method("GET", function () {

            $result = $this->_model->getAllReviews();

            Response::success(200, $result);
        });
    }

    public function store()
    {
        Request::method("POST", function () {
            $name = $_POST["review-name"];
            $email = $_POST["review-email"];
            $comments = $_POST["review-comments"];

            try {
                $result = $this->_model->storeReview($name, $email, $comments);

                Response::success(201, $result);
            } catch (Exception $exception) {
                Response::failed(500, $exception);
            }
        });
    }
}
