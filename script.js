
// LENSORA - Photography Collection

const photos = [
    {
        id: 1,
        title: "Mountain Sunrise",
        category: "Nature",
        location: "Himalayas, India",
        description: "The first light of the day touches the mountain peaks.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900"
    },
    {
        id: 2,
        title: "Green Forest",
        category: "Nature",
        location: "Forest Trails",
        description: "A quiet green world filled with natural beauty.",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900"
    },
    {
        id: 3,
        title: "Ocean View",
        category: "Nature",
        location: "Coastal Landscape",
        description: "Blue water and endless views create a peaceful moment.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900"
    },
    {
        id: 4,
        title: "Beautiful Beach",
        category: "Travel",
        location: "Tropical Coast",
        description: "A relaxing view of the sea on a sunny afternoon.",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900"
    },
    {
        id: 5,
        title: "City Lights",
        category: "Travel",
        location: "City Streets",
        description: "The city becomes a different world after sunset.",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=900"
    },
    {
        id: 6,
        title: "Mountain Journey",
        category: "Travel",
        location: "Mountain Roads",
        description: "A journey through beautiful mountain scenery.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900"
    },
    {
        id: 7,
        title: "Natural Beauty",
        category: "Portrait",
        location: "Portrait Collection",
        description: "A simple portrait that captures a natural expression.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900"
    },
    {
        id: 8,
        title: "Golden Moment",
        category: "Portrait",
        location: "Golden Hour",
        description: "Warm light creates a beautiful portrait moment.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900"
    },
    {
        id: 9,
        title: "Classic Portrait",
        category: "Portrait",
        location: "Portrait Collection",
        description: "A timeless portrait with a simple composition.",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900"
    },
    {
        id: 10,
        title: "Wildlife Moment",
        category: "Wildlife",
        location: "Nature Reserve",
        description: "A small glimpse into the beauty of the wild.",
        image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=900"
    },
    {
        id: 11,
        title: "Evening Colours",
        category: "Wildlife",
        location: "Open Landscape",
        description: "A beautiful scene painted with evening colours.",
        image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=900"
    },
    {
        id: 12,
        title: "Flower Details",
        category: "Nature",
        location: "Garden Collection",
        description: "A closer look at the details of a beautiful flower.",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900"
    }
];

// Photo stories

const stories = [
    {
        title: "The First Light",
        location: "Himalayas, India",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
        description: "As the sun rises, the mountains slowly come alive. This frame celebrates the calm and beauty of a new day."
    },
    {
        title: "A Walk Through Green",
        location: "Forest Trails",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900",
        description: "The forest reminds us to slow down, notice the little details and enjoy the quiet moments around us."
    },
    {
        title: "Beyond the Shore",
        location: "Tropical Coast",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900",
        description: "The meeting of the sky and the sea creates a view that feels different every time we look at it."
    }
];

let selectedCategory = "All";

let favourites = JSON.parse(
    localStorage.getItem("lensoraFavourites") || "[]"
);

// Show gallery photographs

function displayPhotos() {
    const gallery = document.getElementById("galleryGrid");
    const searchText = document.getElementById("searchInput")
        .value.toLowerCase().trim();

    gallery.innerHTML = "";

    const filteredPhotos = photos.filter(photo => {
        const correctCategory =
            selectedCategory === "All" ||
            (selectedCategory === "Favourites"
                ? favourites.includes(photo.id)
                : photo.category === selectedCategory);

        const correctSearch =
            photo.title.toLowerCase().includes(searchText) ||
            photo.category.toLowerCase().includes(searchText) ||
            photo.location.toLowerCase().includes(searchText);

        return correctCategory && correctSearch;
    });

    if (filteredPhotos.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = "No photos found. Try another search.";
        gallery.appendChild(message);
        return;
    }

    filteredPhotos.forEach(photo => {
        const card = document.createElement("div");
        card.className = "photo-card";

        const image = document.createElement("img");
        image.src = photo.image;
        image.alt = photo.title;
        image.loading = "lazy";

        const heart = document.createElement("button");
        heart.className = "fav-btn";
        heart.textContent = favourites.includes(photo.id) ? "♥" : "♡";
        heart.classList.toggle("liked", favourites.includes(photo.id));
        heart.setAttribute("aria-label", "Toggle favourite");

        heart.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleFavourite(photo.id);
        });

        const info = document.createElement("div");
        info.className = "photo-info";

        const title = document.createElement("h3");
        title.textContent = photo.title;

        const category = document.createElement("p");
        category.textContent = photo.category;

        info.appendChild(title);
        info.appendChild(category);

        card.appendChild(image);
        card.appendChild(heart);
        card.appendChild(info);

        card.addEventListener("click", function () {
            openPhoto(photo);
        });

        gallery.appendChild(card);
    });
}

