fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.querySelector("#header").innerHTML = data;
});

