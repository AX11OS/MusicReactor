<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoiceline extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoiceId',
        'trackId',
        'unitPrice',
        'quantity',
    ];
}
