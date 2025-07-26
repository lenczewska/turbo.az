const container = document.getElementById("cardContainer")

cars.forEach(car => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-md overflow-hidden w-[235px]";

    card.innerHTML = `
      <div class="relative">
        <img src="${car.images[0]}" alt="${car.brand}" class="w-full h-[200px] object-cover"/>
        <button class="absolute top-2 right-2 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-50">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

        </button>
      </div>
      
      <div class="p-4">
        <h2 class="text-lg font-bold mb-1">${car.brand} ${car.model} (${car.year})</h2>
        <p class="text-gray-600">${car.banType} • ${car.engine}L • ${car.odometer} ${car.odometerUnit}</p>
        <p class="text-gray-800 font-semibold mt-2">${car.price} ${car.currency}</p>
        <p class="text-sm text-gray-500">${car.city}</p>
      </div>
    `;

   container.append(card);;
});
