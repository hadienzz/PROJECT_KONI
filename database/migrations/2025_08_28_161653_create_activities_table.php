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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');

            // Activity Data
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestamp('start_time');
            $table->timestamp('end_time')->nullable();

            // Location Data
            $table->string('location_address', 500)->nullable();

            // Evidence & Status
            $table->string('evidence')->nullable();
            $table->enum('status', ['Draft', 'Submitted', 'Approved', 'Rejected'])->default('Draft');

            // Approval Data
            $table->foreignId('approved_by')->nullable()->constrained('users')->comment('Atasan yang approve');
            $table->timestamp('approved_at')->nullable();
            $table->text('rejection_reason')->nullable();

            $table->timestamps();

            $table->index(['user_id']);
            $table->index(['category_id']);
            $table->index(['start_time']);
            $table->index(['status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
