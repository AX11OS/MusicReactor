<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\GenderController;
use App\Http\Controllers\GenrerController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\InvoicelineController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MediatypeController;
use App\Http\Controllers\MusicianController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\PlaylisttrackController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\TracklogController;
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


Route::get('/album/index',[AlbumController::class, 'index'])->name('album.index');
Route::get('/artist/index',[ArtistController::class, 'index'])->name('artist.index');
Route::get('/genrer/index',[GenrerController::class, 'index'])->name('genrer.index');
Route::get('/invoice/index',[InvoiceController::class, 'index'])->name('invoice.index');
Route::get('/invoiceline/index',[InvoicelineController::class, 'index'])->name('invoiceline.index');
Route::get('/mediatype/index',[MediatypeController::class, 'index'])->name('mediatype.index');
Route::get('/playlist/index',[PlaylistController::class, 'index'])->name('playlist.index');
Route::get('/playlisttrack/index',[PlaylisttrackController::class, 'index'])->name('playlisttrack.index');
Route::get('/track/index',[TrackController::class, 'index'])->name('track.index');
Route::get('/tracklog/index',[TracklogController::class, 'index'])->name('tracklog.index');
Route::get('/user/index',[UserController::class, 'index'])->name('user.index');


Route::get('/album/create',[AlbumController::class, 'create'])->name('album.create');
Route::get('/artist/create',[ArtistController::class, 'create'])->name('artist.create');
Route::get('/genrer/create',[GenrerController::class, 'create'])->name('genrer.create');
Route::get('/invoice/create',[InvoiceController::class, 'create'])->name('invoice.create');
Route::get('/invoiceline/create',[InvoicelineController::class, 'create'])->name('invoiceline.create');
Route::get('/mediatype/create',[MediatypeController::class, 'create'])->name('mediatype.create');
Route::get('/playlist/create',[PlaylistController::class, 'create'])->name('playlist.create');
Route::get('/playlisttrack/create',[PlaylisttrackController::class, 'create'])->name('playlisttrack.create');
Route::get('/track/create',[TrackController::class, 'create'])->name('track.create');
Route::get('/tracklog/create',[TracklogController::class, 'create'])->name('tracklog.create');
Route::get('/user/create',[UserController::class, 'create'])->name('user.create');


Route::post('/album/store',[AlbumController::class, 'store'])->name('album.store');
Route::post('/artist/store',[ArtistController::class, 'store'])->name('artist.store');
Route::post('/genrer/store',[GenrerController::class, 'store'])->name('genrer.store');
Route::post('/invoice/store',[InvoiceController::class, 'store'])->name('invoice.store');
Route::post('/invoiceline/store',[InvoicelineController::class, 'store'])->name('invoiceline.store');
Route::post('/mediatype/store',[MediatypeController::class, 'store'])->name('mediatype.store');
Route::post('/playlist/store',[PlaylistController::class, 'store'])->name('playlist.store');
Route::post('/playlisttrack/store',[PlaylisttrackController::class, 'store'])->name('playlisttrack.store');
Route::post('/track/store',[TrackController::class, 'store'])->name('track.store');
Route::post('/tracklog/store',[TracklogController::class, 'store'])->name('tracklog.store');
Route::post('/user/store',[UserController::class, 'store'])->name('user.store');


Route::get('/album/show/{album}',[AlbumController::class, 'show'])->name('album.show');
Route::get('/artist/show/{artist}',[ArtistController::class, 'show'])->name('artist.show');
Route::get('/genrer/show/{genrer}',[GenrerController::class, 'show'])->name('genrer.show');
Route::get('/invoice/show/{invoice}',[InvoiceController::class, 'show'])->name('invoice.show');
Route::get('/invoiceline/show/{invoiceline}',[InvoicelineController::class, 'show'])->name('invoiceline.show');
Route::get('/mediatype/show/{mediatype}',[MediatypeController::class, 'show'])->name('mediatype.show');
Route::get('/playlist/show/{playlist}',[PlaylistController::class, 'show'])->name('playlist.show');
Route::get('/playlisttrack/show/{playlisttrack}',[PlaylisttrackController::class, 'show'])->name('playlisttrack.show');
Route::get('/track/show/{track}',[TrackController::class, 'show'])->name('track.show');
Route::get('/tracklog/show/{tracklog}',[TracklogController::class, 'show'])->name('tracklog.show');
Route::get('/user/show/{user}',[UserController::class, 'show'])->name('user.show');


