<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\User;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get users with role 'pegawai'
        $pegawai = User::where('role', 'pegawai')->get();

        // Get admin users for approval
        $admins = User::where('role', 'atasan')->get();

        // Get all categories
        $categories = Category::all();

        $statuses = ['Draft', 'Submitted', 'Approved', 'Rejected'];
        $locations = [
            'GOR Senayan, Jakarta',
            'Stadion Gelora Bung Karno, Jakarta',
            'Lapangan Latihan KONI, Jakarta',
            'Gedung Olahraga ABC, Jakarta',
            'Pusat Pelatihan XYZ, Jakarta'
        ];

        foreach ($pegawai as $user) {
            // Create 5 activities per user
            for ($i = 0; $i < 5; $i++) {
                $startTime = Carbon::now()->subDays(rand(1, 30))->setTime(rand(8, 17), 0);
                $endTime = $startTime->copy()->addHours(rand(1, 4));
                $status = $statuses[array_rand($statuses)];

                $activity = Activity::create([
                    'user_id' => $user->id,
                    'category_id' => $categories->random()->id,
                    'name' => 'Kegiatan ' . $categories->random()->name,
                    'description' => 'Deskripsi kegiatan yang dilakukan pada ' . $startTime->format('d M Y'),
                    'start_time' => $startTime,
                    'end_time' => $endTime,
                    'location_address' => $locations[array_rand($locations)],
                    'evidence' => 'evidence_' . $startTime->format('Ymd') . '_' . $user->id . '.jpg',
                    'status' => $status,
                ]);

                // Add approval data if status is Approved or Rejected
                if (in_array($status, ['Approved', 'Rejected'])) {
                    $activity->update([
                        'approved_by' => $admins->random()->id,
                        'approved_at' => $endTime->copy()->addDay(),
                        'rejection_reason' => $status === 'Rejected' ? 'Dokumen pendukung kurang lengkap' : null
                    ]);
                }
            }
        }
    }
}
