
set toolUrl=..\..\..\tools\confTool
set excelUrl=..\..\..\..\publish\excel
set toPath=..\..\local
set gameName=xxx

@rd %cd%\tmp\client_conf\ /S /Q
@rd %cd%\tmp\lang_game\ /S /Q


copy ..\excelConf.js  %toolUrl%\config\config.js  
node %toolUrl%\main.js game %excelUrl% %cd%\tmp\client_conf
node %toolUrl%\main.js gameLang %excelUrl% %cd%\tmp\lang_game


node %toolUrl%\merge.js %cd%\tmp\client_conf %cd%\out\conf\%gameName%Conf.json
node %toolUrl%\merge.js %cd%\tmp\lang_game %cd%\out\conf\%gameName%Lang.json

xcopy %cd%\tmp\client_conf\*.ts  %toPath%\src\consts\ /S /Q /Y
xcopy %cd%\tmp\lang_game\*.ts  %toPath%\src\consts\ /S /Q /Y

xcopy %cd%\out\conf\%gameName%Conf.json  %toPath%\resource\conf\ /S /Q /Y
xcopy %cd%\out\conf\%gameName%Lang.json  %toPath%\resource\conf\ /S /Q /Y


pause