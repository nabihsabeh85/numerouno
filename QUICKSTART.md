# 🚀 Quick Start Guide - Numero Uno Portrait Studio

Get the website up and running in 5 minutes!

## ⚡ Fast Setup (Development)

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### 2. Configure Environment Variables

**Backend** (`backend/.env`):
```bash
PORT=5000
FRONTEND_URL=http://localhost:5173

# Get these from your accounts (see setup guides below)
STRIPE_SECRET_KEY=sk_test_...
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="..."
FIREBASE_CLIENT_EMAIL=...
FIREBASE_STORAGE_BUCKET=...
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
STORE_EMAIL=store@numerouno.com
```

**Frontend** (`frontend/.env`):
```bash
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit: **http://localhost:5173** 🎉

---

## 🔧 Quick Setup Guides

### Firebase (5 minutes)

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create new project → Enable Firestore → Enable Storage
3. Project Settings → Service Accounts → Generate New Private Key
4. Copy credentials to `.env`

**Storage Rules** (Public read):
```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```

### Stripe (3 minutes)

1. Sign up at [stripe.com](https://stripe.com)
2. Dashboard → Developers → API Keys
3. Copy "Publishable key" → `VITE_STRIPE_PUBLIC_KEY`
4. Copy "Secret key" → `STRIPE_SECRET_KEY`

**Test Card**: `4242 4242 4242 4242` (any future date, any CVC)

### Gmail App Password (2 minutes)

1. Enable 2FA: [myaccount.google.com/security](https://myaccount.google.com/security)
2. App Passwords → Select "Mail" → Generate
3. Copy 16-char password → `EMAIL_PASS`

---

## 📋 Testing Checklist

- [ ] Home page loads with hero section
- [ ] All pages accessible via navbar
- [ ] Upload page accepts images
- [ ] Can select print sizes and quantities
- [ ] Total price calculates correctly
- [ ] Stripe checkout opens
- [ ] Test payment succeeds (use `4242 4242 4242 4242`)
- [ ] Order success page displays
- [ ] Email received (check spam!)
- [ ] Admin dashboard shows order
- [ ] Can update order status

---

## 🎯 Quick Customization

### Update Studio Info

**Footer** (`frontend/src/components/Footer.jsx`):
```jsx
<p>123 Main Street</p>  // Your address
<a href="tel:+1234567890">  // Your phone
```

**Contact Page** (`frontend/src/pages/Contact.jsx`):
- Update phone, email, address
- Replace Google Maps embed with your location

### Change Colors

**Tailwind Config** (`frontend/tailwind.config.js`):
```js
colors: {
  primary: '#FFD700',   // Your primary color
  secondary: '#0033A0', // Your secondary color
}
```

### Add Real Photos

**Portfolio** (`frontend/src/pages/Portfolio.jsx`):
Replace sample images with your photos:
```jsx
const portfolioImages = [
  { id: 1, category: 'Family', image: '/images/family1.jpg', ... }
]
```

---

## 🐛 Common Issues

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000
# Kill process if needed
kill -9 <PID>
```

### Frontend build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Images won't upload
- Check Firebase credentials
- Verify Storage rules allow write
- Check console for errors

### Stripe checkout fails
- Verify public/secret keys match (both test or both live)
- Check Stripe dashboard for errors
- Use test card: `4242 4242 4242 4242`

---

## 📚 Next Steps

1. ✅ Test all features locally
2. 📝 Customize content and images
3. 🎨 Adjust colors and styling
4. 🚀 Deploy to production (see `DEPLOYMENT.md`)
5. 🔐 Add admin authentication
6. 📊 Set up analytics

---

## 💡 Pro Tips

- **Development**: Use Stripe test mode and test cards
- **Testing**: Check both customer and store emails
- **Debugging**: Check browser console and terminal logs
- **Firebase**: Monitor usage in Firebase Console
- **Stripe**: Watch webhook logs for payment issues

---

## 📞 Need Help?

Check the full documentation:
- `README.md` - Complete setup and features
- `DEPLOYMENT.md` - Production deployment guide

---

**You're all set! Start building! 🚀**

*"Your memories are in good hands."*

