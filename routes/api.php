<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TagController;

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

Route::controller(TaskController::class)->group(function () {
    Route::get('/tasks', 'index');
    Route::put('/tasks/{id}/update', 'update');
    Route::post('/tasks/add', 'store');
    Route::post('/tasks/selected_delete', 'selected_delete');
    Route::put('/tasks/{id}/toggle_tag', 'toggle_tag');
});

Route::controller(TagController::class)->group(function () {
    Route::get('/tags', 'index');
    Route::get('/tags/{id}/task_datas', 'task_datas');
    Route::delete('/tags/{id}/delete', 'delete_tag');
    Route::post('/tags/add', 'add_tag');
    Route::get('/tags/tag_task_lists', 'tag_task_lists');
    Route::get('/tags/count', 'tags_count');
});