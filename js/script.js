const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#mail");
const jobSelect = document.querySelector("#title");
const otherJob = document.querySelector("#other-title");

const designShirt =document.querySelector("#design");
const colorShirtDiv = document.querySelector("#colors-js-puns");
const colorShirt = document.querySelector("#color");

const activitiesField = document.querySelector(".activities")
const activities = activitiesField.children;

const payment = document.querySelector("#payment");
const creditCard = document.querySelector("#credit-card");
const ccNum = document.querySelector("#cc-num");
const zip = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
const paypal = document.querySelector("#paypal");
const bitcoin = document.querySelector("#bitcoin");


const nameInvalid = document.querySelector("#nameInvalid");
const emailInvalid = document.querySelector("#emailInvalid");
const actInvalid = document.querySelector("#actInvalid");
const shirtInvalid = document.querySelector("#shirtInvalid");
const paymentInvalid = document.querySelector("#paymentInvalid");
const ccNumInvalid = document.querySelector("#ccInvalid");
const zipInvalid = document.querySelector("#zipInvalid");
const cvvInvalid = document.querySelector("#cvvInvalid");

const registerButton = document.querySelector("button");



//Set focus on the first input field

window.addEventListener("load", (e) =>{
 nameInput.focus();
});

otherJob.style.display = "none"

jobSelect.addEventListener("change", (e)=>{
    if(jobSelect.value === "other"){
        otherJob.style.display = "block";
    } else{
        otherJob.style.display = "none";
    }
});

//Shirt color selector is not displayed when no theme is selected, when something is changes to the 
//theme selector the function evaluates the value and either displays the color selector with the right colors
// or doesn't show the color selector part
colorShirtDiv.style.display = "none";

designShirt.addEventListener("change", (e) => {
    colorShirt.value = "select-color";
    if(designShirt.value === "js puns"){
        colorShirtDiv.style.display = "block";
        for(let i = 1; i<4; i++){
        colorShirt.children[i].style.display = "block"
        colorShirt.children[i+3].style.display = "none"
        }
    } else if(designShirt.value === "heart js"){
        colorShirtDiv.style.display = "block";
        for(let i = 1; i<4; i++){
        colorShirt.children[i].style.display = "none"
        colorShirt.children[i+3].style.display = "block"
        }
    } else{
    colorShirtDiv.style.display = "none";
    }
});



//For the activities that have overlap it is evaluated on change to one of the checkboxes if there are restrictions created
//if there are restrictions the user is unable to select the checkbox with overlap
//also the amount of money spend in total is evaluated on change to one of the checkboxes and the amount displayed at the end of all activities is changed
activitiesField.addEventListener("change", (e) =>{
   overlapAct(2,4);
   overlapAct(3,5);
   let count = 0;
   if(activities[1].getElementsByTagName("input")[0].checked){
        count+=200;
    }
    for(let i = 2; i < 8; i++){
        if(activities[i].getElementsByTagName("input")[0].checked){
            count+=100;
        }
    }
    
        activities[8].textContent = "Total: $"+count;
    

});


//First make the credit card as default payment method and hide the other payment methods
//Then for every change to the payment selector the right payment method is displayed
payment.value = "credit card";
paypal.style.display = "none";
bitcoin.style.display = "none";

payment.addEventListener("change", (e)=>{
    if(payment.value === "credit card"){
        creditCard.style.display = "block"
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    } else if(payment.value === "paypal"){
        creditCard.style.display = "none"
        paypal.style.display = "block";
         bitcoin.style.display = "none";
    } else if(payment.value === "bitcoin"){
        creditCard.style.display = "none"
        paypal.style.display = "none";
        bitcoin.style.display = "block";
    } else {
        creditCard.style.display = "none"
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    }
});

//real time form validations are created for name, email, ccnum, zip and cvv code using a function
eventListenerValidInput(nameInput, nameVal, nameInvalid);
eventListenerValidInput(emailInput, emailVal, emailInvalid);
eventListenerValidInput(ccNum, ccfieldVal, ccNumInvalid)
eventListenerValidInput(zip, zipfieldVal, zipInvalid);
eventListenerValidInput(cvv, cvvfieldVal, cvvInvalid);



