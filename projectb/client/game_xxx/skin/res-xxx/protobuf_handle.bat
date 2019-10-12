
set toolUrl=..\..\..\tools\protobuf
set toPath=..\..\local

node %toolUrl%\main.js %cd%\protobuf\clientProtos.json %cd%\tmp\protobuf xxx 替换成游戏Id
xcopy %cd%\tmp\protobuf\*.* %toPath%\src\net\consts\ /S /Q /Y

pause