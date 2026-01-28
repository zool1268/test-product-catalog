<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
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
        if ($request->get('search') && strlen($request->get('search')) > 2) {
            $query->whereAny(['name', 'description'], 'ilike', "%{$request->get('search')}%");
        }
        $products = $query->paginate(10);
        sleep(1); // @todo remove this @debug
        return new ProductCollection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'description' => 'sometimes|string',
            'price' => 'required|numeric|gt:0',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product = Product::create($validated);
        return response(new ProductResource($product->load('category')), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product->load('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|min:3|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'category_id' => 'sometimes|exists:categories,id',
        ]);

        $product->update($validated);

        return new ProductResource($product->load('category'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Товар успешно удален']);
    }
}
