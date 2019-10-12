
set toolUrl=..\..\..\tools\mergeTex
::set toPath=..\..\local
::@rd %cd%\out\icon /S /Q
@rd %cd%\tmp\icon /S /Q
@rd %cd%\tmp\icon1 /S /Q

node %toolUrl%\handIcon.js %cd%\mcs\icon\head %cd%\tmp\icon %cd%\out\conf\resConf.json 90 100
::node %toolUrl%\handIcon.js %cd%\mcs\icon\item %cd%\tmp\icon %cd%\out\conf\resConf.json 64 64
::node %toolUrl%\handIcon.js %cd%\mcs\icon\enchant %cd%\tmp\icon %cd%\out\conf\resConf.json 64 64
::node %toolUrl%\handIcon.js %cd%\mcs\icon\meri %cd%\tmp\icon %cd%\out\conf\resConf.json 64 64
::node %toolUrl%\handIcon.js %cd%\mcs\icon\mgr %cd%\tmp\icon %cd%\out\conf\resConf.json 64 64
::node %toolUrl%\handIcon.js %cd%\mcs\icon\skilb %cd%\tmp\icon %cd%\out\conf\resConf.json 119 94
::node %toolUrl%\handIcon.js %cd%\mcs\icon\skils %cd%\tmp\icon %cd%\out\conf\resConf.json 64 64
::node %toolUrl%\handIcon.js %cd%\mcs\icon\task %cd%\tmp\icon %cd%\out\conf\resConf.json 64 64
::node %toolUrl%\handIcon.js %cd%\mcs\icon\stateb %cd%\tmp\icon %cd%\out\conf\resConf.json 64 64
::node %toolUrl%\handIcon.js %cd%\mcs\icon\states %cd%\tmp\icon %cd%\out\conf\resConf.json 37 37

@del %toolUrl%\conf.js /S /Q
node %toolUrl%\makeSheet.js %cd%\tmp\icon %cd%\tmp\icon1
node %toolUrl%\complessImg.js %cd%\tmp\icon1
node %toolUrl%\mergeSheet.js %cd%\tmp\icon1 %cd%\out\icon .json .st

pause