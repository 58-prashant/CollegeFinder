<?php

namespace App\Http\Controllers;
use App\Models\Bookmark;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class BookmarkController extends Controller
{
    public function getBookmarksByCollegeId(Request $request)
{
        $collegeId = $request->query('college_id');
        $userId = $request->query('user_id');

        $bookmark = Bookmark::where('college_id', $collegeId)
                            ->where('user_id', $userId)
                            ->first();

        if ($bookmark) {
            return response()->json([
                'status' => 200,
                'message' => 'College is bookmarked',
                'bookmark' => $bookmark
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'College is not bookmarked'
            ]);
        }
    // try {
    //     $collegeId = $request->query('college_id');

    //     // Retrieve bookmarks by college_id
    //     $bookmarks = Bookmark::where('college_id', $collegeId)->get();

    //     return response()->json(['bookmarks' => $bookmarks], 200);
    // } catch (\Exception $e) {
    //     return response()->json(['message' => 'Internal server error'], 500);
    // }
}
    public function index($id)
    {
        // $userId = $request->query('user_id');
        $bookmarks = Bookmark::with('college')->where('user_id', $id)->get();

        return response()->json([
            'status' => 200,
            'bookmarks' => $bookmarks,
        ]);
    }
    
     public function createBookmark(Request $request)
    {
        //validate the request data
        $request->validate([
            'college_id'=>'required|integer',
            'user_id'=> 'required|integer',
        ]);

        //check if the college is bookmarked
        $existingBookmark = Bookmark::where('college_id',$request->college_id)
        ->where('user_id',$request->user_id)
        ->first();
        if($existingBookmark){
            return response()->json(['message'=>'College already bookmarked'],422);
        }
        // Create a new bookmark
        $bookmark = Bookmark::create([
            'college_id' => $request->college_id,
            'user_id' => $request->user_id,
        ]);
        return response()->json([
            'bookmark' => $bookmark,
            'status' => 200]);
    
    }
    

    public function deleteBookmark($id)
    {
        $bookmark = Bookmark::findOrFail($id);
        $bookmark->delete();

        return response()->json(['message' => 'College remove from bookmarks']);
    //    try {
    //     // Find the bookmark by ID
    //     $bookmark = Bookmark::find($id);

    //     if (!$bookmark) {
    //         return response()->json(['message' => 'Bookmark not found'], 404);
    //     }

    //     // Delete the bookmark
    //     $bookmark->delete();

    //     return response()->json(['message' => 'Bookmark deleted successfully'], 200);
    // } catch (\Exception $e) {
    //     return response()->json(['message' => 'Internal server error'], 500);
    // }
    }
}
