// get the video title - document.querySelector("#title > h1").innerText
// three dot button click - [...document.querySelectorAll('#button-shape > button')][0].click()
// first check & click on show transcript - [...document.querySelectorAll("#items > ytd-menu-service-item-renderer")].filter((element) => element.innerText === 'Show transcript')[0].click()
// wait for selector - document.querySelector("#body > ytd-transcript-segment-list-renderer")
// execute this command to get the transcriptions with their timestamps - [...document.querySelector("#segments-container").childNodes].map((element) => element.innerText.split('\n'))