// Category buttons

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", function () {
        selectedCategory = this.dataset.category;

        document.querySelectorAll(".filter").forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        document.getElementById("searchInput").value = "";
        displayPhotos();
    });
});

// Search photos

document.getElementById("searchInput")
    .addEventListener("input", displayPhotos);

// Add or remove favourites

function toggleFavourite(photoId) {
    if (favourites.includes(photoId)) {
        favourites = favourites.filter(id => id !== photoId);
    } else {
        favourites.push(photoId);
    }

    localStorage.setItem(
        "lensoraFavourites",
        JSON.stringify(favourites)
    );

    displayPhotos();
}

// Open large photo preview

function openPhoto(photo) {
    document.getElementById("modalImage").src = photo.image;
    document.getElementById("modalTitle").textContent = photo.title;
    document.getElementById("modalCategory").textContent =
        photo.category + " | " + photo.location;

    document.getElementById("modalDescription").textContent =
        photo.description;

    document.getElementById("photoModal").classList.add("show");
}

// Close photo preview

function closePhoto() {
    document.getElementById("photoModal").classList.remove("show");
}

document.getElementById("closeModal")
    .addEventListener("click", closePhoto);

document.getElementById("photoModal")
    .addEventListener("click", function (event) {
        if (event.target === this) {
            closePhoto();
        }
    });

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closePhoto();
    }
});

// Display photo stories

function displayStories() {
    const storyGrid = document.getElementById("storyGrid");

    stories.forEach(story => {
        const card = document.createElement("article");
        card.className = "story-card";

        const image = document.createElement("img");
        image.src = story.image;
        image.alt = story.title;
        image.loading = "lazy";

        const content = document.createElement("div");
        content.className = "story-content";

        const location = document.createElement("p");
        location.className = "story-location";
        location.textContent = story.location.toUpperCase();

        const title = document.createElement("h3");
        title.textContent = story.title;

        const description = document.createElement("p");
        description.textContent = story.description;

        content.appendChild(location);
        content.appendChild(title);
        content.appendChild(description);

        card.appendChild(image);
        card.appendChild(content);

        storyGrid.appendChild(card);
    });
}

// Upload a photograph

document.getElementById("photoUpload")
    .addEventListener("change", function () {
        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please choose a valid image.");
            this.value = "";
            return;
        }

        const category = prompt(
            "Choose category: Nature, Travel, Portrait or Wildlife"
        );

        if (!category) {
            this.value = "";
            return;
        }

        const categories = ["Nature", "Travel", "Portrait", "Wildlife"];

        const chosenCategory = categories.find(item =>
            item.toLowerCase() === category.trim().toLowerCase()
        );

        if (!chosenCategory) {
            alert("Please enter a valid category.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            const newPhoto = {
                id: Date.now(),
                title: file.name.replace(/\.[^/.]+$/, ""),
                category: chosenCategory,
                location: "My Collection",
                description: "A photograph added to the LENSORA collection.",
                image: event.target.result
            };

            photos.unshift(newPhoto);

            updateDashboard();
            selectAllPhotos();

            alert("Photo added to your gallery!");
        };

        reader.readAsDataURL(file);
        this.value = "";
    });

// Return to all photos after upload

function selectAllPhotos() {
    selectedCategory = "All";

    document.querySelectorAll(".filter").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.category === "All"
        );
    });

    document.getElementById("searchInput").value = "";
    displayPhotos();
}

// Update dashboard counts

function updateDashboard() {
    const counts = {
        Nature: 0,
        Travel: 0,
        Portrait: 0,
        Wildlife: 0
    };

    photos.forEach(photo => {
        if (counts[photo.category] !== undefined) {
            counts[photo.category]++;
        }
    });

    document.getElementById("totalCount").textContent = photos.length;
    document.getElementById("natureCount").textContent = counts.Nature;
    document.getElementById("travelCount").textContent = counts.Travel;
    document.getElementById("portraitCount").textContent = counts.Portrait;
    document.getElementById("wildlifeCount").textContent = counts.Wildlife;
}

// Start LENSORA

displayPhotos();
displayStories();
updateDashboard();
