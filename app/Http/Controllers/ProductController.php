<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\ProductCollection;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): ResourceCollection
    {
        $query = Product::with('category');
        if ($request->get('category_id')) {
            $query->where('category_id', $request->get('category_id'));
        }
        $products = $query->paginate(10);
        sleep(2); // @todo remove this @debug
        return new ProductCollection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
