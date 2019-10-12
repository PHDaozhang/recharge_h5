set toPath=..\..\..\main

node ..\..\..\tools\mergeTex\handResFile.js %cd%\default.res.json %cd%\out\res.json
copy  %cd%\out\res.json %toPath%\resource\ 

pause