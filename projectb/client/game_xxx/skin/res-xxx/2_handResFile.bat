set toPath=..\..\local
set gameName=xxx
node ..\..\..\tools\mergeTex\handResFile.js %cd%\default.res.json %cd%\out\res_%gameName%.json
copy  %cd%\out\res_%gameName%.json %toPath%\resource\res_%gameName%.json
::copy  %cd%\out\res.json %toPath%\resource\ 

pause