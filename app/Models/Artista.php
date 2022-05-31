<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\Model;

class Artista extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    public $timestamps = false;
    public $table = "artistas";
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'nombre',
        'pais',
        'descripcion',
        'banda',
        'logo',
    ];


}
