# 📸 Numero Uno Portrait Studio Website

A modern, full-stack web application for Numero Uno Portrait Studio featuring online photo print ordering, Stripe payments, and order management.

## 🌟 Features

### Customer Features
- **Home Page**: Hero section, services overview, testimonials, and CTAs
- **About Page**: Studio history, values, and timeline
- **Services Page**: Comprehensive service offerings with pricing
- **Portfolio Page**: Photo gallery with category filters and lightbox
- **Contact Page**: Contact form with Google Maps integration
- **FAQ Page**: Collapsible Q&A sections
- **Upload & Order**: Photo upload, size selection, quantity, and secure checkout
- **Order Success**: Confirmation page with pickup details

### Admin Features
- **Admin Dashboard**: View and manage all orders
- **Status Management**: Update order status (Processing → Ready → Completed)
- **Email Notifications**: Automatic emails when orders are ready

### Technical Features
- **Stripe Integration**: Secure payment processing
- **Firebase**: Cloud storage and database
- **Email System**: Automated email notifications
- **Responsive Design**: Mobile-first, beautiful UI
- **Modern Stack**: React, Tailwind CSS, Node.js, Express

## 🛠️ Tech Stack

### Frontend
- React 18 (Vite)
- React Router DOM
- Tailwind CSS
- Axios
- Stripe.js
- React Icons

### Backend
- Node.js
- Express
- Firebase Admin SDK
- Stripe
- Nodemailer
- Multer (file uploads)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Firebase project with Firestore and Storage
- Stripe account (test mode keys)
- Gmail account or SMTP server for emails

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd numero-uno
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

**Configure your `.env` file:**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
STORE_EMAIL=store@numerouno.com
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your settings
nano .env
```

**Configure your `.env` file:**
```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore Database**
3. Enable **Storage** with public read rules
4. Generate a service account key:
   - Project Settings → Service Accounts
   - Generate New Private Key
   - Copy credentials to `.env`

### Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get test API keys from Dashboard
3. Set up webhook endpoint:
   - Point to `https://your-backend-url.com/api/stripe/webhook`
   - Select event: `checkout.session.completed`
   - Copy webhook secret to `.env`

### Email Setup (Gmail)

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App Passwords
   - Generate password for "Mail"
3. Use app password in `EMAIL_PASS`

## 📁 Project Structure

```
numero-uno/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   └── Admin.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── stripeRoutes.js
│   │   │   ├── uploadRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── config/
│   │   │   ├── firebase.js
│   │   │   ├── stripe.js
│   │   │   └── email.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🎨 Brand Guidelines

- **Primary Color**: Yellow `#FFD700`
- **Secondary Color**: Blue `#0033A0`
- **Font**: Poppins
- **Tagline**: "Your memories are in good hands."

## 🔐 Security Notes

- Never commit `.env` files
- Use test Stripe keys in development
- Implement authentication for admin dashboard in production
- Set proper CORS origins
- Use HTTPS in production

## 📧 Email Templates

The system sends three types of emails:

1. **Order Confirmation** (to customer)
2. **New Order Notification** (to store)
3. **Order Ready** (to customer when status = "Ready")

## 🚢 Deployment

### Frontend (Vercel)

```bash
cd frontend
vercel
```

Set environment variables in Vercel dashboard:
- `VITE_API_URL`
- `VITE_STRIPE_PUBLIC_KEY`

### Backend (Render/Railway)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy with:
   - Build Command: `npm install`
   - Start Command: `npm start`

## 📱 Pages Overview

### Customer-Facing Pages
1. **/** - Home with hero, services, and testimonials
2. **/about** - Studio history and values
3. **/services** - Service offerings with pricing
4. **/portfolio** - Photo gallery with filters
5. **/contact** - Contact form and location
6. **/faq** - Frequently asked questions
7. **/upload** - Upload photos and place orders
8. **/order-success** - Order confirmation

### Admin Pages
9. **/admin** - Order management dashboard

## 🐛 Troubleshooting

### Upload Issues
- Check Firebase Storage rules
- Verify file size limits (10MB)
- Ensure bucket name is correct

### Payment Issues
- Verify Stripe keys are correct
- Check webhook endpoint is accessible
- Use Stripe test cards for testing

### Email Issues
- Verify Gmail app password
- Check SMTP settings
- Review email logs in console

## 📝 API Endpoints

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `PATCH /api/orders/:id/status` - Update order status

### Upload
- `POST /api/upload` - Upload photos

### Stripe
- `POST /api/stripe/create-checkout-session` - Create payment
- `POST /api/stripe/webhook` - Stripe webhook
- `GET /api/stripe/session/:id` - Get session details

## 🎯 Future Enhancements

- [ ] Admin authentication
- [ ] SMS notifications
- [ ] Photo editing tools
- [ ] Customer account system
- [ ] Appointment booking
- [ ] Gift cards
- [ ] Photo packages/bundles
- [ ] Reviews integration

## 📞 Support

For questions or issues:
- Email: info@numerouno.com
- Phone: (123) 456-7890
- Address: 123 Main Street, Your City, ST 12345

## 📄 License

© 2025 Numero Uno Portrait Studio. All rights reserved.

---

**Built with ❤️ for Numero Uno Portrait Studio**

*"Your memories are in good hands."*

