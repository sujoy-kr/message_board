const postMessage = (e) => {
    e.preventDefault()
    console.log(e)
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    console.log(title, content)

    // post message to Server
    fetch('http://localhost:3001/api/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    })

    location.href = '../index.html'
}

const submitBtn = document.getElementById('submitBtn')

submitBtn.addEventListener('click', postMessage)
