<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class quoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'created_at' => $this->created_at,
            'user_name'=>$this->user->name,
            'user_email'=>$this->user->email,
        ];
    }
}
