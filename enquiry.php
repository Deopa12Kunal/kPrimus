<?php
// Define the recipient's email address
$to = 'sales@kprimus.in';

// Define the website name
$websiteName = 'K Primus';

// Define the email subject
$subject = 'Enquiry from ' . $websiteName;

// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Get the form data
  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $message = $_POST['message'];
  $email = $_POST['email'];
  $budget = $_POST['budget']; // Get the budget from the form

  // Validate the form data
  $errors = array();
  if (empty($name)) {
    $errors[] = 'Name is required';
  }
  if (empty($phone)) {
    $errors[] = 'Phone is required';
  }
  if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email is required and must be valid';
  }
  if (empty($budget)) {
    $errors[] = 'Budget is required';
  } else {
    // Check if budget is less than 2 cr
    if (str_replace(' cr ', '', $budget) < 2) {
      ?>
      <script language="javascript">
        // Display error message and redirect
        alert("Budget should be at least 2 cr. Please enter a valid budget.");
        document.location = "https://kprimus.in";
      </script>
      <?php
      exit;
    }
  }

  // Validate the message field to prevent potential security vulnerabilities
  $message = strip_tags($message);
  $message = htmlentities($message, ENT_QUOTES, 'UTF-8');

  // If there are no errors, send the email
  if (count($errors) == 0) {
    $message_body = "Name: $name\nPhone: $phone\nMessage: $message\nEmail: $email\nBudget: $budget";
    $headers = 'From: ' . $websiteName . ' <no-reply@kprimus.in>' . "\r\n" .
      'Reply-To: ' . $name . ' <' . $email . '>' . "\r\n" .
      'MIME-Version: 1.0' . "\r\n" .
      'Content-Type: text/plain; charset=UTF-8';

    // Use a more secure way to send emails, such as using a library like PHPMailer or SwiftMailer
    // For this example, we'll use the built-in mail() function
    if (mail($to, $subject, $message_body, $headers)) {
      // Redirect to the "thanks" page
      header('Location: thanks.html');
      exit;
    } else {
      echo '<h2>Error sending email!</h2>';
    }
  } else {
    // Display the errors
    echo '<h2>The following errors occurred:</h2>';
    foreach ($errors as $error) {
      echo "<p>$error</p>";
    }
  }
}
?>