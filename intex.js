  const buttons = document.querySelectorAll(".btn");
  const boxes = document.querySelectorAll(".box");
  const searchBox = document.querySelector("#search");
  const searchForm = document.querySelector("#search-form");
  let activeFilter = "all";
  let activeSearch = "";

  function updateGallery() {
    boxes.forEach((box) => {
      const category = box.dataset.item;
      const description = box.querySelector("img").alt.toLowerCase();
      const matchesFilter = activeFilter === "all" || category === activeFilter;
      const matchesSearch =
        category.includes(activeSearch) || description.includes(activeSearch);

      box.hidden = !(matchesFilter && matchesSearch);
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      updateGallery();

      buttons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("btn-clicked", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });
    });
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    activeSearch = searchBox.value.toLowerCase().trim();
    updateGallery();

    const firstVisibleBox = Array.from(boxes).find((box) => !box.hidden);
    if (firstVisibleBox) {
      firstVisibleBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter));
  });
  buttons[0].classList.add("btn-clicked");
  updateGallery();
