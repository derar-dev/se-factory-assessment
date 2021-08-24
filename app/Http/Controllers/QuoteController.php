<?php

namespace App\Http\Controllers;

use App\Models\quote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuoteController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.verify');
    }

    public function index()
    {
        $quotes = auth()->user()->quotes;
        $response = [
            "success" => true,
            "quotes"=>$quotes
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->quote_validation_rules, $this->quote_validation_messages);

        if ($validator->fails()) {
            return $this->response_template(false, $validator->messages(), 422);
        } else {
            $quote = new quote;
            $quote->user_id = $request->user()->id;
            $quote->body = $request->body;
            $quote->save();
            return $this->response_template(true, "Quote created successfully", 200);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\quote  $quote
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, quote $quote)
    {
        if (auth()->user()->can("update", $quote)) {
            $validator = Validator::make($request->all(), $this->quote_validation_rules, $this->quote_validation_messages);

            if ($validator->fails()) {
                return $this->response_template(false, $validator->messages(), 422);
            } else {
                $quote->body = $request->body;
                $quote->save();
                return $this->response_template(true, "Quote updated successfully", 200);
            }
        } else {
            $message = "Only user who created the quote can update it";
            return $this->response_template(false, $message, 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\quote  $quote
     * @return \Illuminate\Http\Response
     */
    public function destroy(quote $quote)
    {
        if (auth()->user()->can("delete", $quote)) {
            $quote->delete();
            $message = "quote deleted successfully";
            return $this->response_template(true, $message, 200);
        } else {
            $message = "Only user who created the quote can delete it";
            return $this->response_template(false, $message, 401);
        }
    }
    // quote validation messages
    private  $quote_validation_messages =
    [
        "required" => "quote body is required",
        "unique" => "quote body already used",
        "min" => "quote body must be more than 9 letters",
        "max" => "quote body must be less than 250 letters",
    ];
    // quote validation rules 
    private  $quote_validation_rules =
    [
        'body' => ['required', 'unique:quotes', 'min:10', 'max:250'],
    ];
    // response template
    private  function response_template($success, $message, $status_code)
    {
        $response = [
            "success" => $success,
            "message" => $message,
        ];
        return response()->json($response, $status_code);
    }
}
