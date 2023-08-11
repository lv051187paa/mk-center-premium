<?php

class Response
{
    public static function success(int $status, mixed $data): void
    {
        header("Content-type: application/json");
        http_response_code($status ?? 200);

        echo json_encode([
            "success" => true,
            "data" => $data
        ]);
    }

    public static function failed(int $status, string $message = "Oops. Something wrong"): void
    {
        header("Content-type: application/json");
        http_response_code($status || 500);

        echo json_encode([
            "success" => false,
            "message" => $message
        ]);
    }
}
