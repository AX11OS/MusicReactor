<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 
use Carbon\Carbon;
use BD;


class SongsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $track = Track::all();
        return ($track);
    }
    public function allofsongs(){
        $songs=\DB::table('songs')
        ->join('artistas', 'artistas.id','=','songs.id_artist')
        ->join('albums', 'albums.id','=','songs.id_album')
        ->join('genders', 'genders.id','=','songs.id_gender')
        ->select('artistas.nombre as artistname',
        'songs.name as songname',
        'songs.id as idsong',
        'albums.id as idalbum',
         'albums.nombre as albumname', 
         'genders.name as gendername',
         'albums.cover as cover')
        ->get();
        return $songs;
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function searchsongs($request){
        try{
            $songs = \DB::table('songs')
            ->join('artistas', 'artistas.id','=','songs.id_artist')
            ->join('albums', 'albums.id','=','songs.id_album')
            ->select('artistas.nombre as artist', 
            'albums.id as idalbum',
            'songs.name as name', 
            'songs.id as idsong',
            'albums.cover as cover',
            'albums.nombre as albumname',
            'songs.song as source')
            ->where('songs.name','like','%'.$request.'%')
            ->orderBy('songs.name')
            ->get();
            return $songs;

        }catch(\Exception $error){
            return response()->json(['res'=>$error->getMessage()],500);
        }
    }

    public function loadfromartist($request){
        try{
            $songs = \DB::table('songs')
            ->join('artistas', 'artistas.id','=','songs.id_artist')
            ->join('albums', 'albums.id','=','songs.id_album')
            ->select('artistas.nombre as artist', 
            'albums.id as idalbum',
            'songs.name as name', 
            'albums.cover as cover',
            'albums.nombre as albumname',
            'songs.song as source')
            ->where('songs.id_artist','=',$request)
            ->orderBy('songs.name')
            ->get();
            return $songs;

        }catch(\Exception $error){
            return response()->json(['res'=>$error->getMessage()],500);
        }
    }

    public function store(Request $request)
    {
        try{
            $songname = Str::random().'.'.$request->song->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('songs/audio', $request->song,$songname);
            Song::create($request->post()+['song'=>$songname]);
            return response()->json(['res'=>'Added songs'],200);

        }catch(\Exception $error){
            return response()->json(['res'=>$error->getMessage()],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Song $song)
    {
        try{
            $song->fill($request->post())->update();
            if($request->hasFile('song')){
                if($song->song){
                    $exists = Storage::disk('public')->exists("songs/audio/{$song->song}");
                    if($exists){
                        Storage::disk('public')->delete("songs/audio/{$song->song}");
                    }
                }
                $imagennombre = Str::random().'.'.$request->song->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('songs/audio', $request->song,$imagennombre);
                $song->song = $imagennombre;
            }
            $song->save();
            return response()->json(['res'=>'Actualizado']);
        }catch(\Exception $error){
            return response()->json(['res'=>'Errormáster '.$error->message],500);
        }
    }

    public function loadsong($request){
        $album = \DB::table('songs')
        ->join('albums', 'albums.id','=','songs.id_album')
        ->join('artistas', 'artistas.id','=','songs.id_artist')
        ->select('artistas.nombre as artist', 
        'albums.nombre as album',
        'songs.*',
        'albums.cover as cover')
        ->where('songs.id','=',$request)
        ->get();
        return $album;
    }


    public function destroy(Song $song)
    {
        try {

            if($song->song){
                $exists = Storage::disk('public')->exists("songs/audio/{$song->song}");
                if($exists){
                    Storage::disk('public')->delete("songs/audio/{$song->song}");
                }
            }
            $song->delete();
            return response()->json(['res'=> 'OK'],200);
            
        } catch (\Exception $error) {
            return response()->json([
                'res'=>'Híjole creo que no se va a poder'
            ],401);
        }
    }
}
