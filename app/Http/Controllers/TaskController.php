<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Tag;
use App\Models\TagTask;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        if ($request->has('keyword')) {
            $tasks = Task::where('title', 'LIKE', "%{$request->keyword}%")->orderBy('created_at', 'DESC')->paginate(10);
        } else {
            $tasks = Task::orderBy('created_at', 'DESC')->paginate(10);
        }

        $response = [
            'tasks' => $tasks
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created resource in storage.
     * 
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'title' => 'required',
            'importance' => 'required'
        ]);

        $task = Task::create([
            'title' => $request->input('title'),
            'importance' => $request->input('importance')
        ]);

        $response = [
            'title' => $task->title,
            'task' => $task
        ];

        return response()->json($response);
    }

    public function selected_delete(Request $request)
    {
        // 
        $ids = $request->input('arrayId');
        foreach($ids as $id) {
            Task::where('id', $id)->delete();
        }

        $response = [
            'delete_count' => count($ids),
        ];

        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $request->validate([
            'title' => 'required',
            'importance' => 'required',
            'completed' => 'required',
        ]);

        $task = Task::find($id);
        $task->title = $request->input('title');
        $task->importance = $request->input('importance');
        $task->completed = $request->input('completed');
        $task->update();

        $response = [
            'id' => $id,
        ];

        return response()->json($response);
    }

    /**
     * Toggle Tag
     */
    public function toggle_tag(Request $request, $id)
    {
        //
        $task = Task::find($id);
        $task->tags()->sync($request->input('tagIds'));

        $response = [
            'id' => $id,
        ];

        return response()->json($response);
    }

}
