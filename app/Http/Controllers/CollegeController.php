<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\Course;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
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

    public function collegeDetail($id){
        $college = College::find($id);
        $course = $college->courses;
        $photos = Photo::where('college_id', $id)->get();

        // Transform the photos into an array of objects with a filename property
        $photosArray = $photos->map(function ($photo) {
            return [
                'filename' => $photo->filename,
            ];
        })->toArray();

        
        if($college){
             return response()->json([
                'status'=>200,
                'college'=>$college,
                'course'=>$course,
                'image'=>$photosArray,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No user found'
            ]);
        }

    }
    public function collegeUpdate(Request $request,$id){
        $college = College::find($id);
        if($college){
            $college->name = $request->input('name');
            $college->email = $request->input('email');
            $college->established_year = $request->input('established_year');
            $college->location = $request->input('location');
            $college->description = $request->input('description');
            $college->number = $request->input('number');
            if($request->hasFile('image')){
                    $path = $college->image;
                    if(File::exists($path)){
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time().'.'.$extension;
                    $file->move('uploads/college-profile/',$filename);
                    $college->image = 'uploads/college-profile/'.$filename;
                }
        }
            $college ->save();
            $collegeId = $college->id;

        $courseData = $request->input('course');
        $photosData = $request->file('photos');

    // Store the course data
    foreach ($courseData as $course) {
        if (isset($course['id'])) {
            $courseId = $course['id'];
            $existingCourse = Course::where('college_id', $collegeId)->where('id', $courseId)->first();
            if ($existingCourse) {
                $existingCourse->title = $course['title'];
                $existingCourse->module_description = $course['description'];
                $existingCourse->duration_in_months = $course['timePeriod'];
                $existingCourse->modules = $course['module'];
                $existingCourse->career = $course['career'];
                $existingCourse->save();
            }
        }
    }

    // Store the photos data
     foreach ($photosData as $photo) {
    $photoName = $photo->getClientOriginalName();
    $existingPhoto = Photo::where('filename', $photoName)->where('college_id', $collegeId)->first();

    if ($existingPhoto) {
        // Update the photo details
        $existingPhoto->description = $request->input("photo_desc_{$existingPhoto->id}");
        $existingPhoto->save();
    } else {
        // Create a new photo entry
        $newPhoto = new Photo;
        $newPhoto->college_id = $collegeId;
        $newPhoto->filename = $photoName;
        $newPhoto->save();
    }
}

    return response()->json([
        'status'=>200,
        'message' => 'Data stored successfully!']);

    
    }
    public function collegeDelete($id){
        $college = College::find($id);

        // Delete all photos related to the college
        $photos = Photo::where('college_id',$id)->get();
        if($photos){
            foreach ($photos as $photo) {
                Storage::delete($photo->filename);
                $photo->delete();
            }
        }
        

        // Delete all courses related to the college
        $courses = $college->courses;
        if($courses){
            foreach ($courses as $course) {
                $course->delete();
            }
        }

        // Delete the college
        $college->delete();  
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
