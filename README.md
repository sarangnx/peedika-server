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

## Supporting Malayalam in DB
```sql
ALTER DATABASE peedia CHARACTER SET utf8 COLLATE utf8_general_ci;
SET foreign_key_checks = 0;

-- you have to convert each table seperately
ALTER TABLE banners CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE brands CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE cart CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE cart_details CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE category CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE category_items CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE codes CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE inventory CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE localbodies CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE offer_items CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE offers CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE order_details CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE orders CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE product_ratings CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE stocks CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE store_owners CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE store_ratings CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE stores CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE sub_category CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE sub_category_items CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE sub_sub_category CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE sub_sub_category_items CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE users CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

SET foreign_key_checks = 1;
```