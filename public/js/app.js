// Function to handle sign-in
document.getElementById('signInBtn').addEventListener('click', signIn);

function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User signed in:', user);
            // Redirect to dashboard or perform other actions
        })
        .catch((error) => {
            // Handle sign-in errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Sign-in error:', errorMessage);
        });
}
