const api = `AIzaSyAGnHKoY4pe3ZXjNuvJyL2fRqAWbMUescQ`;
const output = document.querySelector(".output");
const searchTerm = document.querySelector("input");
const btn = document.querySelector("button");
searchTerm.setAttribute("value", "test");
btn.addEventListener("click", ySearch);

function ySearch(e) {
  let search = searchTerm.value;
  search = encodeURIComponent(search);
  const url =
    "https://www.googleapis.com/youtube/v3/search/?part=snippet&key=" +
    api +
    "&q=" +
    search +
    "&maxResults=20";
  //   output.textContent = url;
  fetch(url)
    .then(function (rep) {
      return rep.json();
    })
    .then(function (data) {
      console.log(data);
      return data.items.map(function (x) {
        return {
          title: x.snippet.title,
          des: x.snippet.description,
          img: x.snippet.thumbnails.default.url,
          id: x.id.videoId,
          x: x,
        };
      });
    })
    .then(function (arr) {
      show(arr);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function show(data) {
  data.forEach(function (video) {
    console.log(video);
    let div = document.createElement("div");
    div.classList.add("box");
    let temp = document.createTextNode(video.des);
    div.appendChild(temp);
    let span = document.createElement("span");
    span.innerHTML =
      '<a href="http://www.youtube.com/watch?v=' +
      video.id +
      '"target="_blank">' +
      video.title +
      "<a/>";
    let showVideo = document.createElement("div");
    showVideo.innerHTML = `<iframe width="600" height="300" src="https://www.youtube.com/embed/${video.id}" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`;

    div.appendChild(span);
    div.appendChild(showVideo);

    div.appendChild(temp);
    output.appendChild(div);
  });
}
