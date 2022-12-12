const {
  modalBtn, modalbg, editNavIcon, closeModalBtn, fullForm, firstName,
  lastName, email, birthdate, quantity, locationCity, checkCondition, submitBtn,
  errorFirstName, errorLastName, errorBirthdate, errorEmail, errorLocation, errorCheckCondition, errorQuantity
} = require('./domLinker')
const { regExName, regExEmail } = require('./regExPaterns')
let formValid, firstNameValid, lastNameValid, emailValid, birthdateValid, quantityValid, locationValid, checkConditionValid
formValid = firstNameValid = lastNameValid = emailValid = birthdateValid = quantityValid = locationValid = false
checkConditionValid = true

birthdate.max = new Date().toISOString().split('T')[0]

// open edit nav event
editNavIcon.addEventListener('click', () => editNav())

// open edit nav
const editNav = () => {
  const x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

// launch modal event
modalBtn.forEach(btn => btn.addEventListener('click', () => launchModal()))

// launch modal form
const launchModal = () => {
  modalbg.style.display = 'block'
}

// close modal event
closeModalBtn.addEventListener('click', () => closeModal())

// close modal form
const closeModal = () => {
  modalbg.style.display = 'none'
}

firstName.addEventListener('change', function () {
  firstNameValid = checkTextField(firstName, regExName)
  errorDisplayHandler(firstName, firstNameValid, errorFirstName, 'Le prénom doit comporter au moins deux caractères ! (ex : Paul)')
})

lastName.addEventListener('change', function () {
  lastNameValid = checkTextField(lastName, regExName)
  errorDisplayHandler(lastName, lastNameValid, errorLastName, 'Le nom doit comporter au moins deux caractères ! (ex : Lebon)')
})

email.addEventListener('change', function () {
  emailValid = checkTextField(email, regExEmail)
  errorDisplayHandler(email, emailValid, errorEmail, "L'adresse email n'est pas valide ! (ex : nom@domaine.fr)")
})

birthdate.addEventListener('change', function () {
  console.log(birthdate.value)
  if (!(birthdate.value == '') || !(birthdate.value == undefined)) {
    const tmpBirthdate = new Date(birthdate.value)
    birthdateValid = (tmpBirthdate.getTime() < Date.now())
  }
  errorDisplayHandler(birthdate, birthdateValid, errorBirthdate, "Entrez une date !<br>La date de naissance ne peut pas être après aujourd'hui !")
})
 
quantity.addEventListener('change', function () {
  quantityValid = (!quantity.value == '') && (Number.isInteger(Number(quantity.value)) && (quantity.value > 0) && (quantity.value < 100))
  // console.log('Test du champ : ' + quantity.name + ' -> ' + quantityValid)
  errorDisplayHandler(quantity, quantityValid, errorQuantity, 'Entrez un nombre !<br>Le nombre de tournoi doit être compris entre 0 et 99 ')
})

locationCity.forEach(fieldItem => {
  fieldItem.addEventListener('change', function () {
    locationValid = fieldItem.checked === true
    // console.log('Test du champ : ' + fieldItem.name + ' -> ' + locationValid)
    errorDisplayHandler(fieldItem, locationValid, errorLocation, 'La localité est obligatoire !')
  })
})

checkCondition.addEventListener('change', function () {
  checkConditionValid = checkCondition.checked
  // console.log('Test du champ : ' + checkCondition.name + ' -> ' + checkConditionValid)
  errorDisplayHandler(checkCondition, checkConditionValid, errorCheckCondition, "Vous devez lire et accepter les condition d'utilisation !")
})
// console.log(locationCity)
function errorDisplayHandler (inputField, inputValid, errorfield, textMessage) {
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

function checkTextField (inputfield, regExPattern) {
  let fieldTest = false
  if (!inputfield.value == '') {
    fieldTest = regExPattern.test(inputfield.value)
  }
  // console.log('Test du champ : ' + inputfield.name + ' -> ' + fieldTest)
  return fieldTest
}

fullForm[0].addEventListener('submit', (event) => logFormSubmit(event))

function checkFormValid () {
  // console.log(checkConditionValid)
  // console.log(checkCondition.checked)
  if (firstNameValid && lastNameValid && emailValid && birthdateValid && quantityValid && locationValid && checkConditionValid) {
    formValid = true
    // console.log('Formulaire OK !')
    submitBtn.classList += ' btn-valid'
  } else {
    formValid = false
    // console.log('Formulaire NOT OK !')
    if (submitBtn.classList.contains('btn-valid')) {
      submitBtn.classList.remove('btn-valid')
    }
  }
}
const logFormSubmit = (event) => {
  event.preventDefault()
  const date = new Date()
  console.log('Formulaire envoyé ! Horodatage : ' + date.toString())

  // fullForm[0].submit()
}
