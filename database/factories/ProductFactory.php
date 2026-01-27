<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
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
            'name' => fake($locale)->words(3, true),
            'description' => fake($locale)->realText(2000, 5),
            'price' => fake()->randomFloat(2, 100, 10000),
            'category_id' => Category::factory(),
        ];
    }
}
