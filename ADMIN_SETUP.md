# Admin Setup Guide

## Creating Your First Admin Account

Since this application uses Supabase authentication, you'll need to create an admin user account through the Supabase dashboard.

### Steps to Create Admin Account:

1. **Go to your Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project

2. **Access Authentication**
   - Click on "Authentication" in the left sidebar
   - Click on "Users" tab

3. **Create New User**
   - Click "Add User" or "Invite User"
   - Enter your admin email address
   - Enter a secure password
   - Click "Create User"

4. **Verify Email (if enabled)**
   - Check your email for verification link
   - Click the verification link

5. **Login to Admin Panel**
   - Navigate to: `/login.html` on your website
   - Enter the email and password you just created
   - Click "Sign In"

## Alternative: Use Supabase CLI

If you prefer command line:

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Create user via SQL
supabase db execute "
SELECT auth.create_user(
  email := 'admin@example.com',
  password := 'your-secure-password',
  email_confirm := true
);
"
```

## Troubleshooting

### Login Not Working
- Verify email confirmation is complete (if enabled)
- Check browser console for errors
- Ensure Supabase URL and Anon Key are correct in `.env`

### Can't Access Admin Panel
- Make sure you're logged in at `/login.html` first
- Clear browser cache and cookies
- Check that authentication is properly configured in Supabase

### Password Reset
If you forget your password:
1. Go to Supabase Dashboard → Authentication → Users
2. Find your user
3. Click the three dots menu
4. Select "Send password recovery"
5. Check your email and follow the reset link
