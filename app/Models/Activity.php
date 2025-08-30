<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'description',
        'start_time',
        'end_time',
        'location_address',
        'evidence',
        'status',
        'approved_by',
        'approved_at',
        'rejection_reason'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'approved_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the activity.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category of the activity.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the user who approved the activity.
     */
    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
