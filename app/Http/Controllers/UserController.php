<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function index(){

        $users = User::paginate(10);
        return Inertia::render('User/index', [
            'users' => $users
        ]);
    }

    public function create(){
        return Inertia::render('User/Create');
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'email'=> 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',
            'uid' => 'nullable|unique:users,uid',
        ]);

        User::create($request->all());
        return redirect()->route('users');
    }

    public function edit(User $user){
        return Inertia::render('User/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user ){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'password' => 'nullable|minn:8',
            'password_confirmation' => 'nullable|same:password',
            'uid' => 'nullable|unique:users,uid,'.$user->id,
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'uid' => $request->uid,
        ]);

        return redirect()->route('users');
    }
}
