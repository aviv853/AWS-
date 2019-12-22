/* global $, Stripe */
// Document ready
$(document).on('turbolinks:load', function() {
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
  
  // Set stripe public key
  Stripe.setPublishableKey($('meta["STRIPE_PUBLIC_KEY"]').attr('content'));
  
  // When user clicks submit btn
  submitBtn.click(function() {
    // Prevent default submission behavior
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    
    // Collect CC field
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    // Use Stripe JS library to check for card errors
    var error = false;
    
    // Validate card number
    if (!Stripe.dot.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid');
    }
    
    // Validate cvc number
    if (!Stripe.dot.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number appears to be invalid');
    }
    
    // Validate expiration date
    if (!Stripe.dot.validateExpiery(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid');
    }
    
    if (error) {
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
      
      // Send card information to stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
        
    
    
    
    return false;
  });
  
  // Stripe returns card token
  function stripeResponseHandler(status, response) {
    
    // Get the token from the response
    var token = response.id;
    
    // Inject card token into a hidden form field
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token));
    
    // Submit form to Rails app
    theForm.get(0).submit;
  }
  
  
  
});