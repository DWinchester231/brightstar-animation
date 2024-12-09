// Loading animation management
class LoadingManager {
    constructor() {
        this.createLoader();
        this.bindEvents();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-animation">
                    <div class="star-loader"></div>
                </div>
                <div class="loader-text">Loading...</div>
            </div>
        `;
        document.body.appendChild(loader);
    }

    bindEvents() {
        window.addEventListener('load', () => {
            this.hideLoader();
            this.revealContent();
        });
    }

    hideLoader() {
        const loader = document.querySelector('.page-loader');
        loader.classList.add('loader-hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    revealContent() {
        document.querySelectorAll('.reveal-on-load').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('revealed');
            }, index * 100);
        });
    }
}

// Lazy loading for images and videos
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('[data-src]');
        this.videos = document.querySelectorAll('[data-video-src]');
        this.options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver(
                (entries, observer) => this.handleIntersection(entries, observer),
                this.options
            );

            this.images.forEach(image => this.imageObserver.observe(image));
            this.videos.forEach(video => this.imageObserver.observe(video));
        } else {
            this.loadAllMedia();
        }
    }

    handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.hasAttribute('data-src')) {
                    this.loadImage(entry.target);
                } else if (entry.target.hasAttribute('data-video-src')) {
                    this.loadVideo(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }

    loadImage(image) {
        const src = image.getAttribute('data-src');
        if (!src) return;

        image.src = src;
        image.removeAttribute('data-src');
        image.classList.add('loaded');
    }

    loadVideo(video) {
        const src = video.getAttribute('data-video-src');
        if (!src) return;

        video.src = src;
        video.load();
        video.removeAttribute('data-video-src');
        video.classList.add('loaded');
    }

    loadAllMedia() {
        this.images.forEach(image => this.loadImage(image));
        this.videos.forEach(video => this.loadVideo(video));
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new LoadingManager();
    new LazyLoader();
});
