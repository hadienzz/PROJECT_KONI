<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

Route::get('/', fn() => redirect()->route('login'));

// @ALL ROLE
Route::middleware('auth')->group(function () {
    Route::get('dashboard', fn() => Inertia::render('dashboard/index'))->name('dashboard');
    Route::get('profile', fn() => Inertia::render('profile/index'))->name('profile');
});

// ONLY @PEGAWAI
// Route::middleware(['auth', 'role:pegawai'])->group(function () {});

// });

// GROUP @ATASAN + PEGAWAI
Route::middleware(['auth', 'role:atasan|pegawai'])->group(function () {
    Route::get('inputactivity', fn() => Inertia::render('activities/index'))->name('inputactivity');
});

// ONLY @SUPERADMIN
Route::middleware(['auth', 'role:superadmin'])->group(function () {
    Route::get('branches', fn() => Inertia::render('branches/index'))->name('branches');
});


// GROUP @SUPERADMIN + @ATASAN
Route::middleware(['auth', 'role:superadmin|atasan'])->group(function () {
    Route::get('attendances', fn() => Inertia::render('attendances/index'))->name('attendances');
    Route::get('users', [UserController::class, 'index'])->name('users.index');
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
