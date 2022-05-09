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

    protected $fillable = [
        'songName',
        'misicianId',
        'albumId',
        'genderId',
    ];

    protected $casts = [
        'dateRelease' => 'datetime',
    ];

}
