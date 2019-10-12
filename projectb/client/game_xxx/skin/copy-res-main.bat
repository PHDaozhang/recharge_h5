
::@echo ------------ ¿½±´ resource×ÊÔ´

rd res-main /S /Q

xcopy  ..\..\game_xxx\mainSkin\res-main\fonts\*.*  .\res-main\fonts\  /S /Q /Y
xcopy  ..\..\game_xxx\mainSkin\res-main\imgs\*.*  .\res-main\imgs\  /S /Q /Y
xcopy  ..\..\game_xxx\mainSkin\res-main\sheets\*.*  .\res-main\sheets\  /S /Q /Y
xcopy  ..\..\game_xxx\mainSkin\res-main\skins\*.*  .\res-main\skins\  /S /Q /Y
xcopy  ..\..\game_xxx\mainSkin\res-main\out\*.*  .\res-main\out\  /S /Q /Y
xcopy  ..\..\game_xxx\mainSkin\res-main\default.res.json  .\res-main\  /S /Q /Y
xcopy  ..\..\game_xxx\mainSkin\src\game\*.*  .\src\game\  /S /Q /Y
@pause



