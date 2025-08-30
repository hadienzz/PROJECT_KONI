<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Notification;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        $notificationTypes = [
            'App\Notifications\ActivityApproved',
            'App\Notifications\ActivityRejected',
            'App\Notifications\NewActivity',
            'App\Notifications\AttendanceReminder',
            'App\Notifications\AttendanceLate'
        ];

        foreach ($users as $user) {
            // Create 5 notifications per user
            for ($i = 0; $i < 5; $i++) {
                $type = $notificationTypes[array_rand($notificationTypes)];
                $createdAt = Carbon::now()->subDays(rand(0, 30));

                // Randomly mark some notifications as read
                $readAt = rand(0, 1) ? $createdAt->copy()->addHours(rand(1, 24)) : null;

                Notification::create([
                    'id' => Str::uuid()->toString(),
                    'type' => $type,
                    'notifiable_type' => User::class,
                    'notifiable_id' => $user->id,
                    'data' => $this->getNotificationData($type),
                    'read_at' => $readAt,
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]);
            }
        }
    }

    /**
     * Get sample notification data based on type.
     */
    private function getNotificationData($type): array
    {
        switch ($type) {
            case 'App\Notifications\ActivityApproved':
                return [
                    'message' => 'Aktivitas anda telah disetujui',
                    'activity_id' => rand(1, 50),
                    'approved_by' => rand(1, 5)
                ];

            case 'App\Notifications\ActivityRejected':
                return [
                    'message' => 'Aktivitas anda ditolak',
                    'activity_id' => rand(1, 50),
                    'reason' => 'Dokumen pendukung kurang lengkap'
                ];

            case 'App\Notifications\NewActivity':
                return [
                    'message' => 'Ada aktivitas baru yang perlu direview',
                    'activity_id' => rand(1, 50)
                ];

            case 'App\Notifications\AttendanceReminder':
                return [
                    'message' => 'Jangan lupa untuk melakukan absensi hari ini'
                ];

            default:
                return [
                    'message' => 'Anda tercatat terlambat hari ini',
                    'attendance_id' => rand(1, 100)
                ];
        }
    }
}
