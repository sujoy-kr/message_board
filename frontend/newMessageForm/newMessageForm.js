const postMessage = (e) => {
    e.preventDefault()
    // console.log(e)
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    // console.log(title, content)

    const token = localStorage.getItem('token')
    const user = localStorage.getItem('userId')

    if (token) {
        fetch('http://localhost:3001/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, content, user }),
        })

        location.href = '../index.html'
    } else {
        alert('You must be logged in to post a message.')
    }
}

const submitBtn = document.getElementById('submitBtn')

submitBtn.addEventListener('click', postMessage)
