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
        $tags = Tag::orderBy('created_at', 'DESC')->get();
        
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
     * Tag Data Count
     */
    public function tags_count()
    {
        // 
        $tags = Tag::all();
        $tag_data_counts = [];
        foreach($tags as $tag) {
            $tag_data_counts[] = [
                'tagId' => $tag->id,
                'count' => $tag->tasks()->count()
            ];
        }

        $response = [
            'tagCount' => $tag_data_counts,
        ];

        return response()->json($response);
    }

    /**
     * Add Tag
     */
    public function add_tag(Request $request)
    {
        // 
        $tag = Tag::create([
            'name' => $request->input('tagName'),
        ]);

        $response = [
            'tagName' => $tag->name,
            'tag' => $tag
        ];

        return response()->json($response);
    }

    /**
     * Delete Tag
     */
    public function delete_tag($id)
    {
        // 
        $tag = Tag::find($id);
        $tag_name = $tag->name;
        $tag->delete();

        $response = [
            'tagName' => $tag_name
        ];

        return response()->json($response);
    }

}
