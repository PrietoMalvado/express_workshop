window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if(localStorage.getItem('token')){
        token = localStorage.getItem("token");
        headers = {
            headers : {
                "Authorization": "Bearer " + token
            }
        };
        loadPokemon();
    }else{
        window.location.href = "index.html";
    }
}    

function loadPokemon() {
    axios.get( url + "/pokemon", headers)
    .then(function(res){
        console.log(res);
        displayPokemon(res.data.message);
    }).catch(function(err){
        console.log(err);
    });
}

function displayPokemon(pokemon) {
    //console.log("entro a displayPokemon");
    var body = document.querySelector("body");
    //console.log(pokemon);
    for(var i = 0; i < pokemon.length; i++){
        //console.log("for");
        body.innerHTML += `<h3>${pokemon[i].pok_name}</h3>`;
    }
}