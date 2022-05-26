const allMessageUrl = 'http://localhost:3001/api/message'

// Get all messages and show them inside list tag in order of date
const getAllMessages = async () => {
    const response = await fetch(allMessageUrl)
    const messages = await response.json()
    const list = document.getElementById('messageList')
    list.innerHTML = ''
    messages.forEach((message) => {
        list.innerHTML += `
        <li>
            <b>${message.title}</b> - 
            ${message.content}
        </li>
        `
    })
}

window.onload = getAllMessages