Route::get('/album/{album}/edit',[AlbumController::class, 'edit'])->name('album.edit');
Route::get('/artist/{artist}/edit',[ArtistController::class, 'edit'])->name('artist.edit');
Route::get('/genrer/{genrer}/edit',[GenrerController::class, 'edit'])->name('genrer.edit');
Route::get('/invoice/{invoice}/edit',[InvoiceController::class, 'edit'])->name('invoice.edit');
Route::get('/invoiceline/{invoiceline}/edit',[InvoicelineController::class, 'edit'])->name('invoiceline.edit');
Route::get('/mediatype/{mediatype}/edit',[MediatypeController::class, 'edit'])->name('mediatype.edit');
Route::get('/playlist/{playlist}/edit',[PlaylistController::class, 'edit'])->name('playlist.edit');
Route::get('/playlisttrack/{playlisttrack}/edit',[PlaylisttrackController::class, 'edit'])->name('playlisttrack.edit');
Route::get('/track/{track}/edit',[TrackController::class, 'edit'])->name('track.edit');
Route::get('/tracklog/{tracklog}/edit',[TracklogController::class, 'edit'])->name('tracklog.edit');
Route::get('/user/{user}/edit',[UserController::class, 'edit'])->name('user.edit');


Route::post('/album/update',[AlbumController::class, 'update'])->name('album.update');
Route::post('/artist/update',[ArtistController::class, 'update'])->name('artist.update');
Route::post('/genrer/update',[GenrerController::class, 'update'])->name('genrer.update');
Route::post('/invoice/update',[InvoiceController::class, 'update'])->name('invoice.update');
Route::post('/invoiceline/update',[InvoicelineController::class, 'update'])->name('invoiceline.update');
Route::post('/mediatype/update',[MediatypeController::class, 'update'])->name('mediatype.update');
Route::post('/playlist/update',[PlaylistController::class, 'update'])->name('playlist.update');
Route::post('/playlisttrack/update',[PlaylisttrackController::class, 'update'])->name('playlisttrack.update');
Route::post('/track/update',[TrackController::class, 'update'])->name('track.update');
Route::post('/tracklog/update',[TracklogController::class, 'update'])->name('tracklog.update');
Route::post('/user/update',[UserController::class, 'update'])->name('user.update');


Route::get('/album/destroy',[AlbumController::class, 'destroy'])->name('album.destroy');
Route::get('/artist/destroy',[ArtistController::class, 'destroy'])->name('artist.destroy');
Route::get('/genrer/destroy',[GenrerController::class, 'destroy'])->name('genrer.destroy');
Route::get('/invoice/destroy',[InvoiceController::class, 'destroy'])->name('invoice.destroy');
Route::get('/invoiceline/destroy',[InvoicelineController::class, 'destroy'])->name('invoiceline.destroy');
Route::get('/mediatype/destroy',[MediatypeController::class, 'destroy'])->name('mediatype.destroy');
Route::get('/playlist/destroy',[PlaylistController::class, 'destroy'])->name('playlist.destroy');
Route::get('/playlisttrack/destroy',[PlaylisttrackController::class, 'destroy'])->name('playlisttrack.destroy');
Route::get('/track/destroy',[TrackController::class, 'destroy'])->name('track.destroy');
Route::get('/tracklog/destroy',[TracklogController::class, 'destroy'])->name('tracklog.destroy');
Route::get('/user/destroy',[UserController::class, 'destroy'])->name('user.destroy');


