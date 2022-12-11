const { modalBtn, modalbg, editNavIcon } = require('./domLinker')

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

// open edit nav
editNavIcon.addEventListener('click', () => editNav())

// launch modal form
const launchModal = () => {
  modalbg.style.display = 'block'
}
