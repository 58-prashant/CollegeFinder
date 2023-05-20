<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;


class QuestionController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'question' => 'required|string|max:255',
        ]);

        $collegeId = $request->college_id;
        $userId = $request->user_id;

        $question = new Question();
        $question->college_id = $collegeId;
        $question->user_id = $userId;
        $question->question = $validatedData['question'];
        $question->save();

        return response()->json($question, 201);
    }
    public function index()
    {
        $questions = Question::with('user')->get();

        return response()->json($questions);
    }

    public function update(Request $request, Question $question)
    {
        $validatedData = $request->validate([
            'answer' => 'required|string',
        ]);

        $question->answer = $validatedData['answer'];
        $question->save();

        return response()->json($question);
    }
}
