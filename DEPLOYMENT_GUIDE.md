# cPanel Deployment Guide for NuSeal Waterproofing

## ⚠️ Security Notice
**IMPORTANT:** Change your database password immediately! The credentials shared in chat are publicly visible.

## Step-by-Step Deployment

### 1. Build the Project
```bash
npm install
npm run build
```
This creates a `dist` folder with your production files.

### 2. Upload to cPanel
- Upload everything from the `dist` folder to `/public_html/new/`
- Upload the `public/api/` folder to `/public_html/new/api/`
- Upload `public/.htaccess` to `/public_html/new/.htaccess`

Your structure should look like:
```
/public_html/new/
├── index.html
├── assets/
├── api/
│   ├── config.php
│   ├── contact.php
│   └── setup.sql
└── .htaccess
```

### 3. Setup Database
1. Open **cPanel → phpMyAdmin**
2. Select database: `nusealwaterproof_new`
3. Click **SQL** tab
4. Copy contents from `api/setup.sql` and execute
5. Verify the `contact_submissions` table was created

### 4. Configure PHP Files
1. Navigate to `/public_html/new/api/config.php`
2. **Update the database password** to your new secure password
3. Verify database credentials are correct

### 5. Set Permissions
```bash
chmod 644 api/config.php
chmod 644 api/contact.php
chmod 644 .htaccess
```

### 6. Test the Contact Form
1. Visit: `http://nusealwaterproofing.co.za/new`
2. Scroll to contact section
3. Fill out and submit the form
4. Check phpMyAdmin for the submission in `contact_submissions` table

## Troubleshooting

### Form not submitting?
- Check browser console for errors
- Verify API path is accessible: `http://nusealwaterproofing.co.za/new/api/contact.php`
- Check PHP error logs in cPanel

### Database connection failed?
- Verify database name, username, and password in `config.php`
- Ensure database user has privileges on the database
- Check if MySQL service is running

### 404 on page reload?
- Verify `.htaccess` file is uploaded
- Check if mod_rewrite is enabled in cPanel

### Email notifications not working?
- cPanel may require specific email configuration
- Consider using a service like SendGrid or SMTP

## Viewing Submissions

### In phpMyAdmin:
```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC;
```

### Using the view:
```sql
SELECT * FROM recent_submissions;
```

## Next Steps

1. ✅ Change database password
2. ✅ Test contact form thoroughly
3. ✅ Setup SSL certificate (Let's Encrypt in cPanel)
4. ✅ Configure email notifications
5. ✅ Add Google Analytics (optional)
6. ✅ Setup automated database backups

## Support Files

- **config.php**: Database connection and CORS settings
- **contact.php**: API endpoint for form submissions
- **setup.sql**: Database table creation script
- **.htaccess**: URL rewriting for React Router

## Production Checklist

- [ ] Database password changed
- [ ] SSL certificate installed
- [ ] Contact form tested and working
- [ ] Email notifications configured
- [ ] Error logging enabled
- [ ] Database backups scheduled
- [ ] Real contact info updated in code
