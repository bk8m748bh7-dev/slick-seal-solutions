# cPanel Deployment Guide for NuSeal Waterproofing

## ⚠️ Security Notice
**IMPORTANT:** Change your database password immediately! The credentials shared in chat are publicly visible.

## Step-by-Step Deployment

### 1. Get Your Code
First, download your project code from Lovable:
1. Click the **GitHub** icon in the top right of Lovable
2. Transfer your code to GitHub (if not already done)
3. Download the repository as a ZIP file from GitHub
4. Extract the ZIP file on your computer

**OR** if you already have the code, skip to building.

### 2. Build the Project

#### Option A: Build on Your Computer (Recommended)
**Requirements:** Node.js 18+ installed on your computer

1. Open Terminal (Mac/Linux) or Command Prompt (Windows)
2. Navigate to your project folder:
   ```bash
   cd path/to/your/project
   ```
3. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```
4. A `dist` folder will be created with your production files

#### Option B: Build via cPanel SSH Terminal
**Requirements:** SSH access enabled on your cPanel account

1. In cPanel, open **Terminal** (under "Advanced" section)
2. Navigate to a temporary directory:
   ```bash
   cd ~/tmp
   ```
3. Upload your project ZIP file to cPanel File Manager (`~/tmp/`)
4. Unzip and build:
   ```bash
   unzip project.zip
   cd project-folder
   npm install
   npm run build
   ```
5. The `dist` folder is now ready to copy to `/public_html/new/`

#### Option C: Request Built Files
If you cannot build locally and don't have SSH access:
1. Ask your developer or someone with Node.js to build for you
2. They need to send you the `dist` folder contents only
3. Upload those files directly to `/public_html/new/`

### 3. Upload to cPanel
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

### 4. Setup Database
1. Open **cPanel → phpMyAdmin**
2. Select database: `nusealwaterproof_new`
3. Click **SQL** tab
4. Copy contents from `api/setup.sql` and execute
5. Verify the `contact_submissions` table was created

### 5. Configure PHP Files
1. Navigate to `/public_html/new/api/config.php`
2. **Update the database password** to your new secure password
3. Verify database credentials are correct

### 6. Set Permissions (CRITICAL - This fixes the 403 error!)
Using cPanel File Manager:
1. Navigate to `/public_html/new/`
2. Right-click on `.htaccess` → **Change Permissions**
3. Set to **644** (Owner: Read+Write, Group: Read, World: Read)
4. Do the same for:
   - `api/config.php` → 644
   - `api/contact.php` → 644

Or via SSH:
```bash
cd /public_html/new/
chmod 644 .htaccess
chmod 644 api/config.php
chmod 644 api/contact.php
```

**If .htaccess is still not working:**
- Make sure the filename is exactly `.htaccess` (with the dot at the start)
- Enable "Show Hidden Files" in cPanel File Manager to see it
- If you uploaded via FTP, re-upload in ASCII mode (not binary)

### 7. Test the Contact Form
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

### 403 Forbidden / htaccess error?
**"Server unable to read htaccess file"** means wrong permissions:
1. In cPanel File Manager, go to `/public_html/new/`
2. Click "Settings" (top right) → Check "Show Hidden Files"
3. Find `.htaccess` file (should be visible now)
4. Right-click → Change Permissions → Set to **644**
5. Refresh your website

**Still not working?**
- Ensure mod_rewrite is enabled (ask your hosting provider)
- Check if `.htaccess` is in the correct location: `/public_html/new/.htaccess`
- Try renaming it to `htaccess.txt`, then back to `.htaccess`

### 404 on page reload?
- First fix the 403 error above
- Verify `.htaccess` file is uploaded and has 644 permissions
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
