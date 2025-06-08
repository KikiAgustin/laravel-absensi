<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Events\ReadRfidEvent;

class RfidController extends Controller
{
    public function read(Request $request){

        if(User::where('uid', $request->uid)->exists()){
            event(new ReadRfidEvent($request->uid, 'EXISTS', 'RFID already exists'));
            return response()->json([
                'message' => 'RFID already exists',
                'code' => 'EXISTS',
                'uid' => $request->uid
            ]);
        }else {
            event(new ReadRfidEvent($request->uid, 'SUCCESS', 'RFID read successfully'));
            return response()->json([
                'message' => 'RFID read successfully',
                'code' => 'SUCCESS',
                'uid' => $request->uid
            ]);
        }

    }
}