//When the register button is clicked the form is evaluated and for input field borders are coloured red if the input is invalid
//also the tshirt section is evaluated for no input and if needed displays a message that a theme and colour should be selected
//furthermore if no activities are selected (total payment is 0) a message is shown 1 activity should be selected
//lastly if no payment method is selected a message is shown
//For good submissions the page reloads if everything is valid otherwise goes to the top if name or email is invalid, 
//goes to middle when shirt or activities is invalid or stays at the bottom if payment is invalid
actInvalid.style.display = "none"
shirtInvalid.style.display = "none"
paymentInvalid.style.display = "none"
registerButton.addEventListener("click", (e)=>{
    e.preventDefault();
    redBorder(emailVal, emailInput);
    redBorder(nameVal, nameInput);

    if(payment.value === "credit card"){
        redBorder(ccfieldVal, ccNum);
        redBorder(zipfieldVal, zip);
        redBorder(cvvfieldVal, cvv);
    } 
    if(payment.value ==="select method"){
        paymentInvalid.style.display = "block" 
    } else{
        paymentInvalid.style.display = "none" 
    }

    if(activities[8].textContent === "Total: $0"){
        actInvalid.style.display = "block"
    } else{
        actInvalid.style.display = "none"   
    }

    if(designShirt.value === "select-theme" || colorShirt.value === "select-color"){
        shirtInvalid.style.display = "block"
    } else{
        shirtInvalid.style.display = "none"   
    }
    
    if(nameVal(nameInput.value) && emailVal(emailInput.value) && payment.value !=="select method" && ((ccfieldVal(ccNum.value) && zipfieldVal(zip.value) && cvvfieldVal(cvv.value))|| payment.value !== "credit card") && activities[8].textContent !== "Total: $0" && designShirt.value !== "select-theme" && colorShirt.value !== "select-color"){
       window.location.reload(true);
    } else if(!nameVal(nameInput.value) || !emailVal(emailInput.value) ){
        document.documentElement.scrollTop = 0;
    } else if(activities[8].textContent === "Total: $0" || designShirt.value === "select-theme" || colorShirt.value === "select-color"){
        document.documentElement.scrollTop = 550;
    }

});

//fuction to make the borders of the input fields red if input is invalid or the default colour if input is valid
function redBorder(validationF, inputField){
    if(!validationF(inputField.value)){
        inputField.style.borderColor = "red";
     } else {
        inputField.style.borderColor = "rgb(111, 157, 220)";
     }

}

//creates real time event listener and shows the h4 with message that input is invalid if that is the case
function eventListenerValidInput (field, validation, toShowBox) {
    toShowBox.style.display = "none";

       field.addEventListener("input", (e) =>{
        if(!validation(field.value)){
            toShowBox.style.display = "block"
        } else {
            toShowBox.style.display = "none"        
        }
    });

}

//checks if name is valid
function nameVal(name) {
  return  /[a-zA-Z0-9]+/.test(name);
}

//checks if email is valid
function emailVal (email){
   return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
}

//checks if 1 activity is selected
function activitiesVal() {
    let count = 0;
 for(let i = 1; i < 8; i++){
    if(activities[i].getElementsByTagName("input")[0].checked){
        return true;
    }
 }
 return false;

}

//checks if cc number has 13 to 16 digits
function ccfieldVal(number) {
    return /^[0-9]{13,16}$/.test(number);
}

//checks if zip is 5 digits
function zipfieldVal(number) {
    return /^[0-9]{5}$/.test(number);
}

//checks if cvv is 3 digits
function cvvfieldVal(number) {
    return /^[0-9]{3}$/.test(number);
}


//disables or enables activities that have overlap when change is made to one of them
function overlapAct (num1, num2) {
    if(activities[num1].getElementsByTagName("input")[0].checked){
        disableAct(activities[num2]);
      }
     else if(!activities[num1].getElementsByTagName("input")[0].checked){
        ableAct(activities[num2]);
      }
        
      if(activities[num2].getElementsByTagName("input")[0].checked){
        disableAct(activities[num1]);
      }
      else if(!activities[num2].getElementsByTagName("input")[0].checked){
        ableAct(activities[num1]);
      }
         
}

function ableAct (act){
    act.getElementsByTagName("input")[0].disabled = false;
    act.style.color = "black";

}

function disableAct (act) {
    act.getElementsByTagName("input")[0].disabled = true;
    act.style.color = "grey";
}


