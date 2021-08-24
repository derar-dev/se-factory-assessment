<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {

            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                $message = "Provided token is invalid";
                return $this->error_response_template($message, 401);
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                $message = "Provided token has expired";
                return $this->error_response_template($message, 401);
            } else {
                $message = "this action is unauthorized";
                return $this->error_response_template($message, 401);
            }
        }
        return $next($request);
    }

    private function error_response_template($message, $status_code)
    {
        $response = [];
        $response["success"] = false;
        $response["message"] = $message;

        return response()->json($response, $status_code);
    }
}
