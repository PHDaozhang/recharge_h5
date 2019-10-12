
::@echo ------------ ¿½±´ resource×ÊÔ´
copy  .\bin-debug\main.js  ..\game_xxx\lib\main\  
copy  .\bin-debug\main.d.ts  ..\game_xxx\lib\main\  

xcopy  .\libs\TRain\*.*  ..\game_xxx\lib\TRain\  /S /Q /Y 

@pause



