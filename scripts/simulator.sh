#!/bin/sh

if [[ $# = 0 ]]; then
    echo "Usage: $0 Scheme-Name Debug/Release"
    exit 1
fi

if which expo >/dev/null; then
    expo run:ios --scheme $1 --configuration $2 ${@:3}
else
    react-native run-ios --scheme $1 --configuration $2 ${@:3}
fi
