<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    public $timestamps = false;
    public $table = "albums";
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'nombre',
        'cover',
        'anio',
        'id_banda'
    ];
}
