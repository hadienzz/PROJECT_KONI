<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@koni.test',
                'password' => Hash::make('password123'),
                'nrk' => 'SA001',
                'role' => 'superadmin',
                'phone' => '081234567890',
                'hire_date' => '2023-01-01',
                'branch_id' => null,
            ],
            [
                'name' => 'Admin Sepakbola',
                'email' => 'admin.sepakbola@koni.test',
                'password' => Hash::make('password123'),
                'nrk' => 'AD001',
                'role' => 'atasan',
                'phone' => '081234567891',
                'hire_date' => '2023-01-02',
                'branch_id' => 1, // Assuming branch_id 1 is Sepak Bola
            ],
            [
                'name' => 'Admin Basket',
                'email' => 'admin.basket@koni.test',
                'password' => Hash::make('password123'),
                'nrk' => 'AD002',
                'role' => 'atasan',
                'phone' => '081234567892',
                'hire_date' => '2023-01-03',
                'branch_id' => 2, // Assuming branch_id 2 is Bola Basket
            ],
            [
                'name' => 'Pegawai Sepakbola',
                'email' => 'staff.sepakbola@koni.test',
                'password' => Hash::make('password123'),
                'nrk' => 'PG001',
                'role' => 'pegawai',
                'phone' => '081234567893',
                'hire_date' => '2023-01-04',
                'branch_id' => 1, // Assuming branch_id 1 is Sepak Bola
            ],
            [
                'name' => 'Pegawai Basket',
                'email' => 'staff.basket@koni.test',
                'password' => Hash::make('password123'),
                'nrk' => 'PG002',
                'role' => 'pegawai',
                'phone' => '081234567894',
                'hire_date' => '2023-01-05',
                'branch_id' => 2, // Assuming branch_id 2 is Bola Basket
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
