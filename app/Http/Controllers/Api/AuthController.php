<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\File; 


class AuthController extends Controller
{
    public function register(Request $request) 
    {
       $validator = Validator::make($request->all(),[
        'name'=>'required',
        'email'=>'required|email|max:191|unique:users,email',
        'password' => [
                        'required',
                        'min:8',
                        'regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/'
                        ],
        'address'=>'required',
       ]);
       if ($validator->fails()){
        return response()->json([
            'validation_errors'=>$validator->messages(),
        ]);
       }else{
        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'address'=>$request->address,
            'status' => 0,
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

            $user = User::where('email',$request->email)->first();
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

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            "status"=>200,
            "message"=>'Logged out Successfully',
        ]);

    }

    public function user(Request $request){
         $user = User::where('email',$request->email)->first();
        
        return(['user'=>$user]);
    }
    public function editUser($id){
        $data = User::find($id);
        if($data){
            return response()->json([
                'status'=>200,
                'data'=>$data,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No user found'
            ]);
        }
        
    }
    public function updateUser(Request $request, $id){
        $validator = Validator::make($request ->all(),
        [
            'name'=>'required',
            'address'=>'required',
            'dob' =>'required',
         ]);
        
         if($validator->fails()){
            return response()->json([
                'status'=>422,
                'error'=>$validator->messages(),
            ]);
         }
         else{
            $user = User::find($id);
            if($user){
                $user->name = $request->input('name');
                $user->dob = $request->input('dob');
                $user->address = $request->input('address');
                if($request->hasFile('image')){
                    $path = $user->profile_path;
                    if(File::exists($path)){
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time().'.'.$extension;
                    $file->move('uploads/user-profile/',$filename);
                    $user->profile_path = 'uploads/user-profile/'.$filename;
                }
                $user ->update();
                return response()->json([
                    'status'=>200,
                    'message'=>'Updated',
                ]);

            }else{
                return response()->json([
                     'status'=>404,
                'message'=>'User Not found',
                ]);
               
            }
         }
    }
    
    public function verification(){
        $code = rand(1000,9999);
        return response()->json([
            'code'=>$code
        ]);
    }

    public function view(){
        $users = User::all();
        if($users){
            return response()->json([
                'status'=>200,
                'users'=>$users,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'User not found',
            ]);
        }
    }

    public function createUser(Request $request){
        $validator = Validator::make($request->all(),[
        'name'=>'required',
        'email'=>'required|email|max:191|unique:users,email',
        'password' => [
                        'required',
                        'min:8',
                        'regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/'
                        ],
        'address'=>'required',
        'image'=>'required',
        'dob'=>'required',
        'status'=>'required',
       ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'error'=>$validator->messages(),
            ]);
         }
         else{
            $user = new User;
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->status = $request->input('status');
            $user->dob = $request->input('dob');
            $user->address = $request->input('address');
            if($request->hasFile('image')){
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file->move('uploads/user-profile/',$filename);
                $user->profile_path = 'uploads/user-profile/'.$filename;
                $user ->save();
            return response()->json([
                'status'=>200,
                'message'=>'Created',
            ]);
            }else{
                return "Images not found";
            }
                
         }
    }
    
    public function view_user($id){
        $user = User::find($id);
        if ($user){
            return response()->json([
                'status'=>200,
                'user'=>$user,
            ]);
        }else{
             return response()->json([
                'status'=>404,
                'message'=>'User not found',
            ]);
        }
    }
    function delete_user($id){
        $result = User::where('id',$id)->delete();
        if($result){
            return response()->json([
                'status'=>200,
                "message"=>"User has been deleted"
            ]);
        }else{
            return response()->json([
                "message"=>"User not found"
            ]);
        }
   }
    
}
