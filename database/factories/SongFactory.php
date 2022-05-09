<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SongFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'songName'=> $this->faker->sentence(),
            'musicianId'=> $this->faker->numberBetween(1,50),
            'albumId'=> $this->faker->numberBetween(1,15),
            'genderId'=> $this->faker->numberBetween(1,10),
            'dateRelease'=> $this->faker->date(),
        ];
    }
}
