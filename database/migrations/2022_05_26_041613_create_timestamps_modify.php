<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTimestampsModify extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
                //******************************************************************************//
        //Despues del llenado añadir los timestamps()


        Schema::table('tracks', function (Blueprint $table) {
            $table->timestamps();
        });

                //Esta tabla es de m:m
        Schema::table('playlisttracks', function (Blueprint $table) {
            $table->timestamps();
        });

        Schema::table('tracklogs', function (Blueprint $table) {
            $table->timestamps();
        });

        
        Schema::table('invoicelines', function (Blueprint $table) {
            $table->timestamps();
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('UserId');
        });

        Schema::table('albums', function (Blueprint $table) {
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->unsignedBigInteger('UserId')->nullable()->after('id');
            $table->foreign('UserId')->references('id')->on('users');
            $table->timestamps();
        });
    }
}
