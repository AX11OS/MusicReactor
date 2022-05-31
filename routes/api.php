<?php

use App\Http\Controllers\PassportAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArtistaController;
use App\Http\Controllers\AlbumController;



Route::post('register', [PassportAuthController::class, 'register']);
Route::post('login', [PassportAuthController::class, 'login']);
//Resources y controladores con CRUD simple
Route::resource('artistas', ArtistaController::class);
Route::resource('albums', AlbumController::class);

//Consultas específicas
Route::get('albumartista',[AlbumController::class, 'albumartista']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

