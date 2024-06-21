<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Task;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            ['title' => '買い物', 'importance' => 5],
            ['title' => '掃除', 'importance' => 1],
            ['title' => '水やり', 'importance' => 2],
            ['title' => 'ジョギング', 'importance' => 3],
            ['title' => 'テレビ録画', 'importance' => 4],
        ];

        foreach($tasks as $task) {
            Task::create([
                'title' => $task['title'],
                'importance' => $task['importance'],
            ]);
        }
    }
}
