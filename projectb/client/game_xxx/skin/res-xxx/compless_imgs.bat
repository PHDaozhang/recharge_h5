
set toolUrl=..\..\..\tools\mergeTex
set toPath=..\..\local

@rd %cd%\out\imgs\ /S /Q

xcopy  %cd%\imgs\*.jpg %cd%\out\imgs\  /S /Q /Y

node %toolUrl%\complessImg.js %cd%\imgs %cd%\out\imgs\
xcopy  %cd%\imgs\*.* %toPath%\resource\imgs\ /S /Q /Y


pause