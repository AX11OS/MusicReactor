<?php

use App\Http\Controllers\PassportAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArtistaController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\GenderController;
use App\Http\Controllers\SongsController;
use App\Http\Controllers\PlaylistController;

Route::post('register', [PassportAuthController::class, 'register']);
Route::post('login', [PassportAuthController::class, 'login']);
//Resources y controladores con CRUD simple
Route::resource('artistas', ArtistaController::class);
Route::resource('albums', AlbumController::class);
Route::resource('genders', GenderController::class);
Route::resource('songs', SongsController::class);
Route::resource('playlists', PlaylistController::class);
//Consultas específicas
Route::get('albumartista',[AlbumController::class, 'albumartista']);
Route::get('allofsongs',[SongsController::class, 'allofsongs']);
Route::get('loadalbum/{id}',[AlbumController::class, 'loadalbum']);
Route::get('loadsong/{id}',[SongsController::class, 'loadsong']);
Route::get('userplay/{id}',[PlaylistController::class, 'userplay']);
Route::get('addfavorite/{id}',[PlaylistController::class, 'addfavorite']);
Route::get('loadfromartist/{id}',[SongsController::class, 'loadfromartist']);
Route::get('loadalbums/{id}',[AlbumController::class, 'loadalbums']);
Route::get('searchsongs/{id}',[SongsController::class, 'searchsongs']);
Route::get('searchartists/{id}',[ArtistaController::class, 'searchartists']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

