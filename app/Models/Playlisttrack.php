<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playlisttrack extends Model
{
    use HasFactory;
    protected $fillable = [
        'playlistId',
        'trackId',
    ];
}
