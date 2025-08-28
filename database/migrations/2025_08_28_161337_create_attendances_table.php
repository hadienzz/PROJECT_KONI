<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->date('date');

            // Check In Data
            $table->timestamp('check_in_time')->nullable();
            $table->string('check_in_address', 500)->nullable();
            $table->string('check_in_evidence')->nullable();
            // Check Out Data
            $table->timestamp('check_out_time')->nullable();
            $table->string('check_out_evidence')->nullable();

            // Status
            $table->enum('status', ['Present', 'Late', 'Absent', 'Sick', 'Permission'])->default('Absent');
            $table->decimal('work_hours', 4, 2)->default(0);
            $table->text('notes')->nullable();

            $table->timestamps();

            $table->unique(['user_id', 'date']);
            $table->index(['user_id']);
            $table->index(['date']);
            $table->index(['status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
