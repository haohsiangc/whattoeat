// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBT5FI6MEGp17B22puwDIa_oX-2mHmYCvw",
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
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        })
        .then(function () {
            location.href = "./signup_done.html";
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
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function (user) {
                    if (user) {
                        location.href = "./choose.html";
                        // User is signed in.
                    } else {
                        alert("plz signup first");
                        // No user is signed in.
                    }
                });
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}
// function filter() {
//     var type = document.getElementById('filter').value;
//     list(type);
// }

function list() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var getSearch = location.search;
            var para = getSearch.split("?");
            var period = para[1].split("=");
            var db = firebase.database();
            var str = '';
            var content = document.getElementById('list');
            db.ref("/restaurant").orderByChild(period[1]).equalTo('y').once('value', function (snapshot) {
                snapshot.forEach(function (item) {
                    str += `
                                <div class="col-6 header">
                                    <div class="card bg-light text-center" >
                                        <a href="./detail.html?restaurant=${item.key}"><img class="card-img-top" id="pic" src="./pic/${item.key}.jpg"></a>
                                            <div class="card-footer">
                                                <p class="card-text">${item.key}</p>
                                            </div>
                                    </div>
                                </div>`;
                    content.innerHTML = str;
                })
            })
        } else {
            alert("Plz login first");
        }
    });
}

function getDetail() {
    var getSearch = location.search;
    var para = getSearch.split("?");
    var restaurant = para[1].split("=");
    var db = firebase.database();
    var detail = "";
    var carousel = "";
    db.ref("/restaurant/" + decodeURIComponent(restaurant[1])).once('value', function (snapshot) {
        var data = snapshot.val();
        console.log(data.Name)
        carousel = `
                <ol class="carousel-indicators" >
                    <li data-target="#carousel" data-slide-to="0"></li>
                    <li data-target="#carousel" data-slide-to="1"></li>
                </ol >
                <div class="carousel-inner">
                    <div class="carousel-item active text-center">
                        <img class="d-block move w-100 menu" src="./pic/${data.Name}.jpg" alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <a href="./menu/${data.Name}.jpg">
                            <img class="d-block move w-100 menu" src="./menu/${data.Name}.jpg" alt="Second slide">                    
                        </a>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>`
        detail = `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="d-inline">${data.Name}</h5>
                        <button type="button" class="d-inline heart " style="border: none;"><img src="./icon/heart.png"> </button>
                            <h6 class=" mb-2 text-muted">${data.Google_Stars}</h6>
                            <h6 class=" mb-2 text-muted">${data.Addr}</h6>
                            <h6 class=" mb-2 text-muted">${data.Discount_or_Package}</h6>
                            <h6 class=" mb-2 text-muted">${data.Phone}</h6>
                            <h6 class=" mb-2 text-muted">${data.Time}</h6>
                    </div>
                </div>`
        document.getElementById('carousel').innerHTML = carousel;
        document.getElementById('detail').innerHTML = detail;
    })
}