<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    /**
     * Display listing of resource
     *
     * @return Category
     */
    public function index()
    {
        return Category::all();
    }
}
