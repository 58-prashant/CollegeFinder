<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\College;
use App\Models\EventApplication;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'available_slots',
        'start_time',
        'end_time',
        'college_id',
    ];

    public function college()
    {
        return $this->belongsTo(College::class);
    }

    public function applications()
    {
        return $this->hasMany(EventApplication::class);
    }
}
