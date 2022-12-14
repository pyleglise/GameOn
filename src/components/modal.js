// Import variables declarations
const domLinker = require('./domLinker')
const errMsg = require('./errorMsg')
const { regExName, regExEmail } = require('./regExPaterns')

// Local variables declarations and initialisation
let formValid = false
let firstNameValid = false
let lastNameValid = false
let emailValid = false
let birthdateValid = false
let quantityValid = false
let locationValid = false
let checkConditionValid = true

// Set the max date on the form
domLinker.birthdate.max = new Date().toISOString().split('T')[0]

/** *  Events catching declaration  ***/
// open edit nav event
domLinker.editNavIcon.addEventListener('click', () => editNav())

// launch modal event
domLinker.modalBtn.forEach(btn => btn.addEventListener('click', () => launchModal()))

// close modal event
domLinker.closeModalBtn.addEventListener('click', () => closeModal())

// catch and test inputs in the form
domLinker.firstName.addEventListener('input', function () {
  firstNameValid = checkTextField(domLinker.firstName, regExName)
  errorDisplayHandler(domLinker.firstName, firstNameValid, domLinker.errorFirstName, errMsg.errorFirstNameTxt)
})
domLinker.lastName.addEventListener('input', function () {
  lastNameValid = checkTextField(domLinker.lastName, regExName)
  errorDisplayHandler(domLinker.lastName, lastNameValid, domLinker.errorLastName, errMsg.errorLastNameTxt)
})
domLinker.email.addEventListener('input', function () {
  emailValid = checkTextField(domLinker.email, regExEmail)
  errorDisplayHandler(domLinker.email, emailValid, domLinker.errorEmail, errMsg.errorEmailTxt)
})
domLinker.birthdate.addEventListener('input', function () {
  if ((domLinker.birthdate.value !== '') || (domLinker.birthdate.value !== undefined)) {
    const tmpBirthdate = new Date(domLinker.birthdate.value)
    birthdateValid = (tmpBirthdate.getTime() < Date.now())
  }
  errorDisplayHandler(domLinker.birthdate, birthdateValid, domLinker.errorBirthdate, errMsg.errorBirthdateTxt)
})
domLinker.quantity.addEventListener('input', function () {
  quantityValid = ((domLinker.quantity.value) && (Number.isInteger(Number(domLinker.quantity.value))) && (domLinker.quantity.value >= 0) && (domLinker.quantity.value < 100))
  console.log('Test du champ : ' + domLinker.quantity.name + ' = ' + domLinker.quantity.value + ' -> ' + domLinker.quantityValid)
  errorDisplayHandler(domLinker.quantity, quantityValid, domLinker.errorQuantity, errMsg.errorQuantityTxt)
})
domLinker.locationCity.forEach(fieldItem => {
  fieldItem.addEventListener('input', function () {
    locationValid = fieldItem.checked === true
    errorDisplayHandler(fieldItem, locationValid, domLinker.errorLocation, errMsg.errorLocationTxt)
  })
})
domLinker.checkCondition.addEventListener('input', function () {
  checkConditionValid = domLinker.checkCondition.checked
  errorDisplayHandler(domLinker.checkCondition, checkConditionValid, domLinker.errorCheckCondition, errMsg.errorConditionTxt)
})

// Catch submit button click
domLinker.fullForm[0].addEventListener('submit', (event) => {
  event.preventDefault()
  if (formValid) {
    domLinker.fullForm[0].submit()
  }
})

/**
 * Responsive top menu activation
 */
const editNav = () => {
  const x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

/**
 * Display modal form
 */
const launchModal = () => {
  domLinker.modalbg.style.display = 'block'
}

/**
 * Close modal form
 */
const closeModal = () => {
  domLinker.modalbg.style.display = 'none'
}

/**
 * Display error message when field completion is invalid and then determine if the entire form is valid or not
 * @param {DOMElement} inputField - the input field related by the error
 * @param {Boolean} inputValid - wether the input field is valid or not (so, display the error message or not)
 * @param {DOMElement} errorField - the DOM element where to display the error message
 * @param {String} textMessage - the error message to display
 */
const errorDisplayHandler = (inputField, inputValid, errorfield, textMessage) => {
  errorfield.innerHTML = ''
  errorfield.className = ''
  if (inputField.classList.contains('invalid')) {
    inputField.classList.remove('invalid')
  }
  inputField.className += ' valid'
  if (!inputValid) {
    errorfield.innerHTML = textMessage
    errorfield.className = 'formData error active'
    inputField.className += ' invalid'
    inputField.classList.remove('valid')
  }
  checkFormValid()
}

/**
 * Check if the input is valid according to the regexp - Returns boolean
 * @param {DOMElement} inputField - the input field to test
 * @param {RegEpx String} regExPattern - wether the input field is valid or not (so, display the error message or not)
 */
const checkTextField = (inputfield, regExPattern) => {
  let fieldTest = false
  if ((inputfield.value !== '')) {
    fieldTest = regExPattern.test(inputfield.value)
  }
  return fieldTest
}

/**
 * Check if the entire for is valid and change the submit button style if valid
 * Sets the formValid param to true if form valid
  */
const checkFormValid = () => {
  if (firstNameValid && lastNameValid && emailValid && birthdateValid && quantityValid && locationValid && checkConditionValid) {
    formValid = true
    // console.log('Formulaire OK !')
    domLinker.submitBtn.classList += ' btn-valid'
  } else {
    formValid = false
    if (domLinker.submitBtn.classList.contains('btn-valid')) {
      domLinker.submitBtn.classList.remove('btn-valid')
    }
  }
}

// Manage the form after being sent and display the Thank You modal box
if (location.search.substring(1)) {
  if (location.search.substring(1).split('&')[7].split('=')[1]) {
    domLinker.modalContent.innerHTML = '<span class="close" ></span><div class="modal-body add-padding-big"><p>Merci pour votre inscription !</p></div><button class="btn-submit modal-btn add-margin-btn" value="Fermer">Fermer</button>'
    launchModal()
    document.querySelector('.close').addEventListener('click', () => location.replace(location.pathname))
    document.querySelector('.btn-submit').addEventListener('click', () => location.replace(location.pathname))
  }
}
