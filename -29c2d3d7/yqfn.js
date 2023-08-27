
(async() => {
    const response = await fetch('https://api.moon.ly/api/v1/twitter/follows/shtefcs/entrptaher', {method: 'GET'})

    console.log(await response.json())
})()