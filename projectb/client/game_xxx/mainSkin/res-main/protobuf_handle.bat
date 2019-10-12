
set toolUrl=..\..\..\tools\protobuf
set toPath=..\..\..\main

node %toolUrl%\main.js %cd%\protobuf\clientProtos.json %cd%\tmp\protobuf
xcopy %cd%\tmp\protobuf\*.* %toPath%\src\network\consts\  /S /Q /Y

pause