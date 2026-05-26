@echo off
echo ================================================
echo    VRTX Studio - Creative Agency Website
echo ================================================
echo.
cd /d "%~dp0"

echo [1/3] Clearing build cache...
if exist .next rmdir /s /q .next
echo Done.
echo.

echo [2/3] Installing dependencies...
call npm install
echo.

echo [3/3] Starting development server...
echo Open http://localhost:3000 in your browser
echo.
call npm run dev
pause
