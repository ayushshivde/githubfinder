let searchInput = document.querySelector("#searchInput");
let searchButton = document.querySelector("#searchButton");
let card = document.querySelector(".card");

function getUserDetail(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("User not Found");
    else {
      return raw.json();
    }
  });
}

function showApiData(data){
    let details = ` 
    <div class="bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-6 w-full" id="profileCard">
                  <!-- Profile Image -->
                  <img
                    src="${data.avatar_url}"
                    alt="Profile"
                    class="w-32 h-32 rounded-full border-4 border-blue-500"
                    id="profileImage"
                  />
          
                  <!-- Profile Info -->
                  <div class="flex-1 space-y-2 text-center md:text-left">
                    <h2 class="text-2xl font-bold" id="profileName">${data.name}</h2>
                    <h2 class="text-l opacity-60 font-light" id="profileName">@${data.login}</h2>
                    <p class="text-gray-300" id="bio">${data.bio}</p>
          
                    <div class="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                      <div class="bg-gray-700 px-4 py-2 rounded-xl text-sm font-medium">
                        <span class="text-gray-400">Followers:</span> <span id="followers">${data.followers}</span>
                      </div>
                      <div class="bg-gray-700 px-4 py-2 rounded-xl text-sm font-medium">
                        <span class="text-gray-400">Following:</span> <span id="following">${data.following}</span>
                      </div>
                      <div class="bg-gray-700 px-4 py-2 rounded-xl text-sm font-medium">
                        <span class="text-gray-400">Repos:</span> <span id="repos">${data.public_repos}</span>
                      </div>
                      <div class="bg-gray-700 px-4 py-2 rounded-xl text-sm font-medium">
                        <span class="text-gray-400">Location:</span> <span id="location">${data.location?data.location:"N/A"}</span>
                      </div>
                    </div>
          
                    <a
                      href="${data.html_url}"
                      target="_blank"
                      class="inline-block mt-4 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
                      id="githubLink"
                    >
                      View Profile on GitHub
                    </a>
                  </div>
                </div>`;
    
          console.log(data);
          card.innerHTML = details;


}


searchButton.addEventListener("click", function () {
  let username = searchInput.value.trim();
  if (username.length <= 0) {
    alert("Enter username");
  } else {
    getUserDetail(username).then((data) => {
        showApiData(data)
    });
  }
});

function getUserRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`
  ).then((raw) => {
    if (!raw.ok) throw new Error("User not Found");
    else {
      return raw.json();
    }
  });
}




getUserRepos("asynchronousjavascriptor").then((data) => {
  console.log(data);
});
