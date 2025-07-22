document.getElementById("pengertian").addEventListener("click", function () {
  var contentBox = document.getElementById("materipengertian");
  if (contentBox.classList.contains("d-none")) {
    contentBox.classList.remove("d-none");
    contentBox.classList.add("visible");
  } else {
    contentBox.classList.remove("visible");
    contentBox.classList.add("d-none");
  }
});

document.getElementById("sejarah").addEventListener("click", function () {
  var contentBox = document.getElementById("materisejarah");
  if (contentBox.classList.contains("d-none")) {
    contentBox.classList.remove("d-none");
    contentBox.classList.add("visible");
  } else {
    contentBox.classList.remove("visible");
    contentBox.classList.add("d-none");
  }
});
