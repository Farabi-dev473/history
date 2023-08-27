function fetchTwitterProfileImage(username) {
  const apiUrl = `https://api.twitter.com/1.1/users/show.json?user_name=FarabiI63320870`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const profileImageUrl = data.profile_image_url;

      const imgElement = document.createElement("img");
      imgElement.src = profileImageUrl;

      document.body.appendChild(imgElement);
    });
}

fetchTwitterProfileImage()