<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicelinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoicelines', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('InvoiceId');
            $table->unsignedBigInteger('TrackId');
            $table->double('UnitPrice');
            $table->integer('Quantity');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoicelines');
    }
}
