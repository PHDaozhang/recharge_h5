
::---------------------- 修改 --------------
@set moNm=recharge
@set skinID=


::-----皮肤目录名
@set outNm=%moNm%%skinID%
@set resNm=resource%skinID%

::-----------------------------------------
@set clientPath=..\..\..\client
@set workPath=%clientPath%\%moNm%
@set srcPath=%workPath%\local
@set resPath=%workPath%\skin%skinID%\res-%moNm%\out
@set toolPath=%clientPath%\tools
@set curPath=%cd%
@set publishPath=.\skin%skinID%
@set outPath=.\patch\%outNm%


cd %srcPath%
@rd bin-release /S /Q
call egret publish --version webver

cd %curPath%

@rd .\%publishPath%\%resNm%\ /S /Q
@rd .\patch\ /S /Q
@md %outPath%
@md .\%publishPath%\%resNm%

copy  %srcPath%\bin-release\web\webver\js\main.min_*.js %publishPath%\%moNm%.js /B

@echo ------------ 拷贝资源

xcopy  %resPath%\*.*  %publishPath%\%resNm%\  /S /Q /Y

@echo ------------ 资源打版本

copy  ..\mainver.json %toolPath%\vertool\mainver.json /B
@node %toolPath%\vertool\makever.js  %publishPath% %publishPath%\%resNm%\ %outPath%\%resNm%\ %moNm%

@echo ------------ 代码打版本
@node %toolPath%\vertool\makejsver.js  %publishPath% %publishPath% %outPath% %moNm%

cd %outPath%
move /Y *.ver %resNm%

cd %curPath%

%toolPath%\zip\7z a -r %outPath%.zip %outPath%\*.*

@echo ------------ 结束
@pause



