const images = [
    { id: 1, url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop", category: "nature", title: "Misty Mountain Forest" },
    { id: 2, url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop", category: "nature", title: "Yosemite Valley Stream" },
    { id: 3, url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop", category: "architecture", title: "Modern Glass Skyscraper" },
    { id: 4, url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop", category: "architecture", title: "Minimalist Interior Design" },
    { id: 5, url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop", category: "technology", title: "Matrix Code Background" },
    { id: 6, url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop", category: "technology", title: "Computer Motherboard" },
    { id: 7, url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop", category: "nature", title: "Sunlit Pine Forest" },
    { id: 8, url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&auto=format&fit=crop", category: "architecture", title: "City Skyline at Night" }
];

let currentIndex = 0;
let filteredImages = [...images];

const galleryGrid = document.getElementById("gallery-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeLightbox = document.getElementById("close-lightbox");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function renderGallery(items) {
    galleryGrid.innerHTML = "";
    items.forEach((img, index) => {
        const card = document.createElement("div");
        card.className = "group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-slate-800 aspect-square";
        card.innerHTML = `
            <img src="${img.url}" alt="${img.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span class="text-white font-medium text-sm">${img.title}</span>
            </div>
        `;
        card.addEventListener("click", () => openLightbox(index));
        galleryGrid.appendChild(card);
    });
}

filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        filterButtons.forEach(b => {
            b.classList.remove("bg-indigo-600", "text-white");
            b.classList.add("bg-slate-800", "text-slate-300");
        });
        e.target.classList.remove("bg-slate-800", "text-slate-300");
        e.target.classList.add("bg-indigo-600", "text-white");

        const category = e.target.getAttribute("data-category");
        if (category === "all") {
            filteredImages = [...images];
        } else {
            filteredImages = images.filter(img => img.category === category);
        }
        renderGallery(filteredImages);
    });
});

function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
}

function closeLightboxModal() {
    lightbox.classList.remove("flex");
    lightbox.classList.add("hidden");
}

function updateLightboxContent() {
    const currentImg = filteredImages[currentIndex];
    lightboxImg.src = currentImg.url;
    lightboxCaption.textContent = currentImg.title;
}

nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % filteredImages.length;
    updateLightboxContent();
});

prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxContent();
});

closeLightbox.addEventListener("click", closeLightboxModal);
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightboxModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightboxModal();
});

renderGallery(images);