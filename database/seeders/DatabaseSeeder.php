<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Genrer;
use App\Models\Musician;
use App\Models\Song;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        //Run seeder     php artisan db:seed


         \App\Models\User::factory(60)->create();
        /* Genrer::factory(10)->create();
        Musician::factory(50)->create();
        Album::factory(15)->create();
        Song::factory(50)->create(); */
    }
}
