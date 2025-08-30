<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $branches = [
            [
                'name' => 'Sepak Bola',
                'code' => 'SPB001',
                'description' => 'Cabang olahraga sepak bola yang menaungi pembinaan dan pengembangan atlet sepak bola',
                'supervisor_id' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Bola Basket',
                'code' => 'BSK001',
                'description' => 'Cabang olahraga bola basket yang fokus pada pembinaan atlet basket dari berbagai tingkat usia',
                'supervisor_id' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Bulutangkis',
                'code' => 'BTG001',
                'description' => 'Cabang olahraga bulutangkis yang bertanggung jawab atas pengembangan atlet badminton',
                'supervisor_id' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Renang',
                'code' => 'RNG001',
                'description' => 'Cabang olahraga renang yang membina atlet dalam berbagai gaya renang kompetitif',
                'supervisor_id' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Atletik',
                'code' => 'ATL001',
                'description' => 'Cabang olahraga atletik yang mencakup lari, lompat, dan lempar dalam berbagai nomor',
                'supervisor_id' => null,
                'is_active' => true,
            ],
        ];

        foreach ($branches as $branch) {
            Branch::create($branch);
        }
    }
}
