set toPath=..\..\local


xcopy  %cd%\sound\*.* .\out\sound\  /S /Q /Y
xcopy  %cd%\out\sound\*.* %toPath%\resource\sound\  /S /Q /Y