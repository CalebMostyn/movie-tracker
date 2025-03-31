#!/bin/bash

PID=$(pgrep -f "node server.js")

if [ -z "$PID" ]; then
  echo "No server.js process found."
else
  echo "Stopping server.js (PID: $PID)..."
  kill $PID
  echo "Server stopped."
fi
