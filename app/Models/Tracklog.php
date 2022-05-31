<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tracklog extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'albumId',
        'mediatype',
        'genreId',
        'composer',
        'milliseconds',
        'bytes',
        'unitPrice',
        'dateLog',
        'logAction',
    ];
}
