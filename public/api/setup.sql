-- Run this SQL in your cPanel phpMyAdmin to create the contact submissions table

CREATE TABLE IF NOT EXISTS `contact_submissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('new','contacted','completed') DEFAULT 'new',
  PRIMARY KEY (`id`),
  KEY `created_at` (`created_at`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: Create an admin view for easier management
CREATE OR REPLACE VIEW `recent_submissions` AS
SELECT 
  id,
  name,
  email,
  phone,
  LEFT(message, 100) as message_preview,
  created_at,
  status
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 50;
