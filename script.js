const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project-card");
const search = document.querySelector("#search");
const empty = document.querySelector("#empty");

function applyFilters(){
  if(!cards.length) return;
  const active = document.querySelector(".filter.active")?.dataset.filter || "all";
  const q = (search?.value || "").trim().toLowerCase();
  let visible = 0;

  cards.forEach(card => {
    const matchesCategory = active === "all" || card.dataset.category === active;
    const matchesSearch = !q || card.dataset.title.includes(q) || card.textContent.toLowerCase().includes(q);
    const show = matchesCategory && matchesSearch;
    card.style.display = show ? "" : "none";
    if(show) visible++;
  });
  if(empty) empty.classList.toggle("show", visible === 0);
}

filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(x => x.classList.remove("active"));
  btn.classList.add("active");
  applyFilters();
}));
search?.addEventListener("input", applyFilters);

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:"smooth"}); }
  });
});
