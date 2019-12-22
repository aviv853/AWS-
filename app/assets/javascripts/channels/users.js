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
    
    // Collect CC field
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val()
        
    // Send information to stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });
  
  
  
  // Stripe returns card token
  // Inject card token into a hidden form field
  // Submit form to Rails app
});