<!-- backend -->
# 📧 Email Marketing Platform

> Production-ready Email Marketing Backend built with Node.js,
> Express.js, PostgreSQL, Sequelize, Redis, BullMQ and Nodemailer.

## Overview

This backend powers an Email Marketing Platform similar to Mailchimp or
Brevo.

Features: - JWT Authentication - Workspace isolation - Contact
management - Audience segmentation - CSV import - Campaign scheduling -
BullMQ + Redis background processing - HTML email delivery - PDF
attachments - Logging and error handling

## Architecture

``` text
Client
  |
Express API
  |
PostgreSQL
  |
BullMQ Queue
  |
Redis
  |
Worker
  |
Campaign Processor
  |
Audience Filter
  |
Contact Loader
  |
SMTP
  |
Recipients
```

## Tech Stack

-   Node.js
-   Express.js
-   PostgreSQL
-   Sequelize
-   Redis
-   BullMQ
-   Nodemailer
-   JWT
-   Zod
-   Multer
-   Docker

## Request Flow

1.  Create Campaign
2.  Save to PostgreSQL
3.  Schedule BullMQ Job
4.  Redis stores delayed job
5.  Worker wakes up
6.  Processor loads campaign
7.  Audience filter fetches contacts
8.  Emails are sent
9.  Status updated

## Project Structure

``` text
src/
├── config/
├── database/
├── middlewares/
├── modules/
├── queues/
├── workers/
├── utils/
└── server.js
```
