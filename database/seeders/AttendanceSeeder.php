<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users except superadmin
        $users = User::where('role', '!=', 'superadmin')->get();
        $today = Carbon::now();

        // Create attendance records for the last 5 days
        for ($i = 0; $i < 5; $i++) {
            $date = $today->copy()->subDays($i);

            foreach ($users as $user) {
                // Random check-in time between 07:00 - 08:30
                $checkInTime = $date->copy()->setTime(rand(7, 8), rand(0, 30));

                // Random check-out time between 16:00 - 17:30
                $checkOutTime = $date->copy()->setTime(rand(16, 17), rand(0, 30));

                // Calculate work hours
                $workHours = $checkOutTime->diffInHours($checkInTime) +
                            ($checkOutTime->diffInMinutes($checkInTime) % 60) / 60;

                // Determine status based on check-in time
                $status = $checkInTime->format('H:i') <= '08:00' ? 'Present' : 'Late';

                Attendance::create([
                    'user_id' => $user->id,
                    'date' => $date->format('Y-m-d'),
                    'check_in_time' => $checkInTime,
                    'check_in_address' => 'Jl. Contoh No. ' . rand(1, 100) . ', Jakarta',
                    'check_in_evidence' => 'checkin_' . $date->format('Ymd') . '_' . $user->id . '.jpg',
                    'check_out_time' => $checkOutTime,
                    'check_out_evidence' => 'checkout_' . $date->format('Ymd') . '_' . $user->id . '.jpg',
                    'status' => $status,
                    'work_hours' => number_format($workHours, 2),
                    'notes' => $status === 'Late' ? 'Terlambat karena macet' : null
                ]);
            }
        }
    }
}
