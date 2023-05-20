<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\College;
use Carbon\Carbon;
use App\Models\User;
use App\Models\EventApplication;

class EventController extends Controller
{
    public function create(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'available_slots' => 'required|integer|min:1',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'college_id' => 'required|exists:colleges,id',
            
        ]);

        // Create a new event
        $event = Event::create($validatedData);
       

        return response()->json(['message' => 'Event created successfully'], 201);
    }

    public function apply(Request $request, Event $event)
    {
      
            // Check if there are available slots
            if ($event->available_slots <= 0) {
                return response()->json(['message' => 'No slots available'], 400);
            }

            // Get the current authenticated student
            $userId = $request->user_id;
            $student = User::find($userId);

            // Check if the student has already applied for the event
            if (!$student || $event->applications()->where('student_id', $userId)->exists()) {
                return response()->json(['message' => 'You have already applied for this event'], 400);
            }

            // Create a new event application and prefill the student details
            $applicationData = [
                'event_id' => $event->id,
                'student_id' => $userId,
                // Add more columns for additional student details if needed
            ];

            $eventApplication = EventApplication::create($applicationData);

            // Decrement the available slots
            $event->decrement('available_slots');

            return response()->json(['message' => 'Event application submitted successfully'], 201);
        }

        
     public function index(Request $request)
    {
        $collegeId = $request ->query('college_id');
       
        $events = Event::where('college_id',$collegeId)->get();

        return response()->json($events);
    }

    public function destroy(Event $event)
    {
        // Delete the associated event applications
        $event->applications()->delete();

        // Delete the event
        $event->delete();

        return response()->json(['message' => 'Event and related applications deleted successfully']);
    }
}
