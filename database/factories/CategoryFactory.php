<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $locale = 'ru_RU';
        return [
            "name" => fake($locale)->word(2, true),
            "description" => fake()->realText(),
            "created_at" => now(),
            "updated_at" => now(),
        ];
    }
}
