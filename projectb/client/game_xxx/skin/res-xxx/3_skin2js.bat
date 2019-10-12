

::@echo ----------修改gameName = xxx中的xxx,不要修改game_xxx---------------- parse
@echo -----------------------------skin exml doing......

@set toolPath=..\..\..\tools\skinTool
@set gameName=xxx
@rd %toolPath%\resource\skins /S /Q

xcopy .\skins\*.*  %toolPath%\resource\skins\  /S /Q /Y
copy ..\..\..\game_xxx\ctrlConfig.js  %toolPath%\conf.js  


@node %toolPath%\main.js 

copy  %toolPath%\resource\theme.json .\out\theme_%gameName%.json
copy  %toolPath%\resource\theme.json ..\..\local\resource\theme_%gameName%.json

@pause