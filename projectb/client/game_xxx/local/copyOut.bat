
::@echo ------------ ¿½±´ resource×ÊÔ´
rd resource /S /Q
set gameName=xxx
xcopy  ..\..\game_xxx\mainSkin\res-main\out\*.*  .\resource\  /S /Q /Y
xcopy  ..\skin\res-%gameName%\out\*.*  .\resource\  /S /Q /Y
@pause



