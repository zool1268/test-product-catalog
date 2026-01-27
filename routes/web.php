<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('index');
})->name('home');

Route::get('/login', function () {
    return Inertia::render('login');
})->name('login');

Route::get("/test", function () {
    return Inertia::render("test", ["var1" => "v1", "var2" => "v2"]);
}); //@todo: remove this

route::get("/product/{id}", function($id) {
    return Inertia::render("product", ['id' => $id]);
})->name('product.show');

Route::middleware('auth:sanctum')->group(function () {
    Route::get("admin/products", function () {
        return Inertia::render("admin/products");
    });
});
