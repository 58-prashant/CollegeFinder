<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Course;
use App\Models\Photo;

class college extends Model
{
    protected $fillable =[
        'name',
        'image',
        'email',
        'password',
        'established_year',
        'location',
        'description',
        'number',
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function courses(){
        return $this->hasMany(Course::class);
    }
    public function image(){
        return $this-hasMany(Photo::class);
    }
    use HasFactory;
}
