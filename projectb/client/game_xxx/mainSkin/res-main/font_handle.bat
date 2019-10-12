
::set toPath=..\..\local

set toolUrl= ..\..\..\tools\mergeTex
set toPath=..\..\..\main

@rd %cd%\tmp\temp /S /Q
@rd %cd%\tmp\temp1 /S /Q

@md %cd%\tmp\temp
@md %cd%\tmp\temp1

node %toolUrl%\handChange.js %cd%\tmp\fonts %cd%\tmp\temp true

@del %toolUrl%\conf.js /S /Q
node %toolUrl%\makeSheet.js %cd%\tmp\temp %cd%\tmp\temp1
node %toolUrl%\complessImg.js %cd%\tmp\temp1
node %toolUrl%\mergeSheet.js %cd%\tmp\temp1 %cd%\out\fonts .json .fnt


@cd tmp\temp1
@for /R %%i in (*.json) do ren %%i *.fnt

cd..
cd..
xcopy  %cd%\tmp\temp1\*.* %cd%\fonts\  /S /Q /Y
xcopy  %cd%\out\fonts\*.* %toPath%\resource\fonts\  /S /Q /Y

pause