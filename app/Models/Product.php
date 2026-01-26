<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $table = 'product';

    protected $fillable = [
        'name',
        'description',
        'price',
        'category_id'
    ];


    protected $casts = [
        'price' => 'decimal:2',
        'category_id' => 'integer'
    ];

     protected $appends = [
        'formatted_price',
        'short_description'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getFormattedPriceAttribute(): string
    {
        return number_format($this->price, 2, ',', ' ') . ' ₽';
    }

    public function getShortDescriptionAttribute(): string
    {
        return str($this->description)->limit(150);
    }
}
