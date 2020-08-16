const cuteApp = {};

const dbRefFunny = firebase.database().ref('urls/funny');
const dbRefCute = firebase.database().ref('urls/cute');
const dbRefCool = firebase.database().ref('urls/cool');
let funGifArray = [];
let cuteGifArray = [];
let coolGifArray = [];
let funGifEmbed = ``;
let cuteGifEmbed = ``;
let coolGifEmbed = ``;

dbRefFunny.on('value', (res) => {
    const data = res.val();
    funGifArray = Object.values(data);
})

dbRefCute.on('value', (res) => {
    const data = res.val();
    cuteGifArray = Object.values(data);
})

dbRefCool.on('value', (res) => {
    const data = res.val();
    coolGifArray = Object.values(data);
})

cuteApp.funny = () => {
    $('.show').on('click', function(r) {

        $('.gifContainer').empty();
        
        $('.show').animate({'position':'relative', 'right': '500px'}, 1500, function() {
            // Animation complete.
          });
        $('.gifContainer').animate({"right":"200px"}, 1000, function() {
            // Animation complete.
          });

        if (r.target.alt === "funny"){
            
            const randomGif = Math.floor(Math.random() * funGifArray.length);
            let gifSelected = funGifArray[randomGif];
            const gifUrl = `https://old.reddit.com/mediaembed/${gifSelected}`;

            
            funGifEmbed = `<iframe src=${gifUrl} width="690" height="690"></iframe>`;
            $('.gifContainer').append(funGifEmbed);

        } else if (r.target.alt === "cute"){
            const randomGif = Math.floor(Math.random() * cuteGifArray.length);
            let gifSelected = cuteGifArray[randomGif];
            const gifUrl = `https://old.reddit.com/mediaembed/${gifSelected}`;
            
            cuteGifEmbed = `<iframe src=${gifUrl} width="690" height="690"></iframe>`;

            $('.gifContainer').append(cuteGifEmbed);

        } else if (r.target.alt === "cool"){
            const randomGif = Math.floor(Math.random() * coolGifArray.length);
            let gifSelected = coolGifArray[randomGif];
            const gifUrl = `https://old.reddit.com/mediaembed/${gifSelected}`;
    
            coolGifEmbed = `<iframe src=${gifUrl} width="690" height="690"></iframe>`;

            $('.gifContainer').append(coolGifEmbed);
        }

    })
}

cuteApp.add = () => {
    $(".add").on('click', (r) => {
        
        const value = r.target.value;
        const dbRef = firebase.database().ref('urls/' + value);
        const addUrl = $('#add').val();
        console.log(value);
        
        dbRef.push(addUrl);
        $('#add').val('');
    })
}

cuteApp.init = () => {
    cuteApp.funny();
    cuteApp.add();
}

$(function(){
    cuteApp.init();
})