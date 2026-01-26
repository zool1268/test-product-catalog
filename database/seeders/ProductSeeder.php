<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Product::all()->count() < 100) {
                Category::factory(10)
                    ->hasProducts(20)
                    ->create();
        } else {
            $this->command->info('уже >= 200 продуктов');
        }
    }
}
