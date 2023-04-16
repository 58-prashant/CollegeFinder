<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\College;

class Course extends Model
{
    protected $fillable = [
        'title',
        'modules',
        'module_description',
        'duration_in_months',
        'career',
    ];
    public function college(){
        return $this->belongsTo(College::class);
    }
    use HasFactory;
}
