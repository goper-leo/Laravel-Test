<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    /**
     * Display listing of resource
     *
     * @param Request $request
     * @return void
     */
    public function index(Request $request)
    {
        return ProductResource::collection(Product::when($request->filled('available'), function ($query) use ($request) {
                if ($request->available != 'all')
                    $query->where('available', $request->available);
            })->when($request->filled('category'), function ($query) use ($request) {
                $query->whereIn('category_id', [$request->category]);
            })->when($request->filled('price'), function ($query) use ($request) {
                if (Str::contains($request->price, '-')) {
                    $price = explode('-', $request->price);
                    $minPrice = $price[0];
                    $maxPrice = $price[1];
                    if ($minPrice == '')
                        $minPrice = 0;
                    $query->whereBetween('price', [$minPrice, $maxPrice]);
                } else {
                    // Query just minimum price only! 
                    $query->where('price', '>=', $request->price);
                }
            })->paginate(20)
        );
    }
}
