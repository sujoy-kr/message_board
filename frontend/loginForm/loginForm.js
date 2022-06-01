const userLogin = async (e) => {
    e.preventDefault()
    console.log(e)
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    // post message to Server
    const returnedData = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })

    // save returned data to local storage
    const data = await returnedData.json()
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.id)
    localStorage.setItem('name', data.name)

    location.href = '../index.html'
}

const loginBtn = document.getElementById('loginBtn')

loginBtn.addEventListener('click', userLogin)
