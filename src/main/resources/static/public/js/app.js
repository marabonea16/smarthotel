// Hardcoded credentials
    const HARDCODED_USERNAME_ADMIN = 'admin1@smarthotel.com';
    const HARDCODED_PASSWORD_ADMIN = 'admin1';

    const HARDCODED_USERNAME_CLIENT = 'client1@smarthotel.com';
    const HARDCODED_PASSWORD_CLIENT = 'client1';

    function checkCredentials() {
        // Get values from the form
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check if they match the hardcoded credentials
        if (username === HARDCODED_USERNAME_ADMIN && password === HARDCODED_PASSWORD_ADMIN) {

            window.location.href = 'admin.html';
        } else {
            if (username === HARDCODED_USERNAME_CLIENT && password === HARDCODED_PASSWORD_CLIENT) {

                window.location.href = 'home.html';
            } else {
                alert('Invalid username or password. Please try again.');
            }
        }
    }



alert('signed in');

signin.addEventListener('click', (e)=>{
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
});

