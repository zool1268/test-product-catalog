<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Config;

class ConfigController extends Controller
{
    public function index() {
        return response()->json([
            "name" => Config::get("app.name"),
            "url" => Config::get("app.url"),
        ]);
    }
}
