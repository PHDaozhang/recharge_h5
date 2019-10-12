
set toolUrl=..\..\..\tools\mergeTex
set toPath=..\..\local

@rd %cd%\tmp\temp /S /Q
@rd %cd%\tmp\temp1 /S /Q

node %toolUrl%\handChange.js %cd%\sheets %cd%\tmp\temp true


@del %toolUrl%\conf.js /S /Q
node %toolUrl%\makeSheet.js %cd%\tmp\temp %cd%\tmp\temp1
node %toolUrl%\complessImg.js %cd%\tmp\temp1
node %toolUrl%\mergeSheet.js %cd%\tmp\temp1 %cd%\out\sheets .json .st

xcopy  %cd%\tmp\temp1\*.* %cd%\tmp\sheets\  /S /Q /Y

@rd %cd%\sheets
xcopy  %cd%\out\sheets\*.* %toPath%\resource\sheets\  /S /Q /Y
::xcopy  %cd%\out\conf\*.* .\conf\  /S /Q /Y
pause