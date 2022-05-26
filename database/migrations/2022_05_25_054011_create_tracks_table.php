<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTracksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tracks', function (Blueprint $table) {
            $table->id();
            $table->string('Name');
            $table->unsignedBigInteger('AlbumId');
            $table->unsignedBigInteger('MediatypeId');
            $table->unsignedBigInteger('GenreId');
            $table->string('Composer');
            $table->unsignedBigInteger('Milliseconds');
            $table->unsignedBigInteger('Bytes');
            $table->double('UnitPrice');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tracks', function (Blueprint $table) {
            $table->dropForeign(['AlbumId']);
            $table->dropForeign(['MediatypeId']);
            $table->dropForeign(['GenreId']);
        });
        Schema::dropIfExists('tracks');
    }
}
