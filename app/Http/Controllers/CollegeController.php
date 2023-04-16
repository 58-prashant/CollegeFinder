<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\Course;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\File; 


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
    public function create(Request $request)
    {
        $college = new College();
        $college->name = $request->input('name');
        $college->email = $request->input('email');
        $college->password = Hash::make($request->input('password'));
        $college->established_year = $request->input('established_year');
        $college->location = $request->input('location');
        $college->description = $request->input('description');
        $college->number = $request->input('number');
        if($request->hasFile('image')){
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file->move('uploads/college-profile/',$filename);
                $college->image = 'uploads/college-profile/'.$filename;
                

            }
            $college ->save();
                $collegeId = $college->id;

        $courseData = $request->input('course');
    $photosData = $request->file('photos');

    // Store the course data
    foreach ($courseData as $course) {
        $newCourse = new Course();
        $newCourse->college_id = $collegeId;
        $newCourse->title = $course['title'];
        $newCourse->module_description = $course['description'];
        $newCourse->duration_in_months = $course['timePeriod'];
        $newCourse->modules = $course['module'];
        $newCourse->career = $course['career'];
        $newCourse->save();
    }

    // Store the photos data
    foreach ($photosData as $photo) {
        $newPhoto = new Photo();
        $newPhoto->college_id = $collegeId;
        $newPhoto->filename = $photo->store('photos');
        $newPhoto->save();
    }

    return response()->json([
        'status'=>200,
        'message' => 'Data stored successfully!']);

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
        if($data){
            return response()->json([
                'status'=>200,
                'college'=>$data,
            ]);
        }else{
        return response()-> json([
            'status'=>404,
            'message'=>'Data not found',
        ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data = college::find($id);
        if($data){
            return response()->json([
                'status'=>200,
                'college'=>$data,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Invalid Id',
            ]);
        }
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
