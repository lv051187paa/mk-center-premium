<?php

class Review
{
    public function __construct()
    {
        $this->_db = Database::instance();
    }

    public function getAllReviews()
    {
        $result = $this->_db->query("SELECT * FROM reviews");

        return $result->results();
    }

    public function storeReview($name, $email, $comments)
    {
        $comment_with_slashes = addslashes($comments);
        $query = "INSERT INTO `reviews` (`name`, `review_text`, `email`) VALUES ('$name', '$comment_with_slashes', '$email')";

        $this->_db->query($query);

        return $this->getAllReviews();
    }
}
