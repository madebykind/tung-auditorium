// Get querystring
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get('Error');
const hash = window.location.hash;
const formWrapper = document.getElementById("newsletter-form");
const thanksWrapper = document.getElementById("newsletter-thanks");
const errorEl = document.getElementById("error");
let errorText;


  console.log(error);
// If exists, handle error
if(error) {
  console.log(errorEl);
  switch(error) {
    case "NoEmail":
      errorText = "You didn't enter an email address."
      break;
    case "NoLastName":
      errorText = "You didn't enter an last name."
      break;
    case "InvalidEmail":
      errorText = "The email address you enter was invalid."
      break;
    case "EmailAddressTooLong":
      errorText = "The email address you enter was more than 255 characters."
      break;
    case "FirstNameTooLong":
      errorText = "The first name you enter was more than 30 characters."
      break;
    case "LastNameTooLong":
      errorText = "The last name you enter was more than 80 characters."
      break;
    default:
      errorText = "Something went wrong."
  }
  console.log(errorEl);

  errorEl.innerHTML = errorText + " Please try again."
  errorEl.classList.remove("hidden");

} else if (hash === "#newsletter") {
  formWrapper.classList.add("hidden");
  thanksWrapper.classList.remove("hidden");
}