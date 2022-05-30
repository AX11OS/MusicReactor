<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rules\Exists;

class MakeForeignKeysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /* Schema::table('songs', function (Blueprint $table) {
            $table->foreign('musicianId')->references('id')->on('musicians');
            $table->foreign('albumId')->references('id')->on('albums');
            $table->foreign('genderId')->references('id')->on('genders');
        }); */

        Schema::table('tracks', function (Blueprint $table) {
            $table->foreign('AlbumId')->references('id')->on('albums');
            $table->foreign('MediatypeId')->references('id')->on('mediatypes');
            $table->foreign('GenreId')->references('id')->on('genres');
        });

        //Esta tabla es de m:m
        Schema::table('playlisttracks', function (Blueprint $table) {
            $table->foreign('PlaylistId')->references('id')->on('playlists');
            $table->foreign('TrackId')->references('id')->on('tracks');
        });

        Schema::table('tracklogs', function (Blueprint $table) {
            $table->foreign('AlbumId')->references('id')->on('albums');
            $table->foreign('GenreId')->references('id')->on('genres');
            $table->foreign('MediatypeId')->references('id')->on('mediatypes');
        });

        Schema::table('invoicelines', function (Blueprint $table) {
            $table->foreign('InvoiceId')->references('id')->on('invoices');
            $table->foreign('TrackId')->references('id')->on('tracks');
        });

        Schema::table('albums', function (Blueprint $table) {
            $table->foreign('ArtistId')->references('id')->on('artists');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /* Schema::table('songs', function (Blueprint $table) {
            $table->dropForeign(['musicianId']);
            $table->dropForeign(['albumId']);
            $table->dropForeign(['genderId']);
        }); */

        Schema::table('tracks', function (Blueprint $table) {
            $table->dropForeign(['AlbumId']);
            $table->dropForeign(['MediatypeId']);
            $table->dropForeign(['GenreId']);
        });
        
        //Esta tabla es de m:m
        Schema::table('playlisttracks', function (Blueprint $table) {
            $table->dropForeign(['PlaylistId']);
            $table->dropForeign(['TrackId']);
        });

        Schema::table('tracklogs', function (Blueprint $table) {
            $table->dropForeign(['AlbumId']);
            $table->dropForeign(['MediatypeId']);
            $table->dropForeign(['GenreId']);
        });

        Schema::table('invoicelines', function (Blueprint $table) {
            $table->dropForeign(['InvoiceId']);
            $table->dropForeign(['AlTrackIdbumId']);
        });

        /* Schema::table('invoices', function (Blueprint $table) {
            $table->dropForeign(['UserId']);
        }); */

        Schema::table('albums', function (Blueprint $table) {
            $table->dropForeign(['ArtistId']);
        });
    }
}
