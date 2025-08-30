<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Latihan Rutin',
                'description' => 'Kegiatan latihan rutin yang dilakukan secara berkala',
                'points' => 10,
                'is_active' => true,
            ],
            [
                'name' => 'Pertandingan',
                'description' => 'Kegiatan pertandingan resmi antar tim',
                'points' => 25,
                'is_active' => true,
            ],
            [
                'name' => 'Pelatihan',
                'description' => 'Kegiatan pelatihan khusus untuk pengembangan skill',
                'points' => 15,
                'is_active' => true,
            ],
            [
                'name' => 'Rapat Koordinasi',
                'description' => 'Rapat koordinasi tim dan evaluasi',
                'points' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Try Out',
                'description' => 'Pertandingan uji coba antar tim',
                'points' => 20,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
