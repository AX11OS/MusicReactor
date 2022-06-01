<?php

namespace App\Http\Controllers;

use App\Models\Artista;
use App\Models\Gender;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 
use Carbon\Carbon;
use BD;

class GenderController extends Controller
{

    public function index()
    {
        $gender = Gender::all();
        return ($gender);
    }

    public function store(Request $request)
    {
        try{
          
            Gender::create($request->post());
            return response()->json(['res'=>'Genero agregado'],200);

        }catch(\Exception $error){
            return response()->json(['res'=>$error->getMessage()],500);
        }
    }

    public function show(Gender $gender)
    {
        return response()->json(['genero'=>$gender]);
    }

    public function update(Request $request, Gender $gender)
    {
        try{
            $gender->fill($request->post())->update();
            return response()->json(['res'=>'Actualizado']);
        }catch(\Exception $error){
            return response()->json(['res'=>'Errormáster '.$error->message],500);
        }
    }

    public function destroy(Gender $gender)
    {
        try {
            $gender->delete();
            return response()->json(['res'=> 'OK'],200);
            
        } catch (\Exception $error) {
            return response()->json([
                'res'=>'Híjole creo que no se va a poder'
            ],401);
        }
    }
}