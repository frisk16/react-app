<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>React App</title>
    @viteReactRefresh
    @vite([
        'resources/css/app.css',
        'resources/ts/index.tsx'
    ])
</head>
<body>
    <div id="app"></div>
</body>
</html>