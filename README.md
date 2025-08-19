# K-Ville Festivals — React + Firebase + Bootstrap 5

🎉 **Ganesh Chaturthi Festival Event Registration System**

A modern, responsive web application for society festival event registration with Google Authentication, real-time data management, and admin controls.

## ✨ Features

### 🔐 Authentication
- **Google Sign-in Only** - Secure authentication via Gmail accounts
- Auto-redirect to profile setup after first login
- Popup-blocked error handling

### 👤 User Management
- **Profile Management** - Name, age, gender, wing (A/B/C), flat number, mobile
- **Event Registration** - Submit entries for Dance, Singing, Rangoli, Skit, Drawing
- **Team Management** - Dynamic team member addition/removal (max 10 members)
- **My Submissions** - View, edit, delete personal submissions with timestamps

### 🎭 Event System
- **5 Activities** - Dance, Singing (team), Rangoli, Skit (team), Drawing (individual)
- **Smart Forms** - Dynamic fields based on activity type
- **One Entry Per Activity** - Prevents duplicate submissions
- **Character Limits** - Title (100), Team Name (25), Names (50)

### 🛡️ Admin Features
- **Admin Panel** - View all submissions with filtering
- **Excel Export** - Download submissions data
- **Role-based Access** - Admin links visible only to authorized users

### 📱 Modern UI/UX
- **Bootstrap 5** - Responsive design with custom light blue theme
- **Material Icons** - Consistent iconography
- **Auto-hide Messages** - Success/error messages disappear after 5 seconds
- **Mobile Friendly** - Works seamlessly on all devices

### 📄 Additional Pages
- **Event Details** - Complete rules, guidelines, and prize information
- **Contact Us** - Support contacts and society information

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Setup
Create **.env** with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Deploy to Firebase Hosting
```bash
npm run build
firebase deploy
```

## 🏗️ Tech Stack

- **Frontend**: React 18, Bootstrap 5, Material Icons
- **Backend**: Firebase (Auth, Firestore, Hosting)
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Export**: XLSX for Excel downloads

## 📊 Database Structure

### Collections:
- **`users/{uid}`** - User profiles (name, age, gender, flat_number, mobile_number)
- **`submissions/{docId}`** - Event submissions with user data and team members
- **`admins/{uid}`** - Admin access control (empty documents)

### Sample Submission Document:
```json
{
  "uid": "user123",
  "activity": "Dance",
  "title": "Bollywood Fusion",
  "name": "John Doe",
  "age": "25",
  "gender": "Male",
  "flat_number": "B-401",
  "mobile_number": "9876543210",
  "team_name": "Fire Dancers",
  "members": [
    {"name": "John Doe", "age": "25", "flat_number": "B-401"},
    {"name": "Jane Smith", "age": "23", "flat_number": "A-302"}
  ],
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

## 🔒 Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() { return request.auth != null; }
    function isAdmin() {
      return isSignedIn() && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    match /users/{userId} {
      allow read, write: if isSignedIn() && (request.auth.uid == userId || isAdmin());
    }

    match /submissions/{docId} {
      allow create: if isSignedIn() && request.resource.data.uid == request.auth.uid;
      allow read: if isSignedIn() && (resource.data.uid == request.auth.uid || isAdmin());
      allow update, delete: if isSignedIn() && (resource.data.uid == request.auth.uid || isAdmin());
    }

    match /admins/{uid} {
      allow read: if isAdmin();
      allow write: if false;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
    }
    match /uploads/{uid}/{allPaths=**} {
      allow write: if request.auth != null && request.auth.uid == uid
                    && request.resource != null
                    && request.resource.contentType.matches('audio/.*');
    }
  }
}
```

## 🔧 Configuration

### Making Users Admin
1. Go to Firebase Console → Firestore
2. Create collection `admins`
3. Add document with ID = user's `uid` (empty document)
4. User will see Admin menu option on next login

### Authorized Domains
Add your domain to Firebase Auth → Settings → Authorized domains:
- `localhost` (for development)
- `your-domain.web.app` (for production)

## 🎯 Key Features Explained

### Wing-Flat System
- Users select Wing (A/B/C) and Flat Number separately
- Stored as combined format: `"B-401"`
- Consistent across user profiles and team members

### Team Activities
- Dance, Singing, Skit support teams (1-10 members)
- Form submitter is automatically Member 1
- Each member has name, age, wing, and flat number

### Smart Validation
- Prevents duplicate submissions per activity
- Character limits enforced on frontend
- Required fields validation

## 🌐 Live Demo
**URL**: https://kville-festivals.web.app

## 📝 License
MIT License - Feel free to use for your society events!

---

**Built with ❤️ for community festivals**