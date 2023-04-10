<?php

namespace App\Http\Controllers;

use App\Models\college;
use Illuminate\Http\Request;

class CollegeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
        'college_name' => 'required|string|max:255',
        'established' => 'required|date',
        'location' => 'required|string|max:255',
        'description' => 'required|string',
        'courses' => 'required|array',
        'courses.*.title' => 'required|string|max:255',
        'courses.*.description' => 'required|string',
        'courses.*.time_period' => 'required|string|max:255',
        'courses.*.subject' => 'required|string|max:255',
        'courses.*.career' => 'required|string|max:255',
        'photos' => 'nullable|array',
        'photos.*' => 'nullable|image|max:2048',
        'email' => 'required|email',
        'phone_number' => 'required|string|max:255',
    ]);
     // Store the college data in the database
    $college = new College;
    $college->college_name = $request->input('college_name');
    $college->established = $request->input('established');
    $college->location = $request->input('location');
    $college->description = $request->input('description');
    $college->email = $request->input('email');
    $college->phone_number = $request->input('phone_number');
    $college->save();

    // Store the courses data in the database
    foreach ($request->input('courses') as $course_data) {
        $course = new Course;
        $course->title = $course_data['title'];
        $course->description = $course_data['description'];
        $course->time_period = $course_data['time_period'];
        $course->subject = $course_data['subject'];
        $course->career = $course_data['career'];
        $college->courses()->save($course);
    }
     // Store the photos in the storage and database
    if ($request->hasFile('photos')) {
        foreach ($request->file('photos') as $photo) {
            $path = $photo->store('public/photos');
            $photo = new Photo;
            $photo->path = $path;
            $college->photos()->save($photo);
        }
    }

    // Return a response
    return response()->json(['message' => 'College data stored successfully.','status'=>200]);

    }

    /**
     * Display the specified resource.
     */
    public function show(college $college)
    {
        $data = $college->get();
        return(['college'=>$data]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(college $college)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, college $college)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(college $college)
    {
        //
    }
}
