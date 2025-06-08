<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    use HasUuids;

    protected $casts = [
        'created_at' => 'datetime:d M Y h:i:s',
    ];

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

    // untuk mengambil data dari primary key
    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
