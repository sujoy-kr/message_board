const allMessageUrl = 'http://localhost:3001/api/message'

// Get all messages and show them inside list tag in order of date
const getAllMessages = async () => {
    const response = await fetch(allMessageUrl)
    const messages = await response.json()
    const list = document.getElementById('messageList')
    list.innerHTML = ''
    messages.forEach((message) => {
        list.innerHTML += `
        <li>"
            <b>${message.title}</b> - 
            ${message.content}" - ${message.user.name}
        </li>
        `
    })
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

if (localStorage.getItem('name')) {
    document.getElementById('infoAfterLogin').style.display = 'block'
    document.getElementById(
        'welcomeUser'
    ).innerHTML = `Welcome ${capitalizeFirstLetter(
        localStorage.getItem('name')
    )}`
    document.getElementById('loginFormLink').style.display = 'none'
    document.querySelector('.reg').style.display = 'none'
}

const logOutBtn = document.getElementById('logOutBtn')
logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('name')
    window.location.reload()
})

window.onload = getAllMessages
