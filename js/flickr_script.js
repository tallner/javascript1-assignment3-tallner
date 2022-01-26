//My KEY at flickr
const KEY = `052a884f5955c2c6e26e1c31ad61e000`;

//Test searchfield, replaced by input later
let searchText = `I JUST WANT TO WORKOUT AND HANG WITH MY DOG`;

//Use pagination, 1 picture, 1 page
const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=1`;
//const url = `https://non.sense.url/`;



fetch(url) //Send a request to the API
.then(responseFunction) //When the promise is fulfilled, run the function responseFunction 
.then(getImageUrl) //When that promise is fulfilled, run the function getImageUrl 
.catch(errorFunction); // If the promises are not fulfilled then catch it with calling the errorFunction



// Checks if the response http response is ok (eg 200-299)
// If it is a good response then parse it to json format with the .json()-method
// If not, write a message to the console
function responseFunction(response){
   console.log(response);
        if(response.status>=200 && response.status<300){
            return response.json();
        }
        else{
            throw 'Something went wrong. :(';
        }
}


//Put together the URL for the image with the information from the result in the response from the API
function getImageUrl(photoObject){
    console.log(photoObject);
    let photo = photoObject.photos.photo[0];
    let size = 'k'; //size of the image-->replaced by a user input later

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    displayImg(imgUrl);

   
}

//för att visa bilden
function displayImg(url){
    let img = document.createElement('img');
    img.src = url;

    img.addEventListener("error", imgError);
 

    document.body.appendChild(img);
}

// this function returns the error from the catch to the console
function errorFunction(error){
    console.log('Error: ' + error);
}

function imgError(e) {
    console.log(e);
    console.log('This image cannot be loaded, try another size');
  }