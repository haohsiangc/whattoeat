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
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("loged in")
        var db = firebase.database();
        db.ref("/resturant").orderByChild("Breakfast").equalTo('y').once('value', function (snapshot) {
            snapshot.forEach(function (item) {
                console.log(item.key + " " + item.val().Breakfast);
            })
        })
    } else {
        alert("Plz login first");
    }
});