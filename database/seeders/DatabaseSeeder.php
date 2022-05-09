<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Gender;
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
        // \App\Models\User::factory(10)->create();
        Gender::factory(10)->create();
        Musician::factory(50)->create();
        Album::factory(15)->create();
        Song::factory(50)->create();
    }
}
