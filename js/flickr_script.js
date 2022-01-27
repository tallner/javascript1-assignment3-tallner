//Test searchfield, replaced by input later
//let searchText = `I JUST WANT TO WORKOUT AND HANG WITH MY DOG`;

const btn_search = document.querySelector('button');
const inp_search_string = document.querySelector('#search');
const inp_img_size = document.querySelector('#size');
const inp_nr_img = document.querySelector('#nrobjects');

inp_search_string.addEventListener('click',e => inp_search_string.value='');
inp_img_size.addEventListener('click',e => inp_img_size.value='');

//starting point of the application is when clicking the searchbutton
btn_search.addEventListener('click', e => removeImage()); //remove current image before displaying the next
btn_search.addEventListener('click', e => getImages(//get images
    inp_search_string.value,//add searchstring
    inp_img_size.value,//add size
    inp_nr_img.value)); //add number of objects
btn_search.addEventListener('click', e => btn_search.disabled = true);//disable the button during search so you cannot doublepress it


// Embed the api call in a function and pass args text and size
function getImages(text,size,nrobjects){
    //My KEY at flickr
    const KEY = `052a884f5955c2c6e26e1c31ad61e000`;
    
    //Use pagination, 1 page, x pictures
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
        if(response.status>=200 && response.status<300){
            return response.json();
        }
        else{
            displayErrorMsg(response.status);
            throw 'Something went wrong. :(';
        }
}


//Put together the URL for the image with the information from the result in the response from the API
function getImageUrl(photoObject,size){
    
   for (const iterator of photoObject.photos.photo) {
       let imgUrl = `https://live.staticflickr.com/${iterator.server}/${iterator.id}_${iterator.secret}_${size}.jpg`;
       displayImg(imgUrl);
   }
   btn_search.disabled = false; //enable the button when search is done
}


//Create an image and add the source
//Use eventlistener to catch errors when loading the image
function displayImg(url){
    let img = document.createElement('img');
    img.src = url;
    img.addEventListener("error", imgError);
    img.addEventListener("load", e => document.body.appendChild(img));
}

//remove all images and errormessages before new search is executed
function removeImage(){
    const img = document.querySelectorAll('img');
    const h2 = document.querySelectorAll('h2');
    if(img.length != 0){
        for (const iterator of img) {
            iterator.remove();
        }
    }

    if(h2.length != 0){
        for (const iterator of h2) {
            iterator.remove();
        }
    }
}

// this function returns the error from the catch to the console
function errorFunction(error){
    console.log('Error: ' , error);
    displayErrorMsg(
        'Check your connection or searchstring.'+
        '<br>'+
        'Error definition:'+
        '<br>'+
        error);
}

//Take care of the image error
function imgError(e) {
    console.log(e);
    displayErrorMsg('This image cannot be loaded, try another size');
  }

  //function to add error message to an H2 element on the website
function displayErrorMsg(errorText){
    const errorMsg = document.createElement('h2');
    errorMsg.innerHTML = errorText;
    document.body.appendChild(errorMsg);
    btn_search.disabled = false;
  }