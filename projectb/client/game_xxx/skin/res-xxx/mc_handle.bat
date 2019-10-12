
set toolUrl=..\..\..\tools\mergeTex
set gameUrl=..\..\local

::@rd %cd%\out\mcs\eff /S /Q
@rd %cd%\tmp\mcs\ /S /Q

copy %cd%\mcs\conf.js  %toolUrl%\
node %toolUrl%\makeSheet.js %cd%\mcs %cd%\tmp\mcs
node %toolUrl%\handMC.js %cd%\tmp\mcs %cd%\mcs
node %toolUrl%\complessImg.js %cd%\tmp\mcs
node %toolUrl%\mergeSheet.js %cd%\tmp\mcs %cd%\out\mcs .mc .mc 1

xcopy %cd%\out\mcs\*.* %gameUrl%\resource\mcs  /S /Q /Y

pause