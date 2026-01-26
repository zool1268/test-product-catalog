<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\ProductSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        if (!User::where('email', 'user@tpc.ru')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'user@tpc.ru',
                'password' => Hash::make('user')
            ]);
        } else {
            $this->command->info('Тестовый пользователь уже существует');
        }

        $this->call([
            ProductSeeder::class
        ]);
    }
}
