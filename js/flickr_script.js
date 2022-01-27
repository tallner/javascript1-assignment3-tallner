//Test searchfield, replaced by input later
//let searchText = `I JUST WANT TO WORKOUT AND HANG WITH MY DOG`;

const btn_search = document.querySelector('button');
const inp_search_string = document.querySelector('#search');
const inp_img_size = document.querySelector('#size');
const inp_nr_img = document.querySelector('#nrobjects');

inp_search_string.addEventListener('click',e => inp_search_string.value='');
inp_img_size.addEventListener('click',e => inp_img_size.value='');
//inp_nr_img.addEventListener('click',e => inp_nr_img.value='');

//@ct: lägg till felmeddelande på hemsidan
//@ct: lås knappen under tiden sökning sker
btn_search.addEventListener('click', e => removeImage()); //starting point of the application. remove current image before displaying the next
//btn_search.addEventListener('click', e => getImages(searchText,'m')); 
btn_search.addEventListener('click', e => getImages(inp_search_string.value,inp_img_size.value,inp_nr_img.value)); 




// Embed the api call in a function and pass args text and size
function getImages(text,size,nrobjects){
    //My KEY at flickr
    const KEY = `052a884f5955c2c6e26e1c31ad61e000`;
    
    //Use pagination, 1 picture, 1 page
    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${text}&format=json&nojsoncallback=1&per_page=${nrobjects}&page=1`;

    fetch(url) //Send a request to the API
    .then(responseFunction) //When the promise is fulfilled, run the function responseFunction 
    .then(data => getImageUrl(data,size)) //When that promise is fulfilled, run the function getImageUrl 
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
   for (const iterator of photoObject.photos.photo) {
    console.log(iterator);
    let imgUrl = `https://live.staticflickr.com/${iterator.server}/${iterator.id}_${iterator.secret}_${size}.jpg`;
    displayImg(imgUrl);
   }
    
   // let photo = photoObject.photos.photo[0];


    let photo = photoObject;
    //let size = 'k'; //size of the image-->replaced by a user input later

    // let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    // displayImg(imgUrl);
}

//Create an image and add the source
//Use eventlistener to catch errors when loading the image
function displayImg(url){
    let img = document.createElement('img');
    img.src = url;
    img.addEventListener("error", imgError);

    document.body.appendChild(img);
}

function removeImage(){
    const img = document.querySelectorAll('img');
    console.log(img.length);
    if(img.length != 0){
        for (const iterator of img) {
            iterator.remove();
        }
//        img.remove();
    }

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