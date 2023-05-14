<?php

namespace App\Http\Controllers;
use App\Models\Bookmark;

use Illuminate\Http\Request;

class BookmarkController extends Controller
{
     public function store(Request $request)
    {
        // Check if the user is authenticated
    
        $validatedData = $request->validate([
            'college_id' => 'required|exists:colleges,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $bookmark = Bookmark::create([
            'user_id' => $validatedData['user_id'],
            'college_id' => $validatedData['college_id'],
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Bookmark created successfully!',
            'bookmark' => $bookmark,
        ]);
    }

    public function destroy($id)
    {
        $bookmark = Bookmark::findOrFail($id);
        $this->authorize('delete', $bookmark);
        $bookmark->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Bookmark deleted successfully!',
        ]);
    }
}
