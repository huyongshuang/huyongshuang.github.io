@echo off
setlocal DisableDelayedExpansion

set "GIT_BASH_PATH=C:\Program Files\Git\git-bash.exe"
set "CMD_1=npm run server-all"
set "CMD_2=npm run server-zh"
set "CMD_3=npm run server-en"
set "CMD_4=npm run deploy-all"

:menu
cls
echo ===========================
echo           Menu
echo ===========================
echo  1: %CMD_1%
echo  2: %CMD_2%
echo  3: %CMD_3%
echo  4: %CMD_4%
echo ===========================
set "choice=NULL"
set /p choice=Input 1~4 then Enter:
if not "%choice%"=="1" if not "%choice%"=="2" if not "%choice%"=="3" if not "%choice%"=="4" (
    echo Invalid input, only numbers 1-4 are allowed.
    pause >nul
    goto menu
)
if "%choice%"=="1" goto run1
if "%choice%"=="2" goto run2
if "%choice%"=="3" goto run3
if "%choice%"=="4" goto run4

:run1
start "" "%GIT_BASH_PATH%" -c "%CMD_1%; exec bash"
echo %CMD_1% has been executed.
goto wait_back
:run2
start "" "%GIT_BASH_PATH%" -c "%CMD_2%; exec bash"
echo %CMD_2% has been executed.
goto wait_back
:run3
start "" "%GIT_BASH_PATH%" -c "%CMD_3%; exec bash"
echo %CMD_3% has been executed.
goto wait_back
:run4
start "" "%GIT_BASH_PATH%" -c "%CMD_4%; exec bash"
echo %CMD_4% has been executed.
goto wait_back

:wait_back
echo Press any key back to menu
pause >nul
goto menu