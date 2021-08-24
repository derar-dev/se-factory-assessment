<?php

namespace Database\Seeders;

use App\Models\quote;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(20)->create()->each(function ($user) {
            quote::factory()->count(30)->create(['user_id' => $user->id]);
        });
    }
}
