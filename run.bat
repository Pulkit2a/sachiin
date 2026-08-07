@echo off
title Hero Homes App Launcher
cls
echo ========================================================
echo               HERO HOMES APP LAUNCHER
echo ========================================================
echo.
echo Starting server...
echo.
start http://localhost:3000
node server.js
if %ERRORLEVEL% NEQ 0 (
    echo Node server failed, trying Vite dev server...
    npm start
)
pause
