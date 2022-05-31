<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

<<<<<<<< HEAD:database/migrations/2022_05_06_014521_create_genrers_table.php
class CreateGenrersTable extends Migration
========
class CreateGenresTable extends Migration
>>>>>>>> 225e5938e50158a0973e578391cddbc46956f68b:database/migrations/2022_05_06_014521_create_genres_table.php
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
<<<<<<<< HEAD:database/migrations/2022_05_06_014521_create_genrers_table.php
        Schema::create('genrers', function (Blueprint $table) {
========
        Schema::create('genres', function (Blueprint $table) {
>>>>>>>> 225e5938e50158a0973e578391cddbc46956f68b:database/migrations/2022_05_06_014521_create_genres_table.php
            $table->id();
            $table->string('Name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
<<<<<<<< HEAD:database/migrations/2022_05_06_014521_create_genrers_table.php
        Schema::dropIfExists('genrers');
========
        Schema::dropIfExists('genres');
>>>>>>>> 225e5938e50158a0973e578391cddbc46956f68b:database/migrations/2022_05_06_014521_create_genres_table.php
    }
}
