<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MusicianFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'musicianName'=> $this->faker->firstName(),
            'middleName'=> $this->faker->firstName(),
            'lastName'=> $this->faker->lastName(),
        ];
    }
}
