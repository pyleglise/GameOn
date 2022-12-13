module.exports = {
// DOM Elements
  modalbg: document.querySelector('.bground'),
  submitBtn: document.querySelector('.btn-submit'),
  modalBtn: document.querySelectorAll('.modal-btn'),
  formData: document.querySelectorAll('.formData input'),
  fullForm: document.getElementsByName('reserve'),
  editNavIcon: document.querySelector('.icon'),
  closeModalBtn: document.querySelector('.close'),
  modalContent: document.querySelector('.content'),

  // Input fields
  firstName: document.getElementById('first'),
  lastName: document.getElementById('last'),
  email: document.getElementById('email'),
  birthdate: document.getElementById('birthdate'),
  quantity: document.getElementById('quantity'),
  locationCity: document.getElementsByName('location'),
  checkCondition: document.getElementById('checkbox1'),

  // error handling
  errorFirstName: document.getElementById('errorFirstName'),
  errorLastName: document.getElementById('errorLastName'),
  errorEmail: document.getElementById('errorEmail'),
  errorBirthdate: document.getElementById('errorBirthdate'),
  errorLocation: document.getElementById('errorLocation'),
  errorCheckCondition: document.getElementById('errorCheckCondition'),
  errorQuantity: document.getElementById('errorQuantity')
}
