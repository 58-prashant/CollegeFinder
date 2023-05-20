<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\College;
use App\Models\User;

class Question extends Model
{
     protected $fillable = [
        'college_id',
        'user_id',
        'question',
        'answer',
    ];

    public function college()
    {
        return $this->belongsTo(College::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    use HasFactory;
}
