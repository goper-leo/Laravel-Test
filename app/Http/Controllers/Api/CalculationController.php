<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\CalculationHistory;
use App\Http\Controllers\Controller;
use App\Http\Requests\CalculationRequest;

class CalculationController extends Controller
{
    /**
     * Display listing of resource
     *
     * @return Category
     */
    public function index()
    {
        return CalculationHistory::latest()->get();
    }

    /**
     * Calculate
     *
     * @param CalculationRequest $request
     * @return void
     */
    public function store(CalculationRequest $request)
    {
        return CalculationHistory::create([
            'first_addend' => $request->first_addend,
            'second_addend' => $request->second_addend,
            'sum' => $request->first_addend + $request->second_addend,
        ]);
    }
}
