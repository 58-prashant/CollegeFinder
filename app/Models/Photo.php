<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\College;

class Photo extends Model
{
    protected  $fillable = ['filename'];
    public function college(){
        return $this->belongsTo(College::class);
    }
    
    use HasFactory;
}
