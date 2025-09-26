#!/bin/bash

# Simple health monitoring script
# Run with: ./scripts/monitor.sh

URL="http://localhost:3001/api/health"
INTERVAL=30  # Check every 30 seconds

echo "🔍 Starting health monitor for $URL"
echo "   Checking every ${INTERVAL} seconds..."
echo "   Press Ctrl+C to stop"
echo ""

while true; do
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

    # Check health endpoint
    RESPONSE=$(curl -s -w "\n%{http_code}" "$URL" 2>/dev/null)
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | head -n -1)

    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ [$TIMESTAMP] Healthy - Status: $HTTP_CODE"
    else
        echo "❌ [$TIMESTAMP] UNHEALTHY - Status: $HTTP_CODE"
        echo "   Response: $BODY"

        # Could add notification here (e.g., system notification, email, Slack)
        # osascript -e 'display notification "App is unhealthy!" with title "Health Monitor"'
    fi

    sleep $INTERVAL
done