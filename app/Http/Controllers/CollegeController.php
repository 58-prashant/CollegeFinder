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

    //COLLEGE LOGIN
    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email'=>'required|max:191|email',
            'password' => 'required',
        ]);
        if($validator->fails()){
          return response()->json([
            'validation_errors'=>$validator->messages(),
        ]);  
        }else{

            $user = College::where('email',$request->email)->first();
            if(! $user || ! Hash::check($request->password,$user->password)){
                return response()->json([
                    'status'=>401,
                    'message'=>'Invalid Credentials',
                ]);
            }
            else{
                 $token = $user->createToken($user->email.'_Token')->plainTextToken;
                return response()->json([
                    'status'=>200,
                    'username'=>$user->name,
                    'token'=>$token,
                     'account'=>$user->status,
                     'email'=>$user->email,
                    'message'=>'Logged In successfully!'
                ]);
            }
        }
    }

    //COLLEG REGISTER
    public function register(Request $request) 
    {
       $validator = Validator::make($request->all(),[
        'name'=>'required|unique:colleges,name',
        'email'=>'required|email|max:191|unique:colleges,email',
        'password' => [
                        'required',
                        'min:8',
                        'regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/'
                        ],
        'location'=>'required',
       ]);
       if ($validator->fails()){
        return response()->json([
            'validation_errors'=>$validator->messages(),
        ]);
       }else{
        $user = College::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'location'=>$request->location,
            'status' => 2,
        ]);
         $token = $user->createToken($user->email.'_Token')->plainTextToken;
         return response()->json([
            'status'=>200,
            'username'=>$user->name,
            'token'=>$token,
             'account'=>$user->status,
             'email'=>$user->email,
            'message'=>'Registered successfully!'
        ]);
       }

        
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
        $college->status = 2;
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
if($photosData){     
        // Store the photos data
        foreach ($photosData as $photo) {
            $newPhoto = new Photo();
            $fname= $photo->getClientOriginalExtension();
            $photo->move('uploads/college-photo/',$fname);
            $newPhoto->filename = 'uploads/college-photo/'.$fname;
            $newPhoto->college_id = $collegeId;
            $newPhoto->save();
        }
     }

    return response()->json([
        'status'=>200,
        'message' => 'Data stored successfully!']);

    }

    //COLLEGE LOGOUT
    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            "status"=>200,
            "message"=>'Logged out Successfully',
        ]);

    }

    //SHOW COLLEGE DETAIL
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

    //UPDATE COLLEGE DETAILS
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
        }else{
        $newCourse = new Course();
        $newCourse->college_id = $collegeId;
        $newCourse->title = $course['title'];
        $newCourse->module_description = $course['description'];
        $newCourse->duration_in_months = $course['timePeriod'];
        $newCourse->modules = $course['module'];
        $newCourse->career = $course['career'];
        $newCourse->save();
    
        }
    }
if($photosData){     
        // Store the photos data
        foreach ($photosData as $photo){
        $photoName = $photo->getClientOriginalName();
        $photo->move('uploads/college-photo/',$photoName);
        
        $existingPhoto = Photo::where('filename', $photoName)->where('college_id', $collegeId)->first(); {
            if ($existingPhoto) {
                // Update the photo details
                $existingPhoto->filename = 'uploads/college-photo/'.$photoName;
                // $request->input("photo_desc_{$existingPhoto->id}");
                $existingPhoto->save();
            } else {
            // Create a new photo entry
                $newPhoto = new Photo;
                $newPhoto->filename = 'uploads/college-photo/'.$photoName;
                $newPhoto->college_id = $collegeId;
                $newPhoto->save();
            }
           
        }
     }
    
    }
    return response()->json([
        'status'=>200,
        'message' => 'Data stored successfully!']);

    
    }

    //DELETE COLLEGE
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
