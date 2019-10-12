

::@echo -------------------------- parse
@echo -----------------------------skin exml doing......

@set toolPath=..\..\..\tools\skinTool

@rd %toolPath%\resource\skins /S /Q

xcopy .\skins\*.*  %toolPath%\resource\skins\  /S /Q /Y
copy ..\..\ctrlConfig.js  %toolPath%\conf.js  


@node %toolPath%\main.js 

copy  %toolPath%\resource\theme.json .\out\theme.json
copy  %toolPath%\resource\theme.json ..\..\..\main\resource\theme.json

@pause