p = document.createElement("p");
p.textContent="hello";
document.body.innerHTML = "<div>I am Tom</div>";
document.querySelector("div").append(p);
document.querySelector("div").prepend(p);
console.log(result);