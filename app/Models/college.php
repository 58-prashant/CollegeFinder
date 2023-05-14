<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Course;
use App\Models\Photo;
use App\Models\Bookmark;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class College extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable =[
        'name',
        'image',
        'email',
        'password',
        'established_year',
        'location',
        'description',
        'number',
        'status',
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
        return $this->hasMany(Photo::class);
    }
    public function bookmarks(): HasMany
{
    return $this->hasMany(Bookmark::class);
}
    
}
