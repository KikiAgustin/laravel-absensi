<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AttendanceController extends Controller
{

    static function isTodayAttendanceSubmitted() {
        if(!Auth::check()){
            return false;
        }
        return Attendance::where('user_id', Auth::user()->id)->whereDate('created_at', now()->toDateString())->exists();
    }

    public function index(){
        $attendances = Attendance::with('user')->paginate(10);

        return Inertia::render('Attendance/Index', [
            'attendances' => $attendances,
        ]);
    }

    public function submit(Request $request){
        $request->validate([
            'status' => 'required',
            'description' => 'required_if:status,sick,leave,permint,business_trip,remote|max:500',
            'latitude' => 'required',
            'longitude' => 'required',
            'address' => 'required',
        ]);

        Attendance::create([
            'user_id' => auth()->id(),
            'status' => $request->status,
            'description' => $request->description,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'address' => $request->address,
        ]);

    }
}
