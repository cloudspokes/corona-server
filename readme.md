# Pub/Sub Server for Corona

A WebSockets server (Faye) for Corona in Node.js. Also has a simple implementation for clients.

See [this video](https://www.youtube.com/watch?v=9RLVgMHc_dQ) for a quick demo.

Once the server (running on port 8000) and clients are running, you can curl the following to the server to send messages to the clients.

    curl -v -X POST -d message='{"dataType": "login", "timestamp": "1400015648", "time": "1400015648", "longitude": "78.042155", "latitude": "27.175015", "content": "Submitted for challenge", "profilePic": "http://community.topcoder.com/i/m/CoralBlue.jpeg", "country": "Japan", "challenge": "12345", "eventType": "design"}'  http://localhost:8000

