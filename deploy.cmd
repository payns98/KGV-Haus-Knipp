@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

echo === Wechsle zu main ===
git checkout main

echo === Pull neueste Änderungen ===
git pull origin main --rebase

echo === Installiere Abhängigkeiten ===
npm install --legacy-peer-deps

echo === Baue die React App ===
npm run build

IF NOT EXIST dist (
    echo Fehler: Build-Ordner "dist" wurde nicht erstellt!
    pause
    exit /b 1
)

echo === Erstelle/Wechsle zu gh-pages ===
git checkout gh-pages 2>nul
IF ERRORLEVEL 1 (
    git checkout --orphan gh-pages
)

echo === Lösche alte Dateien ===
git rm -rf . >nul 2>&1

echo === Kopiere Build-Dateien ===
xcopy /s /y /i dist\* .

echo === Git Commit und Push ===
git add -A
git commit -m "Deploy React App to GitHub Pages" 2>nul
git push origin gh-pages --force

echo === Zurück zu main ===
git checkout main

echo === Fertig! GitHub Pages sollte jetzt aktualisiert sein ===
pause
