<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\TagTask;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $tags = Tag::all();
        
        $response = [
            'tags' => $tags,
        ];

        return response()->json($response);
    }

    /**
     * Task Datas
     */
    public function task_datas($id)
    {
        // 
        $tasks = Tag::find($id)->tasks()->orderBy('created_at', 'DESC')->paginate(10);

        $response = [
            'tasks' => $tasks,
        ];

        return response()->json($response);
    }

    /**
     * Tag_Task_Lists
     */
    public function tag_task_lists()
    {
        // 
        $tag_task_lists = TagTask::all();

        $response = [
            'tagTaskLists' => $tag_task_lists,
        ];

        return response()->json($response);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        //
    }
}
