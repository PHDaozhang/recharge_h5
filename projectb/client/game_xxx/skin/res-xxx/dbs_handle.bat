
set toolUrl=..\..\..\tools\mergeTex
set gameUrl=..\..\local

@rd %cd%\out\dbs\ /S /Q
@rd %cd%\tmp\dbs\ /S /Q

xcopy %cd%\dbs\*.*  %cd%\tmp\dbs\ /S /Q /Y

node %toolUrl%\complessImg.js %cd%\tmp\dbs
node %toolUrl%\mergeSheet.js %cd%\tmp\dbs %cd%\out\dbs .json .db 1

xcopy %cd%\out\dbs\*.* %gameUrl%\resource\dbs\  /S /Q /Y

pause