<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $roles)
    {
        if (!Auth::check()) {
            abort(403);
        }

        $allowedRoles = array_map('trim', preg_split('/[|,]/', $roles));

        $userRole = Auth::user()->role;


        \Log::info('User Role: ' . $userRole);
        \Log::info('Allowed Roles: ' . implode(', ', $allowedRoles));

        if (!in_array($userRole, $allowedRoles)) {
            abort(403, 'Unauthorized. Required roles: ' . $roles);
        }

        return $next($request);
    }
}
