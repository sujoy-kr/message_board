const registerAnUser = (e) => {
    e.preventDefault()
    console.log(e)
    const username = document.getElementById('username').value
    const name = document.getElementById('name').value
    const password = document.getElementById('password').value
    console.log(username, name, password)
    // register an user
    const user = {
        username,
        name,
        password,
    }
    console.log(user)
    // send user to backend
    fetch('http://localhost:3001/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })

    location.href = '../index.html'
}

const loginBtn = document.getElementById('loginBtn')

loginBtn.addEventListener('click', registerAnUser)
