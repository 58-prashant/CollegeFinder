<?php

namespace App\Http\Controllers;
use App\Models\Bookmark;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class BookmarkController extends Controller
{
    public function getBookmarksByCollegeId(Request $request)
{
    try {
        $collegeId = $request->query('college_id');

        // Retrieve bookmarks by college_id
        $bookmarks = Bookmark::where('college_id', $collegeId)->get();

        return response()->json(['bookmarks' => $bookmarks], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Internal server error'], 500);
    }
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
    
     public function createBookmark($id)
    {
        // Check if the user is authenticated
    
        try{
        $collegeId = $id;
        $userId = $request->input('user_id');

         $existingBookmark = Bookmark::where('college_id', $collegeId)
            ->where('user_id', $userId)
            ->first();
             if ($existingBookmark) {
            return response()->json(['message' => 'Bookmark already exists'], 400);
        }

        // Create a new bookmark
        $bookmark = new Bookmark();
        $bookmark->college_id = $collegeId;
        $bookmark->user_id = $userId;
        $bookmark->save();

        return response()->json([
            'bookmark' => $bookmark,
            'status' => 200]);
    
        }
        catch (\Exception $e) {
        return response()->json(['message' => 'Internal server error'], 500);
    }
    }

    public function deleteBookmark($id)
    {
       try {
        // Find the bookmark by ID
        $bookmark = Bookmark::find($id);

        if (!$bookmark) {
            return response()->json(['message' => 'Bookmark not found'], 404);
        }

        // Delete the bookmark
        $bookmark->delete();

        return response()->json(['message' => 'Bookmark deleted successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Internal server error'], 500);
    }
    }
}
