if [ "$1" == "-v" ]; then
    if [ -n "$2" ]; then
        nohup node server.js $2 > /dev/stdout 2>&1 &
    else
        nohup node server.js > /dev/stdout 2>&1 &
    fi
elif [ -n "$1" ]; then
    nohup node server.js $1 > /dev/null 2>&1 &
else
    nohup node server.js > /dev/null 2>&1 &
fi

