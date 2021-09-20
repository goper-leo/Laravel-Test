<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CalculationHistory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'first_addend',
        'second_addend',
        'sum',
    ];

    /**
     * Get the sum.
     *
     * @return float
     */
    public function getSumAttribute()
    {
        return $this->first_addend + $this->second_addend;
    }
}
