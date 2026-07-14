@echo off
setlocal
set "DIR=%~dp0"
set "MVN_BIN=%DIR%.maven\apache-maven-3.9.8\bin\mvn.cmd"

if not exist "%MVN_BIN%" (
    echo Portable Maven not found. Initializing setup...
    powershell -ExecutionPolicy Bypass -File "%DIR%run.ps1"
) else (
    "%MVN_BIN%" %*
)
