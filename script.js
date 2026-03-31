document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('btn');
    if (btn) {
        btn.addEventListener('click', function() {
            window.location.href = 'main.html';
        });
    }
    
    const home = document.getElementById("hbtn");
    if (home) {
        home.addEventListener('click', function() {
            window.location.href = 'index.html'; 
        });
    }
});


try {
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

fetch("https://dummyjson.com/users")
  .then(res => res.json())
  .then(data => {

    const lod = document.getElementById("loader");
    if (lod) lod.style.display = "none";

    const container = document.getElementById("cont");

    function render(users) {
      container.innerHTML = "";

      users.forEach(user => {

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = user.image;

        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const name = document.createElement("h3");
        name.textContent = user.firstName + " " + user.lastName;

        const age = document.createElement("p");
        age.textContent = "Age: " + user.age;

        const heart = document.createElement("span");
        heart.classList.add("heart");
        heart.innerHTML = '<i class="fa-solid fa-heart"></i>';

        // CHECK IF ALREADY IN WISHLIST
        const isLiked = wishlist.some(u => u.id === user.id);
        if (isLiked) heart.classList.add("active");

        // CLICK EVENT
        heart.addEventListener("click", () => {

          const exists = wishlist.find(u => u.id === user.id);

          if (exists) {
            wishlist = wishlist.filter(u => u.id !== user.id);
          } else {
            wishlist.push(user);
          }

          localStorage.setItem("wishlist", JSON.stringify(wishlist));

          render(users); // re-render
        });

        overlay.appendChild(name);
        overlay.appendChild(age);
        overlay.appendChild(heart);

        card.appendChild(img);
        card.appendChild(overlay);

        container.appendChild(card);
      });
    }

    render(data.users);

    // NAV HEART (SHOW ONLY WISHLIST)
    document.getElementById("heart").addEventListener("click", () => {
      render(wishlist);
    });

    // NAV HOME (SHOW ALL)
    document.getElementById("user").addEventListener("click", () => {
      render(data.users);
    });

  }).catch((error) => {
    console.error("Error fetching products:", error);

    const err = document.getElementById("erm");
    const lod = document.getElementById("loader");

    
    if (lod) {
        lod.style.display = "flex";
    }

    setTimeout(() => {

        // hide loader after 1 second
        if (lod) {
            lod.style.display = "none";
        }

        // show error after loader
        if (err) {
            err.style.display = "flex";

            const sp = document.createElement("strong");
            sp.innerText = "❌ Error To Load Products";

            err.appendChild(sp);
        }

    }, 1000);
})} catch (error) {
    console.error("Unexpected error:", error);
}