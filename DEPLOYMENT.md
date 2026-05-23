# 🚀 Deployment Guide - Numero Uno Portrait Studio

## Pre-Deployment Checklist

- [ ] Firebase project created and configured
- [ ] Stripe account set up with API keys
- [ ] Gmail app password generated
- [ ] All environment variables documented
- [ ] Frontend built and tested locally
- [ ] Backend tested with production-like settings

## 🔧 Environment Variables

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-url.com
VITE_STRIPE_PUBLIC_KEY=pk_live_your_production_key
```

### Backend (Render/Railway)
```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.vercel.app

STRIPE_SECRET_KEY=sk_live_your_production_key
STRIPE_WEBHOOK_SECRET=whsec_your_production_webhook_secret

FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
STORE_EMAIL=store@numerouno.com
```

## 📦 Frontend Deployment (Vercel)

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variables
7. Deploy!

### Post-Deployment Steps

1. Copy the deployed URL (e.g., `https://numero-uno.vercel.app`)
2. Update `FRONTEND_URL` in backend environment variables
3. Update Stripe webhook settings if needed

## 🖥️ Backend Deployment

### Option A: Render

#### Step 1: Prepare Repository
```bash
# Ensure render.yaml exists in backend/
# Commit all changes
git add .
git commit -m "Prepare for deployment"
git push
```

#### Step 2: Deploy on Render

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: numero-uno-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free or Starter

5. Add environment variables (from list above)
6. Click "Create Web Service"

#### Step 3: Configure Stripe Webhook

1. Copy your Render backend URL (e.g., `https://numero-uno-backend.onrender.com`)
2. Go to Stripe Dashboard → Developers → Webhooks
3. Add endpoint: `https://numero-uno-backend.onrender.com/api/stripe/webhook`
4. Select event: `checkout.session.completed`
5. Copy webhook signing secret
6. Update `STRIPE_WEBHOOK_SECRET` in Render environment variables

### Option B: Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Navigate to backend
cd backend

# Initialize and deploy
railway init
railway up
```

Configure environment variables in Railway dashboard.

## 🔥 Firebase Configuration

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow read, write: if true; // In production, add authentication
    }
  }
}
```

### Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{fileName} {
      allow read: if true;
      allow write: if request.resource.size < 10 * 1024 * 1024 // 10MB
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

Deploy rules:
```bash
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

## 💳 Stripe Configuration

### Switch to Live Mode

1. Toggle from "Test mode" to "Live mode" in Stripe Dashboard
2. Get live API keys: Dashboard → API keys
3. Update environment variables with live keys
4. Set up webhook for production URL
5. Test with real card (small amount)

### Test Cards (for testing only)

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

## 📧 Email Configuration

### Gmail Setup

1. Enable 2-Factor Authentication
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App Passwords
   - Select "Mail" and device
   - Copy 16-character password
3. Use in `EMAIL_PASS` environment variable

### SendGrid (Alternative)

If using SendGrid instead:
```bash
npm install @sendgrid/mail
```

Update `backend/src/config/email.js` accordingly.

## 🔍 Testing Deployment

### Frontend Tests
```bash
# Test all routes
https://your-site.vercel.app/
https://your-site.vercel.app/about
https://your-site.vercel.app/services
https://your-site.vercel.app/portfolio
https://your-site.vercel.app/contact
https://your-site.vercel.app/faq
https://your-site.vercel.app/upload
https://your-site.vercel.app/admin
```

### Backend Tests
```bash
# Health check
curl https://your-backend-url.com/health

# Should return: {"status":"OK","message":"Numero Uno Backend is running"}
```

### End-to-End Test

1. Upload photos on `/upload`
2. Select sizes and quantities
3. Enter customer info
4. Complete Stripe checkout (use test card first!)
5. Verify confirmation email received
6. Check admin dashboard for new order
7. Update order status to "Ready"
8. Verify "ready" email received

## 🔒 Security Checklist

- [ ] All `.env` files are in `.gitignore`
- [ ] Using HTTPS for all URLs
- [ ] CORS configured with specific origins (not `*`)
- [ ] Stripe webhook secret is secure
- [ ] Firebase private key is secure
- [ ] Email credentials are secure
- [ ] Admin routes protected (TODO: add authentication)
- [ ] File upload size limits enforced
- [ ] Input validation on all forms
- [ ] Rate limiting considered for production

## 🎯 Post-Deployment Tasks

1. **Update URLs**
   - Change all hardcoded URLs to production URLs
   - Update Google Maps embed code with real address
   - Update contact information (phone, email, address)

2. **Content Updates**
   - Replace placeholder images in portfolio
   - Add real testimonials
   - Update hours of operation
   - Add real social media links

3. **SEO & Analytics**
   - Add meta tags for SEO
   - Set up Google Analytics
   - Submit sitemap to Google Search Console
   - Set up Google My Business

4. **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor Stripe webhooks
   - Check email delivery rates
   - Monitor Firebase usage

## 🐛 Common Issues

### Issue: Stripe webhook not working
**Solution**: 
- Verify webhook URL is correct
- Check webhook secret matches
- Ensure backend is publicly accessible
- Check Stripe webhook logs

### Issue: Emails not sending
**Solution**:
- Verify Gmail app password
- Check email credentials
- Review SMTP settings
- Check spam folder

### Issue: File upload failing
**Solution**:
- Check Firebase Storage rules
- Verify bucket name
- Check file size limits
- Ensure Firebase credentials are correct

### Issue: CORS errors
**Solution**:
- Update `FRONTEND_URL` in backend
- Check CORS configuration in `server.js`
- Verify protocol (http vs https)

## 📊 Monitoring & Maintenance

### Daily
- Check admin dashboard for new orders
- Monitor email delivery

### Weekly
- Review Firebase usage/costs
- Check Stripe transactions
- Review error logs

### Monthly
- Update dependencies
- Security audit
- Performance review
- Backup database

## 🆘 Support & Troubleshooting

If you encounter issues:

1. Check logs in Vercel/Render dashboard
2. Review Firebase console for errors
3. Check Stripe webhook logs
4. Verify all environment variables
5. Test with Stripe test mode first

## 📝 Rollback Plan

If deployment fails:

1. Revert to previous Git commit
2. Redeploy previous version
3. Check error logs for root cause
4. Fix issues in development
5. Test thoroughly before redeploying

---

**Congratulations! Your Numero Uno Portrait Studio website is now live! 🎉**

Remember: "Your memories are in good hands."

