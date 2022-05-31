<?php

namespace App\Http\Controllers;

use App\Models\Artista;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 
use Carbon\Carbon;
use BD;

class ArtistaController extends Controller
{

    public function index()
    {
        $musician = Artista::all();
        return ($musician);
    }

    public function store(Request $request)
    {
        try{
            $imagenbandas = Str::random().'.'.$request->banda->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('artistas/banda', $request->banda,$imagenbandas);

            $imagenbanda = Str::random().'.'.$request->logo->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('artistas/logo', $request->logo,$imagenbanda);
            Artista::create($request->post()+['logo'=>$imagenbanda]+['banda'=>$imagenbandas]);

            return response()->json(['res'=>'Artista agregado'],200);

        }catch(\Exception $error){
            return response()->json(['res'=>$error->getMessage()],500);
        }
    }

    public function show(Artista $artista)
    {
        return response()->json(['artista'=>$artista]);
    }

    public function update(Request $request, Artista $artista)
    {
        try{
            $artista->fill($request->post())->update();
            if($request->hasFile('banda')){
                if($artista->banda){
                    $exists = Storage::disk('public')->exists("artistas/banda/{$artista->banda}");
                    if($exists){
                        Storage::disk('public')->delete("artistas/banda/{$artista->banda}");
                    }
                }
                $imagennombre = Str::random().'.'.$request->banda->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('artistas/banda', $request->banda,$imagennombre);
                $artista->banda = $imagennombre;
            }
            if($request->hasFile('logo')){
                if($artista->logo){
                    $exists = Storage::disk('public')->exists("artistas/logo/{$artista->logo}");
                    if($exists){
                        Storage::disk('public')->delete("artistas/logo/{$artista->logo}");
                    }
                }
                $imagennombre = Str::random().'.'.$request->logo->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('artistas/logo', $request->logo,$imagennombre);
                $artista->logo = $imagennombre;
            }
            $artista->save();
            return response()->json(['res'=>'Actualizado']);
        }catch(\Exception $error){
            return response()->json(['res'=>'Errormáster '.$error->message],500);
        }
    }

    public function destroy(Artista $artista)
    {
        try {

            if($artista->banda){
                $exists = Storage::disk('public')->exists("artistas/banda/{$artista->banda}");
                if($exists){
                    Storage::disk('public')->delete("artistas/banda/{$artista->banda}");
                }
            }
            if($artista->logo){
                $exists = Storage::disk('public')->exists("artistas/logo/{$artista->logo}");
                if($exists){
                    Storage::disk('public')->delete("artistas/logo/{$artista->logo}");
                }
            }
            $artista->delete();
            return response()->json(['res'=> 'OK'],200);
            
        } catch (\Exception $error) {
            return response()->json([
                'res'=>'Híjole creo que no se va a poder'
            ],401);
        }
    }
}
