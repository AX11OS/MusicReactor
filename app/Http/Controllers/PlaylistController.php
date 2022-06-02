<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Http\Request;

class PlaylistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $playlist = Playlist::all();
        return ($playlist);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        try{
            Playlist::create($request->post());
            return response()->json(['res'=>'Playlist add'],200);

        }catch(\Exception $error){
            return response()->json(['res'=>$error->getMessage()],500);
        }
    }

    public function userplay($request)
    {
        try{
            $playlist = \DB::table('playlists')
            ->join('songs', 'songs.id','=','playlists.id_song')
            ->join('artistas', 'artistas.id','=','songs.id_artist')
            ->join('albums', 'albums.id','=','songs.id_album')
            ->select('artistas.nombre as artist', 
            'playlists.id as idplay',
            'songs.name as name', 
            'albums.cover as cover',
            'albums.nombre as albumname',
            'songs.song as source')
            ->where('playlists.favorite','=',0)
            ->orderBy('songs.name')
            ->get();
            return $playlist;

        }catch(\Exception $error){
            return response()->json(['res'=>$error->getMessage()],500);
        }
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
