<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeForeignKeysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('songs', function (Blueprint $table) {
            $table->foreign('musicianId')->references('id')->on('musicians');
            $table->foreign('albumId')->references('id')->on('albums');
            $table->foreign('genderId')->references('id')->on('genders');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('songs', function (Blueprint $table) {
            $table->dropForeign(['musicianId']);
            $table->dropForeign(['albumId']);
            $table->dropForeign(['genderId']);
        });
    }
}
