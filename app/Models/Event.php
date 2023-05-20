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

    public function isWithinApplicationTimeLimit()
    {
        $now = Carbon::now();
        $start = Carbon::parse($this->start_time);
        $end = Carbon::parse($this->end_time);

         // Debug statements
    Log::info('Current Time: ' . $now);
    Log::info('Event Start Time: ' . $start);
    Log::info('Event End Time: ' . $end);

         $isWithinLimit = $now->between($start,$end,true);
    
        // Debug statement
        Log::info('Is Within Application Time Limit: ' . ($isWithinLimit ? 'true' : 'false'));
        
        return $isWithinLimit;
       
    }
}
