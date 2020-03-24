## Firebase Cloud Messaging
Setup FCM to send notifications to user devices.

1. Goto [Firebase console](https://console.firebase.google.com), and create a project. Either select an existing GCP project or create a new one.
2. [Add the firebase SDK to server.](https://firebase.google.com/docs/admin/setup?authuser=0)
3. Create and download private key.
4. Rename it to `service-account.json`, and place it in root of the project or somewhere else and provide correct path (absolute one not relative) to the file in .env file.

## Starting

```bash
cd project
# install dependencies
yarn
# create database and tables
yarn migrate
# start server
yarn dev
```
