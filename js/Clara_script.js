//Lägg till din egna KEY
const KEY = '052a884f5955c2c6e26e1c31ad61e000';
let searchText = 'frog';

//Vi söker endast på 1foto per sida och 1 sida
const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=1`;

fetch(url).then(
    function(res){
        console.log(res);
        if(res.status>=200 && res.status<300){
            return res.json();
        }
        else{
            throw 'Something went wrong. :(';
        }
    }
).then(
    function(data){
        console.log(data);
        //Vi hämtar första bilden
        getImageUrl(data.photos.photo[0]);
    }
).catch(
    function(error){
        console.log(error);
    }
);

//här ska vi pussla ihop bild-urlen
function getImageUrl(photoObject){
    let photo = photoObject;
    let size = 'm';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    // console.log(imgUrl);
    displayImg(imgUrl);
}

//för att visa bilden
function displayImg(url){
    let img = document.createElement('img');
    img.src = url;

    document.body.appendChild(img);
}