<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;


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

    public function verification(){
        $code = rand(1000,9999);
        return response()->json([
            'code'=>$code
        ]);
    }
    
}
