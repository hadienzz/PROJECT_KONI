<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            // Superadmin
            [
                'name' => 'Super Admin',
                'username' => 'superadmin',
                'email' => 'superadmin@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'SA001',
                'role' => 'superadmin',
                'phone' => '081234567890',
                'hire_date' => '2023-01-01',
                'branch_id' => null,
            ],

            // Atasan (4 users)
            [
                'name' => 'Admin Sepakbola',
                'username' => 'adminsepakbola',
                'email' => 'adminsepakbola@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'AD001',
                'role' => 'atasan',
                'phone' => '081234567891',
                'hire_date' => '2023-01-02',
                'branch_id' => 1,
            ],
            [
                'name' => 'Admin Basket',
                'username' => 'adminbasket',
                'email' => 'adminbasket@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'AD002',
                'role' => 'atasan',
                'phone' => '081234567892',
                'hire_date' => '2023-01-03',
                'branch_id' => 2,
            ],
            [
                'name' => 'Admin Badminton',
                'username' => 'adminbadminton',
                'email' => 'adminbadminton@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'AD003',
                'role' => 'atasan',
                'phone' => '081234567893',
                'hire_date' => '2023-01-04',
                'branch_id' => 3,
            ],
            [
                'name' => 'Admin Voli',
                'username' => 'adminvoli',
                'email' => 'adminvoli@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'AD004',
                'role' => 'atasan',
                'phone' => '081234567894',
                'hire_date' => '2023-01-05',
                'branch_id' => 4,
            ],

            // Pegawai (10 users)
            [
                'name' => 'Pegawai Sepakbola 1',
                'username' => 'pegawaisepakbola1',
                'email' => 'pegawaisepakbola1@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'PG001',
                'role' => 'pegawai',
                'phone' => '081234567895',
                'hire_date' => '2023-02-01',
                'branch_id' => 1,
            ],
            [
                'name' => 'Pegawai Sepakbola 2',
                'username' => 'pegawaisepakbola2',
                'email' => 'pegawaisepakbola2@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'PG002',
                'role' => 'pegawai',
                'phone' => '081234567896',
                'hire_date' => '2023-02-02',
                'branch_id' => 1,
            ],
            [
                'name' => 'Pegawai Basket 1',
                'username' => 'pegawaibasket1',
                'email' => 'pegawaibasket1@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'PG003',
                'role' => 'pegawai',
                'phone' => '081234567897',
                'hire_date' => '2023-02-03',
                'branch_id' => 2,
            ],
            [
                'name' => 'Pegawai Basket 2',
                'username' => 'pegawaibasket2',
                'email' => 'pegawaibasket2@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'PG004',
                'role' => 'pegawai',
                'phone' => '081234567898',
                'hire_date' => '2023-02-04',
                'branch_id' => 2,
            ],
            [
                'name' => 'Pegawai Badminton 1',
                'username' => 'pegawaibadminton1',
                'email' => 'pegawaibadminton1@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'PG005',
                'role' => 'pegawai',
                'phone' => '081234567899',
                'hire_date' => '2023-02-05',
                'branch_id' => 3,
            ],
            [
                'name' => 'Pegawai Badminton 2',
                'username' => 'pegawaibadminton2',
                'email' => 'pegawaibadminton2@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'PG006',
                'role' => 'pegawai',
                'phone' => '081234567800',
                'hire_date' => '2023-02-06',
                'branch_id' => 3,
            ],
            [
                'name' => 'Pegawai Voli 1',
                'username' => 'pegawaivoli1',
                'email' => 'pegawaivoli1@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'PG007',
                'role' => 'pegawai',
                'phone' => '081234567801',
                'hire_date' => '2023-02-07',
                'branch_id' => 4,
            ],
            [
                'name' => 'Pegawai Voli 2',
                'username' => 'pegawaivoli2',
                'email' => 'pegawaivoli2@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'PG008',
                'role' => 'pegawai',
                'phone' => '081234567802',
                'hire_date' => '2023-02-08',
                'branch_id' => 4,
            ],
            [
                'name' => 'Pegawai Renang 1',
                'username' => 'pegawairenang1',
                'email' => 'pegawairenang1@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'PG009',
                'role' => 'pegawai',
                'phone' => '081234567803',
                'hire_date' => '2023-02-09',
                'branch_id' => 5,
            ],
            [
                'name' => 'Pegawai Renang 2',
                'username' => 'pegawairenang2',
                'email' => 'pegawairenang2@example.com',
                'password' => Hash::make('12345678'),
                'nrk' => 'PG010',
                'role' => 'pegawai',
                'phone' => '081234567804',
                'hire_date' => '2023-02-10',
                'branch_id' => 5,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
