document.addEventListener('keypress', function (event) {
  pressedNumber = Number(String.fromCharCode(event.which));
  if (isNaN(pressedNumber)) {
    return;
  }
  document.querySelectorAll('.hint')[pressedNumber - 1].click();
});
