fetch("umkm.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("umkm-container");
    data.forEach((item) => {
      const card = document.createElement("div");
      card.className =
        "w-full max-w-md border-b pb-4 border-black md:border-none";
      card.innerHTML = `
  <div class="flex gap-3 md:flex-col md:gap-6">
    <img src="${item.productImage[0]}" alt="${item.name}" class="w-32 h-32 rounded-md object-cover md:w-full md:h-48" />
    <div class="text-start justify-between flex flex-col py-2 md:py-0">
      <h2 class="text-base font-bold md:text-lg text-blue-600">${item.name}</h2>
      <p class="text-xs text-gray-600 line-clamp-2 md:text-sm">${item.short_desc}</p>
      <div class="mt-2 md:mt-4">
        <button class="lihat-button bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm px-3 py-2 rounded-full w-32 md:w-full transition">
          Lihat Selengkapnya
        </button>
      </div>
    </div>
  </div>
`;

      container.appendChild(card);

      const button = card.querySelector(".lihat-button");
      button.addEventListener("click", () => showPopup(item));
    });
  })
  .catch((error) => {
    console.error("Gagal memuat data UMKM:", error);
  });

function showPopup(data) {
  const {
    name,
    owner,
    productImage,
    otherImage,
    description,
    waLink,
    shopeeLink,
    location,
  } = data;

  document.getElementById("popup-title").textContent = name || "UMKM";
  document.getElementById("popup-owner").textContent = owner || "";
  document.getElementById("popup-description").textContent = description;
  document.getElementById("wa-link").href = waLink;
  document.getElementById("popup-map").innerHTML = location;
  const shopeeBtn = document.getElementById("shopee-link");
  if (shopeeLink && shopeeLink.trim() !== "") {
    shopeeBtn.href = shopeeLink;
    shopeeBtn.classList.remove("hidden");
    if (shopeeLink.includes("tokopedia.com")) {
      shopeeBtn.textContent = "Link Tokopedia";
      shopeeBtn.classList.remove("bg-orange-500");
      shopeeBtn.classList.add("bg-green-600");
    } else {
      shopeeBtn.textContent = "Link Shopee";
      shopeeBtn.href = shopeeLink;
      shopeeBtn.classList.remove("bg-green-600");
      shopeeBtn.classList.add("bg-orange-500");
    }
  } else {
    shopeeBtn.classList.add("hidden");
  }

  // Swiper Produk
  const swiperMain = document.getElementById("popup-main-swiper");
  swiperMain.innerHTML = "";
  productImage.forEach((src) => {
    swiperMain.innerHTML += `
      <div class="swiper-slide">
        <img src="${src}" alt="foto utama" class="w-full h-[250px] md:h-[350px] object-cover" />
      </div>
    `;
  });

  // Grid Foto Lainnya
  const gridEl = document.getElementById("popup-grid");
  gridEl.innerHTML = "";
  otherImage.forEach((src) => {
    gridEl.innerHTML += `
      <div>
        <img src="${src}" alt="foto tambahan" class="w-full h-40 w-24 md:w-full object-cover rounded-lg" />
      </div>
    `;
  });

  document.getElementById("popup").classList.remove("hidden");

  if (window.popupSwiperMain) window.popupSwiperMain.destroy(true, true);

  window.popupSwiperMain = new Swiper(".popupMainSwiper", {
    loop: true,
    autoplay: {
      delay: 2000, // delay slide
      disableOnInteraction: false, // tetap autoplay walau ada tombol
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}
