fetch('http://localhost:4000/', {
    method: 'POST',
    body: JSON.stringify({
        key: 'name',
        value: 'Al Farabi'
    })
})

.then((res) => res.json())
.then((data) => console.log(data))