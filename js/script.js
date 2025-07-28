function initCarInterface(cars) {
  function renderCards(carArray) {
    const container = document.getElementById("cardContainer");
    container.innerHTML = "";
    carArray.forEach(car => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-xl shadow-md overflow-hidden w-[235px]";
      card.innerHTML = `
        <div class="relative">
          <div class="card" data-credit="${car.credit}" data-barter="${car.barter}" data-year="${car.year}">
            <img src="${car.images[0]}" alt="${car.brand}" class="w-full h-[200px] object-cover"/>
          </div>
          <div class="p-4">
            <h2 class="text-lg font-bold mb-1">${car.brand} ${car.model} (${car.year})</h2>
            <p class="text-gray-600">${car.banType} • ${car.engine}L • ${car.odometer} ${car.odometerUnit}</p>
            <p class="text-gray-800 font-semibold mt-2">${car.price} ${car.currency}</p>
            <p class="text-sm text-gray-500">${car.city}</p>
          </div>
        </div>
      `;
      container.append(card);
    });
  }

  function setupBrandFilter() {
    document.querySelectorAll(".marka-select").forEach(select => {
      const input = select.querySelector(".marka-input");
      const optionsList = select.querySelector(".marka-options");
      optionsList.classList.add("hidden");

      input.addEventListener("click", e => {
        optionsList.classList.toggle("hidden");
        e.stopPropagation();
      });

      input.addEventListener("input", () => {
        const filter = input.value.toLowerCase();
        const options = optionsList.querySelectorAll("li");

        options.forEach(option => {
          option.style.display = option.textContent.toLowerCase().includes(filter) ? "" : "none";
        });

        const filtered = filter === "" ? cars : cars.filter(car =>
          car.brand.toLowerCase().includes(filter)
        );
        renderCards(filtered);
      });

      optionsList.querySelectorAll("li").forEach(option => {
        option.addEventListener("click", () => {
          input.value = option.textContent.trim();
          optionsList.classList.add("hidden");

          const filtered = cars.filter(car =>
            car.brand.toLowerCase() === input.value.toLowerCase()
          );
          renderCards(filtered);
        });
      });
    });

    window.addEventListener("click", () => {
      document.querySelectorAll(".marka-options").forEach(opt => {
        opt.classList.add("hidden");
      });
    });
  }

  function setupCityFilter() {
    const cityInput = document.getElementById("cityInput");
    const cityList = document.getElementById("cityList");
    const allCities = Array.from(cityList.querySelectorAll("li"));
    cityList.classList.add("hidden");

    function filterCities() {
      const value = cityInput.value.toLowerCase();
      let hasMatch = false;

      allCities.forEach(li => {
        const visible = li.textContent.toLowerCase().includes(value);
        li.style.display = visible ? "block" : "none";
        hasMatch ||= visible;
      });

      cityList.innerHTML = hasMatch
        ? ""
        : `<li class="px-6 py-5 text-gray-500">Tapılmadı</li>`;
      allCities.forEach(li => cityList.appendChild(li));
    }

    cityInput.addEventListener("input", filterCities);

    cityList.addEventListener("click", e => {
      if (e.target.tagName === "LI") {
        cityInput.value = e.target.textContent.trim();
        cityList.classList.add("hidden");
      }
    });

    window.addEventListener("click", e => {
      if (!e.target.closest(".marka-select")) {
        cityList.classList.add("hidden");
      }
    });
  }

  function setupCurrencyFilter() {
    const currencySelect = document.getElementById("currencyInput");
    currencySelect.addEventListener("change", () => {
      const selectedCurrency = currencySelect.value;
      const filtered = selectedCurrency === ""
        ? cars
        : cars.filter(car => car.currency === selectedCurrency);
      renderCards(filtered);
    });
  }

  let kreditActive = false;
  let barterActive = false;

  function setupKreditBarterFilter() {
    const kreditBtn = document.getElementById("kreditBtn");
    const barterBtn = document.getElementById("barterBtn");
    const cards = () => document.querySelectorAll("#cardContainer .card");

    function filterCards() {
      cards().forEach(card => {
        const isCredit = card.dataset.credit === "true";
        const isBarter = card.dataset.barter === "true";
        const show = (!kreditActive || isCredit) && (!barterActive || isBarter);
        card.style.display = show ? "block" : "none";
      });
    }

    kreditBtn.addEventListener("click", () => {
      kreditActive = !kreditActive;
      kreditBtn.classList.toggle("border-red-500", kreditActive);
      kreditBtn.classList.toggle("text-red-500", kreditActive);
      kreditBtn.classList.add("border");
      filterCards();
    });

    barterBtn.addEventListener("click", () => {
      barterActive = !barterActive;
      barterBtn.classList.toggle("border-red-500", barterActive);
      barterBtn.classList.toggle("text-red-500", barterActive);
      barterBtn.classList.add("border");
      filterCards();
    });
  }

  function createYearList(containerId, inputId, otherContainerId) {
    const container = document.getElementById(containerId);
    const input = document.getElementById(inputId);
    const otherContainer = otherContainerId ? document.getElementById(otherContainerId) : null;

    function populateList() {
      container.innerHTML = "";
      for (let y = 2025; y >= 1905; y--) {
        const li = document.createElement("li");
        li.textContent = y;
        li.className = "cursor-pointer px-[10px] py-[3px] hover:bg-blue-500 hover:text-white";
        li.addEventListener("click", () => {
          input.value = li.textContent;
          container.classList.add("hidden");
        });
        container.appendChild(li);
      }
    }

    populateList();
    container.classList.add("hidden");

    function filterList() {
      const val = input.value.toLowerCase();
      let anyVisible = false;
      Array.from(container.children).forEach(li => {
        const visible = li.textContent.toLowerCase().includes(val);
        li.style.display = visible ? "" : "none";
        anyVisible ||= visible;
      });

      if (!anyVisible) {
        container.innerHTML = `<li class="px-4 py-2 text-gray-500">Нет совпадений</li>`;
      }
    }

    input.addEventListener("focus", () => {
      if (otherContainer) otherContainer.classList.add("hidden");
      container.classList.remove("hidden");
      filterList();
    });

    input.addEventListener("input", () => {
      if (
        container.children.length === 1 &&
        container.children[0].textContent === "Нет совпадений"
      ) {
        populateList();
      }
      filterList();
    });

    input.addEventListener("click", (e) => {
      if (otherContainer) otherContainer.classList.add("hidden");
      container.classList.remove("hidden");
      e.stopPropagation();
    });

    window.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !container.contains(e.target)) {
        container.classList.add("hidden");
      }
    });
  }

  function setupResetFilter() {
    const resetBtn = document.querySelector(".reset-btn");
    const kreditBtn = document.getElementById("kreditBtn");
    const barterBtn = document.getElementById("barterBtn");

    resetBtn.addEventListener("click", () => {
      document.querySelectorAll("input").forEach(input => input.value = "");
      document.getElementById("currencyInput").value = "";

      kreditActive = false;
      barterActive = false;

      kreditBtn.classList.remove("border-red-500", "text-red-500");
      barterBtn.classList.remove("border-red-500", "text-red-500");

      document.querySelectorAll(".marka-options, #cityList, #yearOptions1, #yearOptions2").forEach(el => {
        el.classList.add("hidden");
      });

      renderCards(cars);
    });
  }

  createYearList("yearOptions1", "yearInput1", "yearOptions2");
  createYearList("yearOptions2", "yearInput2", "yearOptions1");
  renderCards(cars);
  setupBrandFilter();
  setupCityFilter();
  setupCurrencyFilter();
  setupKreditBarterFilter();
  setupResetFilter();
}

initCarInterface(cars);
