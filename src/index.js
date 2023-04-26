console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"
document.addEventListener("DOMContentLoaded", initialize)

function initialize(){
    firstChallenge()
    secondChallenge()
    fourthChallenge()
}


function firstChallenge() {
    fetch(imgUrl)
    .then((resp) => resp.json())
    .then((json) => handleImages(json.message))
}


function handleImages(array) {
    for (i of array) {
        const img = new Image(240, 250)
        img.src = i
        document.querySelector("#dog-image-container").appendChild(img)
    }
}

function secondChallenge() {
    fetch(breedUrl)
    .then((resp) => resp.json())
    .then((json) => handleBreeds(json.message))
}

function handleBreeds(object) {
    for (const breed in object) {
        const li = document.createElement("li")
        li.innerText = `${breed}`
        li.setAttribute(`id`,`${breed}`)
        li.style.textDecoration = "underline"
        li.addEventListener("click",changeColor)
        const list = document.querySelector('#dog-breeds')
        list.appendChild(li)
    }
}


function changeColor(e){
    const click = document.querySelector(`#${e.target.innerText}`)
    click.style.color = 'red'
}

function fourthChallenge() {
    const options = document.getElementById("breed-dropdown")
    console.log(options)
    options.addEventListener("change", e => filter(e.target.value))

}

//Doesn't work if want to first filter using A since it is a default.
//also there is a lag time when you see the entire list come back up again..need to work on
function filter(char) {
    const list = document.querySelector("#dog-breeds")
    list.textContent = ""
    secondChallenge()
    setTimeout(()=>{
        const array = list.querySelectorAll("li")
        console.log(array)
        array.forEach(function(dog){
            if (dog.id.charAt(0) !== char){
                dog.remove()
               }
        })
    }, 200)
}
