<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class PasswordResetLinkController extends Controller
{
    /**
     * Show the password reset link request page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/ForgotPassword', [
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
            'nrk' => 'required|string'
        ]);


        $user = DB::table('users')->where([
            'email' => $request->email,
            'nrk' => $request->nrk,
        ])->first();

        if (!$user) {
            return back()->withErrors([
                'email' => __('Kami tidak menemukan pengguna dengan kombinasi email dan NRK tersebut.'),
            ]);
        }

        Password::sendResetLink(
            $request->only('email')
        );

        return back()->with('status', __('Link reset password telah dikirim ke email Anda.'));
    }
}
