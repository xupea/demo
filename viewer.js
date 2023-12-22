const ul = document.createElement("ul", {
  id: "images",
});

for (let i = 1; i < 4; i++) {
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.src = `./tibet-${i}.jpeg`;
  li.appendChild(img);
  ul.appendChild(li);
}

const gallery = new Viewer(ul, {
  navbar: false,
  button: false,
  backdrop: false,
});

gallery.show();
