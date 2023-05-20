<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CollegeController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\QuestionController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout',[AuthController::class,'logout']);
    Route::post('college-logout',[CollegeController::class,'logout']);
    Route::post('/questions', [QuestionController::class, 'store']);
    Route::put('/questions/{question}', [QuestionController::class, 'update']);
});

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::post('view-profile',[AuthController::class,'user']);
Route::get('user-edit/{id}',[AuthController::class,'editUser']);
Route::post('update-user/{id}',[AuthController::class,'updateUser']);
Route::get('verification',[AuthController::class,'verification']);
Route::get('home',[CollegeController::class,'show']);
Route::get('view-college/{id}',[CollegeController::class,'edit']);
Route::get('/search', [CollegeController::class,'search']);

Route::post('/events', [EventController::class, 'create']);
Route::delete('/events/{event}', [EventController::class, 'destroy']);

Route::post('bookmarks', [BookmarkController::class, 'createBookmark']);
Route::delete('bookmarks/{id}', [BookmarkController::class, 'deleteBookmark']);
Route::get('view-bookmarks/{id}', [BookmarkController::class, 'index']);
Route::get('bookmarks', [BookmarkController::class, 'getBookmarksByCollegeId']);

Route::get('/events', [EventController::class, 'index']);
Route::post('/events/{event}/apply', [EventController::class, 'apply']);



Route::get('/questions', [QuestionController::class, 'index']);

Route::get('view-user',[AuthController::class,'view']);
Route::post('create-user',[AuthController::class,'createUser']);
Route::get('user-profile/{id}',[AuthController::class,'view_user']);
Route::post('user-edit/{id}',[AuthController::class,'userEdit']);
Route::delete('delete-user/{id}',[AuthController::class,'delete_user']);
Route::post('create-college',[CollegeController::class,'create']);
Route::get('college-detail/{id}',[CollegeController::class,'collegeDetail']);
Route::post('college-update/{id}',[CollegeController::class,'collegeUpdate']);
Route::delete('college-delete/{id}',[CollegeController::class,'collegeDelete']);

Route::post('college-login',[CollegeController::class,'login']);
Route::post('college-register',[CollegeController::class,'register']);
