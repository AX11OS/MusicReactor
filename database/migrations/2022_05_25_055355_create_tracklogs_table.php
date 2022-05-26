<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTracklogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tracklogs', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->string('Name');
            $table->unsignedBigInteger('AlbumId');
            $table->unsignedBigInteger('MediatypeId');
            $table->unsignedBigInteger('GenreId');
            $table->string('Composer');
            $table->unsignedBigInteger('Milliseconds');
            $table->unsignedBigInteger('Bytes');
            $table->double('UnitPrice');
            $table->date('dateLog');
            $table->string('logAction');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tracklogs');
    }
}
