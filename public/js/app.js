const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1Element = document.querySelector('#message-1')
const message2Element = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    message1Element.textContent = 'Loading...'
    message2Element.textContent = ''

    fetch('http://localhost:3000/weather?address=' + searchElement.value).then((response) => {

        response.json().then((data) => {
            if(data.error) {
                message1Element.textContent = data.error
            } else {  
                message1Element.textContent = data.location
                message2Element.textContent = data.forecast 
            }
        })
    })
})