# 🍛 AnnaSetu
## 🚀 Real-Time Food Redistribution Platform
<p align="center"> <b>Connecting surplus food to those who need it — instantly.</b> </p> <p align="center"> 🌐 <a href="https://foodbridge-d9a74.web.app/">Live Demo</a> • ☁️ Firebase Hosted • ⚡ Real-Time Firestore </p>
## 🌍 Overview
AnnaSetu is a cloud-based web application that connects restaurants (donors) with NGOs (receivers) to reduce food wastage through real-time digital coordination.

The platform transforms surplus food listings into confirmed, trackable donations using a structured claim-based workflow.

# ✨ Core Features
## 👥 Role-Based Dashboards
Separate interfaces for:

🏪 Donors (Restaurants)

🤝 NGOs (Receivers)

Logical separation of access and visibility

## 📝 One-Click Surplus Posting
Restaurants can quickly post:

🍱 Food details

🔢 Number of meals

🏷️ Restaurant name

Stored securely in Firebase Firestore (NoSQL Database).

## 📋 Real-Time Donation Feed
Dynamic donation listings

Powered by Firestore onSnapshot() listeners

Instant updates without page refresh

## ✅ Claim Mechanism (Closed-Loop System)
NGOs can claim donations with one click

Donation status updates in database

Prevents duplicate collection

Ensures clear ownership and coordination

## 🏗️ System Architecture
Frontend (HTML, CSS, JS)
        ↓
Firebase Firestore (NoSQL)
        ↓
Real-Time Snapshot Listener
        ↓
Dynamic UI Rendering
Event-driven architecture ensures database updates immediately reflect on the UI.

## 🛠 Tech Stack
💻 Frontend
HTML5

CSS3

Vanilla JavaScript

☁️ Backend & Cloud
Firebase Firestore

Firebase Hosting

## ⚙️ Concepts Implemented
Event-driven programming

Real-time database synchronization

NoSQL document modeling

Role-based UI logic

Cloud deployment workflow

## 🔄 Workflow
Donor posts surplus food.

Data stored in Firestore.

NGO dashboard updates in real time.

NGO claims donation.

Database updates status.

UI reflects availability change.

## 📈 Future Scope
Account verification for NGOs & donors

Pickup scheduling & time windows

Auto-expiry of listings

Push notifications

Donation lifecycle tracking

Public impact analytics dashboard

## 🎯 Impact
AnnaSetu reduces:

Food wastage

Manual coordination delays

Duplicate pickups

And increases:

Transparency

Response time

Efficiency in food redistribution



