::---------------------- �޸� --------------
@set moNm=xxx
@set skinID=

::-----Ƥ��Ŀ¼��
@set resNm=resource%skinID%

::------------------------------------
@set clientPath=..\..\..\client
@set toolPath=%clientPath%\tools
@set publishPath=.\skin%skinID%
@set outPath=.\appRes\%resNm%
@set curPath=%cd%

@rd .\appRes\ /S /Q
@md %outPath%

copy  ..\mainver.json %toolPath%\vertool\mainver.json /B
node %toolPath%\vertool\copyver.js  %publishPath% %outPath% %resNm% true

%toolPath%\zip\7z a -r %outPath%.zip %outPath%\*.*

@echo ------------ ����
@pause



