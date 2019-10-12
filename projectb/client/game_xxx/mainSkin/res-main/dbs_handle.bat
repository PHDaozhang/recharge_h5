
set toolUrl=..\..\..\tools\mergeTex
set gameUrl=..\..\..\main


@rd %cd%\tmp\dbs /S /Q

@md %cd%\tmp\dbs

node %toolUrl%\handChange.js %cd%\dbs %cd%\tmp\dbs true


node %toolUrl%\complessImg.js %cd%\tmp\dbs
node %toolUrl%\mergeSheet.js %cd%\tmp\dbs %cd%\out\dbs .json .db 1


xcopy %cd%\out\dbs\*.* %gameUrl%\resource\dbs\  /S /Q /Y

pause