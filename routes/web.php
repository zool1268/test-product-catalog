<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('index');
})->name('home');

Route::get("/test", function () {
    return Inertia::render("test", ["var1" => "v1", "var2" => "v2"]);
});
