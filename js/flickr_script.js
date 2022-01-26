//My KEY at flickr
const KEY = `052a884f5955c2c6e26e1c31ad61e000`;

const btn_search = document.querySelector('button');
const inp_search_string = document.querySelector('#search');
const inp_img_size = document.querySelector('#size');

btn_search.addEventListener('click',getSearchStrings);
inp_search_string.addEventListener('click',e => inp_search_string.value='');
inp_img_size.addEventListener('click',e => inp_search_string.value='');

function getSearchStrings(){
    console.log('hej');
    return [inp_search_string.value,inp_search_string.value];
}
console.log(btn_search);

//Test searchfield, replaced by input later
let searchText = `I JUST WANT TO WORKOUT AND HANG WITH MY DOG`;

//Use pagination, 1 picture, 1 page


getImages(searchText,'m');

function getImages(searchText,size){
    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=1`;

    fetch(url) //Send a request to the API
    .then(responseFunction) //When the promise is fulfilled, run the function responseFunction 
    .then(data => getImageUrl(data.photos.photo[0],size)) //When that promise is fulfilled, run the function getImageUrl 
    .catch(errorFunction); // If the promises are not fulfilled then catch it with calling the errorFunction
}



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
function getImageUrl(photoObject,size){
    console.log(photoObject);
   // let photo = photoObject.photos.photo[0];
    let photo = photoObject;
    //let size = 'k'; //size of the image-->replaced by a user input later

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    displayImg(imgUrl);
}

//Create an image and add the source
//Use eventlistener to catch errors when loading the image
function displayImg(url){
    let img = document.createElement('img');
    img.src = url;
 //   img.addEventListener("error", imgError);

    document.body.appendChild(img);
}

// this function returns the error from the catch to the console
function errorFunction(error){
    console.log('Error: ' , error);
}

//Take care of the image error
function imgError(e) {
    console.log(e);
    console.log('This image cannot be loaded, try another size');
  }