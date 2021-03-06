<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuoteController;
use App\Http\Resources\quoteResource;
use App\Models\quote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('random-quotes', function () {
    return quoteResource::collection(quote::inRandomOrder()->limit(7)->get());
});

Route::group([
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, "login"]);
    Route::post('register', [AuthController::class, "register"]);
    Route::post('logout', [AuthController::class, "logout"]);
    Route::post('me', [AuthController::class, "me"]);
});
Route::apiResource('quote', QuoteController::class);
