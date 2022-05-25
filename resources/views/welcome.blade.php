<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Music Reactor</title>
    <!-- Styles -->
    <link rel="icon" href="{{ URL::asset('/images/logoMR.png') }}" type="image/x-icon"/>
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('/css/app.css')  }}">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    <div id="cisco">
    </div>
    


    <!-- React JS -->
    <script src="{{ asset('js/app.js') }}" defer></script>

</body>
</html>