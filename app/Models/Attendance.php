<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'latitude',
        'longitude',
        'address',
        'status',
        'description'
    ];

    public function newUniqueId(){
        return (string) Uuid::uuid4();
    }
}
