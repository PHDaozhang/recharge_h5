
set toolUrl=..\..\..\tools\confTool
set excelUrl=..\..\..\..\publish\excel
set toPath=..\..\..\main

@rd %cd%\tmp\client_conf\ /S /Q
@rd %cd%\tmp\lang_game\ /S /Q


copy ..\excelConf.js  %toolUrl%\config\config.js  
node %toolUrl%\main.js main %excelUrl% %cd%\tmp\client_conf
node %toolUrl%\main.js mainLang %excelUrl% %cd%\tmp\lang_game


node %toolUrl%\merge.js %cd%\tmp\client_conf %cd%\out\conf\conf.json
node %toolUrl%\merge.js %cd%\tmp\lang_game %cd%\out\conf\lang.json

xcopy %cd%\tmp\client_conf\*.ts  %toPath%\src\game\consts\ /S /Q /Y
xcopy %cd%\tmp\lang_game\*.ts  %toPath%\src\game\consts\ /S /Q /Y

xcopy %cd%\out\conf\conf.json  %toPath%\resource\conf\ /S /Q /Y
xcopy %cd%\out\conf\lang.json  %toPath%\resource\conf\ /S /Q /Y
xcopy %cd%\out\conf\resConf.json  %toPath%\resource\conf\ /S /Q /Y

pause