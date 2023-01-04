<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/UsersIndex', [

            'users' => (User::paginate(10)),

        ]);
    }

    public function edit(Request $request, User $user)
    {

        return Inertia::render('Users/UsersEdit', [

            'user' => $user,

        ]);

    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name'  => ['required'],
            'email' => ['required', 'email'],
        ]);

        $user->update($data);

        return back()->with('message', 'Usuario actualizado!');
    }
}
