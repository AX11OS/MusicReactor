<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    public $timestamps = false;
    public $table = "songs";
    protected $fillable = [
        'id',
        'name',
        'id_artist',
        'id_album',
        'id_gender',
        'song'
    ];

    protected $casts = [
        'dateRelease' => 'datetime',
    ];

}
