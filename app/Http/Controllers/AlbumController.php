<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 
use Carbon\Carbon;
use BD;

class AlbumController extends Controller
{

    public function index()
    {
        $album = Album::all();
        return ($album);
    }

    public function albumartista(){
        $album = \DB::table('albums')
        ->join('artistas', 'artistas.id','=','albums.id_artista')
        ->select('artistas.nombre as banda', 'albums.*')
        ->get();
        return $album;
    }
    public function loadalbum($request){
        $album = \DB::table('albums')
        ->join('artistas', 'artistas.id','=','albums.id_artista')
        ->select('artistas.nombre as banda', 'albums.*')
        ->where('albums.id','=',$request)
        ->get();
        return $album;
    }

    public function loadalbums($request){
        $album = \DB::table('albums')
        ->select('albums.*')
        ->where('albums.id_artista','=',$request)
        ->get();
        return $album;
    }

    public function store(Request $request)
    {
        try{
            $imagenalbum = Str::random().'.'.$request->cover->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('albums/cover', $request->cover,$imagenalbum);
            Album::create($request->post()+['cover'=>$imagenalbum]);
            return response()->json(['res'=>'Album agregado'],200);

        }catch(\Exception $error){
            return response()->json(['res'=>$error->getMessage()],500);
        }
    }

    public function show(Album $album)
    {
        return response()->json(['album'=>$album]);
    }

    public function update(Request $request, Album $album)
    {
        try{
            $album->fill($request->post())->update();
            if($request->hasFile('cover')){
                if($album->cover){
                    $exists = Storage::disk('public')->exists("albums/cover/{$album->cover}");
                    if($exists){
                        Storage::disk('public')->delete("albums/cover/{$album->cover}");
                    }
                }
                $imagennombre = Str::random().'.'.$request->cover->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('albums/cover', $request->cover,$imagennombre);
                $album->cover = $imagennombre;
            }
            $album->save();
            return response()->json(['res'=>'Actualizado']);
        }catch(\Exception $error){
            return response()->json(['res'=>'Errormáster '.$error->message],500);
        }
    }

    public function destroy(Album $album)
    {
        try {

            if($album->cover){
                $exists = Storage::disk('public')->exists("albums/cover/{$album->cover}");
                if($exists){
                    Storage::disk('public')->delete("albums/cover/{$album->cover}");
                }
            }
            $album->delete();
            return response()->json(['res'=> 'OK'],200);
            
        } catch (\Exception $error) {
            return response()->json([
                'res'=>'Híjole creo que no se va a poder'
            ],401);
        }
    }
}
