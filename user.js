// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "",
    authDomain: "whattoeat-mis.firebaseapp.com",
    databaseURL: "https://whattoeat-mis.firebaseio.com",
    projectId: "whattoeat-mis",
    storageBucket: "whattoeat-mis.appspot.com",
    messagingSenderId: "101696256042",
    appId: "1:101696256042:web:f40e2d85f791e483bd2b53"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function SignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Create user with email and pass.
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        })
        .then(function() {
            location.href = "./done.html";
        });
}

function SignIn() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        })
        .then(function() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    location.href = "./index.html";
                    // User is signed in.
                } else {
                    alert("plz signup first");
                    // No user is signed in.
                }
            });
        });
}