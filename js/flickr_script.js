//My KEY at flickr
const KEY = `052a884f5955c2c6e26e1c31ad61e000`;

//Test searchfield, replaced by input later
let searchText = `dog`;

//Use pagination, 1 picture, 1 page
const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=1`;

//fetch returnerar promise
// const flickrPromise = fetch(url);
// console.log(flickrPromise);

//när promise fulfilled anropas callback inom then-metoden
// const jsonPromise = flickrPromise.then(
//     function(response){
//         console.log(response);
//         if(response.status>=200 && response.status<300){
//             return response.json();
//         }
//         else{
//             throw 'Something went wrong. :(';
//         }
        
//     }
// );
//console.log(jsonPromise);

// const objPromise = jsonPromise.then(
//     function(response){
//         console.log(response);
//     }
// );
// console.log(objPromise);

// const catchPromise = flickrPromise.catch(
//     function(error){
//         console.log(error);
//     }
// );
// console.log(catchPromise);



//samma men med definierade callbackfunktioner
//fetch(url).then(getImageUrl).then();

// function responseCallback(response){
//     console.log(response);
//     return response.json();
// }

// function showImgCallback(data){
//     const img = document.createElement('img');
//     img.src = data.message;
//     document.body.append(img);
// }

console.log(
fetch(url) //Send a request to the API
.then(responseFunction) //When the promise is fulfilled, run the callback function responseFunction 
.then(getImageUrl) //When that promise is fulfilled, run the callback function getImageUrl 
.catch(errorFunction) // If the promises are not fulfilled then catch it with calling the errorFunction
);

function responseFunction(response){
    console.log(response);
        if(response.status>=200 && response.status<300){
            return response.json();
        }
        else{
            throw 'Something went wrong. :(';
        }
}

// function dataFunction(data){
//     console.log(data);
//     //Vi hämtar första bilden
//     getImageUrl(data.photos.photo[0]);
// }

function errorFunction(error){
    console.log(error);
}

//här ska vi pussla ihop bild-urlen
function getImageUrl(photoObject){
    console.log(photoObject);
    let photo = photoObject.photos.photo[0];
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

function errorHandling(error){
    console.log(error);
}