function addEmailToLocalStorage() {
  console.log('Adding email to local storage: ', emailAuth.value);
  localStorage.setItem('email', emailAuth.value);
}
