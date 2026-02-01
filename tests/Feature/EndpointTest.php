<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Testing\Fluent\AssertableJson;

test('Check categories', function () {
    $response = $this->get('/api/categories');

    $response->assertStatus(200);
});

test('Check login', function() {
    $credentials = [
        "email" => "testemail@tpc.ru",
        "name" => "test user",
        "password" => "test passw"
    ];
    $user = User::create($credentials);

    $response = $this->postJson("/api/login", $credentials);
    $response->assertStatus(200)
        ->assertJson(fn (AssertableJson $json) =>
            $json->has('user')
                ->has('access_token')
                ->etc()
        );
});

test('Check login with wrong password', function () {
    $user = User::factory()->create([
        'email' => 'testemail@tpc.ru',
        "name" => "test user",
        'password' => 'correct password',
    ]);

    $credentials = [
        'email' => 'testemail@tpc.ru',
        'password' => 'wrong password',
    ];

    $response = $this->postJson('/api/login', $credentials);

    $response->assertStatus(422)
             ->assertJson([
                 'message' => 'Неверные учетные данные.',
             ]);
});


test('products list', function() {
    Product::factory(5)->create();
    $response = $this->getJson("/api/products");
    $response->assertOk()
        ->assertJsonCount(5, 'data')
        ->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'price', 'description']
            ]
        ]);
});

test('check product filter', function() {
    $cat = Category::create([
        "name" => "test_cat_1",
        "description" => "",
    ]);
    Product::factory(2, ["category_id" => $cat->id])->create();
    $response = $this->getJson("/api/products?category_id={$cat->id}");
    $response->assertOk()
        ->assertJsonCount(2, 'data');
}); 
