<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard/index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/profile', function () {
    return Inertia::render('profile/index');
})->middleware(['auth', 'verified'])->name('profile');

Route::get('/inputactivity', function () {
    return Inertia::render('activities/index');
})->middleware(['auth', 'verified'])->name('inputactivity');

Route::get('/attendances', function () {
    return Inertia::render('attendances/index');
})->middleware(['auth', 'verified'])->name('attendances');

Route::get('/users', function () {
    return Inertia::render('users/index');
})->middleware(['auth', 'verified'])->name('users');

Route::get('/branches', function () {
    return Inertia::render('branches/index');
})->middleware(['auth', 'verified'])->name('branches');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
