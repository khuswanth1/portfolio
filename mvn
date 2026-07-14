#!/bin/sh
DIR="$(cd "$(dirname "$0")" && pwd)"
MVN_BIN="$DIR/.maven/apache-maven-3.9.8/bin/mvn"

if [ ! -f "$MVN_BIN" ]; then
    echo "Portable Maven not found. Initializing setup..."
    powershell -ExecutionPolicy Bypass -File "$DIR/run.ps1"
else
    exec "$MVN_BIN" "$@"
fi
