document.addEventListener('DOMContentLoaded', function() {
    // Sample data for piano pieces
    const pianoPieces = [
        {
            id: 1,
            title: "Moonlight Sonata",
            composer: "Ludwig van Beethoven",
            composerId: 1,
            period: "Classical",
            difficulty: "intermediate",
            price: 4.99,
            description: "One of Beethoven's most popular piano sonatas, known for its beautiful first movement.",
            image: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
        },
        {
            id: 2,
            title: "Clair de Lune",
            composer: "Claude Debussy",
            composerId: 2,
            period: "Impressionist",
            difficulty: "advanced",
            price: 5.99,
            description: "The third movement from Debussy's Suite bergamasque, evoking moonlight.",
            image: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
        },
        {
            id: 3,
            title: "Für Elise",
            composer: "Ludwig van Beethoven",
            composerId: 1,
            period: "Classical",
            difficulty: "beginner",
            price: 3.99,
            description: "A famous bagatelle that is often one of the first pieces learned by piano students.",
            image: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)"
        },
        {
            id: 4,
            title: "Nocturne Op. 9 No. 2",
            composer: "Frédéric Chopin",
            composerId: 3,
            period: "Romantic",
            difficulty: "intermediate",
            price: 4.99,
            description: "One of Chopin's most famous nocturnes with its lyrical and expressive melody.",
            image: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)"
        },
        {
            id: 5,
            title: "Prelude in C Major",
            composer: "Johann Sebastian Bach",
            composerId: 4,
            period: "Baroque",
            difficulty: "beginner",
            price: 3.49,
            description: "The first prelude from Bach's Well-Tempered Clavier, a fundamental piece for all pianists.",
            image: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
        },
        {
            id: 6,
            title: "La Campanella",
            composer: "Franz Liszt",
            composerId: 5,
            period: "Romantic",
            difficulty: "advanced",
            price: 6.99,
            description: "A technically demanding étude known for its rapid jumps and delicate bell-like sounds.",
            image: "linear-gradient(135deg, #f46b45 0%, #eea849 100%)"
        }
    ];

    // Sample data for composers
    const composers = [
        {
            id: 1,
            name: "Ludwig van Beethoven",
            period: "1770-1827",
            bio: "German composer and pianist. A crucial figure in the transition between the Classical and Romantic eras.",
            image: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
        },
        {
            id: 2,
            name: "Claude Debussy",
            period: "1862-1918",
            bio: "French composer associated with Impressionist music, known for his innovative harmonies.",
            image: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
        },
        {
            id: 3,
            name: "Frédéric Chopin",
            period: "1810-1849",
            bio: "Polish composer and virtuoso pianist of the Romantic era who wrote primarily for solo piano.",
            image: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)"
        },
        {
            id: 4,
            name: "Johann Sebastian Bach",
            period: "1685-1750",
            bio: "German Baroque composer and musician, known for instrumental compositions and sacred music.",
            image: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
        },
        {
            id: 5,
            name: "Franz Liszt",
            period: "1811-1886",
            bio: "Hungarian composer, virtuoso pianist, and teacher of the Romantic era known for his technical prowess.",
            image: "linear-gradient(135deg, #f46b45 0%, #eea849 100%)"
        }
    ];

    // DOM Elements
    const piecesContainer = document.getElementById('pieces-container');
    const composersContainer = document.getElementById('composers-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.querySelector('.cart-count');
    const cartToggle = document.getElementById('cart-toggle');
    const checkoutBtn = document.getElementById('checkout-btn');
    const pieceSearch = document.getElementById('piece-search');
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));

    // Cart state
    let cart = [];

    // Initialize the page
    function init() {
        renderPieces(pianoPieces);
        renderComposers(composers);
        loadCart();
        setupEventListeners();
    }

    // Render piano pieces
    function renderPieces(pieces) {
        piecesContainer.innerHTML = '';
        pieces.forEach(piece => {
            const pieceElement = document.createElement('div');
            pieceElement.className = 'col-md-6 col-lg-4';
            pieceElement.innerHTML = `
                <div class="piece-card">
                    <div class="piece-image" style="background: ${piece.image}"></div>
                    <div class="card-body">
                        <h3 class="card-title">${piece.title}</h3>
                        <p class="card-text text-muted">${piece.composer}</p>
                        <p class="card-text">${piece.period} Period</p>
                        <p class="card-text">${piece.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="difficulty ${piece.difficulty}">${piece.difficulty.charAt(0).toUpperCase() + piece.difficulty.slice(1)}</span>
                            <div>
                                <span class="piece-price me-3">$${piece.price.toFixed(2)}</span>
                                <button class="btn btn-sm btn-accent add-to-cart" data-id="${piece.id}">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            piecesContainer.appendChild(pieceElement);
        });
    }

    // Render composers
    function renderComposers(composers) {
        composersContainer.innerHTML = '';
        composers.forEach(composer => {
            const composerElement = document.createElement('div');
            composerElement.className = 'col-md-6 col-lg-4';
            composerElement.innerHTML = `
                <div class="composer-card">
                    <div class="composer-image" style="background: ${composer.image}"></div>
                    <div class="card-body">
                        <h3 class="card-title">${composer.name}</h3>
                        <p class="card-text text-muted">${composer.period}</p>
                        <p class="card-text">${composer.bio}</p>
                    </div>
                </div>
            `;
            composersContainer.appendChild(composerElement);
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Add to cart buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                const pieceId = parseInt(e.target.getAttribute('data-id'));
                addToCart(pieceId);
            }

            if (e.target.classList.contains('remove-item')) {
                const pieceId = parseInt(e.target.getAttribute('data-id'));
                removeFromCart(pieceId);
            }
        });

        // Cart toggle
        cartToggle.addEventListener('click', function(e) {
            e.preventDefault();
            renderCart();
            cartModal.show();
        });

        // Checkout button
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                alert('Thank you for your purchase! Your sheet music will be available for download.');
                cart = [];
                saveCart();
                renderCart();
                updateCartCount();
                cartModal.hide();
            } else {
                alert('Your cart is empty!');
            }
        });

        // Search functionality
        pieceSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredPieces = pianoPieces.filter(piece => 
                piece.title.toLowerCase().includes(searchTerm) || 
                piece.composer.toLowerCase().includes(searchTerm)
            );
            renderPieces(filteredPieces);
        });
    }

    // Cart functions
    function addToCart(pieceId) {
        const piece = pianoPieces.find(p => p.id === pieceId);
        if (!piece) return;

        const existingItem = cart.find(item => item.id === pieceId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...piece,
                quantity: 1
            });
        }

        saveCart();
        renderCart();
        updateCartCount();

        // Show added animation
        const button = document.querySelector(`.add-to-cart[data-id="${pieceId}"]`);
        button.textContent = 'Added!';
        setTimeout(() => {
            button.textContent = 'Add to Cart';
        }, 1000);
    }

    function removeFromCart(pieceId) {
        cart = cart.filter(item => item.id !== pieceId);
        saveCart();
        renderCart();
        updateCartCount();
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center text-muted py-3">Your cart is empty</p>';
            cartTotalElement.textContent = '$0.00';
            return;
        }

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div>
                    <h6 class="mb-1">${item.title}</h6>
                    <small class="text-muted">by ${item.composer}</small>
                </div>
                <div class="d-flex align-items-center">
                    <span class="me-3">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = count;
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartCount();
        }
    }

    // Initialize the app
    init();
});