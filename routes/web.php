<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\GenderController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MusicianController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', WelcomeController::class);

Route::get('/admin', function () {
    return view('admin');
});

Route::get('/user', function () {
    return view('user');
});

Route::prefix('auth')->group(function () {
    Route::get('login',[LoginController::class, 'login'])->name('login.index');
    Route::get('register',[LoginController::class, 'register'])->name('register.index');
});

Route::get('/album',[AlbumController::class, 'index'])->name('album.index');
Route::get('/gender',[GenderController::class, 'index'])->name('gender.index');
Route::get('/musician',[MusicianController::class, 'index'])->name('musician.index');
Route::get('/song',[SongController::class, 'index'])->name('song.index');
Route::get('/user',[UserController::class, 'index'])->name('user.index');