@echo off
cd /d "%~dp0\WebContent"
npx -y serve -l 8888 .
pause
