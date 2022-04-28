<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    {{-- CRF TOKEN --}}
    <meta charset="utf-8">

    {{-- Scripts --}}
    <script src="{{asset('js/app.js')}}" defer></script>

    {{-- Fonts --}}
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    
    {{-- Styles --}}
    <link rel="stylesheet" href="{{asset('css/app.css')}}" rel="stylesheet">
    
    {{-- <title>{{config ('app.name', 'Laravel')}}</title> --}}
    <title>@yield('tittle')</title>
</head>
<body class="p-3 mb-2 bg-dark text-white">
    <header>
        <div id="navbar"></div>
    </header>
    @yield('content')
</body>
</html>