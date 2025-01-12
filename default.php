<?php
// Dynamic content for SEO purposes
$pageTitle = "Welcome to K Primus";
$pageDescription = "Explore the default landing page optimized for performance and security.";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title><?php echo htmlspecialchars($pageTitle); ?></title>
    <link rel="icon" type="image/x-icon" href="https://hpanel.hostinger.com/favicons/hostinger.png">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="description" content="<?php echo htmlspecialchars($pageDescription); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Security Improvements -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://fonts.googleapis.com;">
    
    <!-- Optimized Fonts Request -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Inline Critical CSS -->
    <style>
        body { margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; 
               width: 100vw; height: 100vh; font-family: 'DM Sans', sans-serif; text-align: center; }
        h1 { font-size: 2rem; font-weight: bold; }
        p { font-size: 1rem; }
        a { color: #007BFF; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <h1><?php echo htmlspecialchars($pageTitle); ?></h1>
    <p><?php echo htmlspecialchars($pageDescription); ?></p>
    <a href="enquiry.php">Contact Us</a>
</body>
</html>
