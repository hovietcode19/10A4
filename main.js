const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwyEFXHjpH2jJHIHSzvyd6ruKyDuOirKTj9JS3_e7SysYnmZeUnUTVNgEEveeqSxK7QZA/exec';
// Create neon text effect
function createNeonText(text, container) {
    container.innerHTML = '';
    const chars = text.split('');
    chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'neon-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.setProperty('--index', index);
        container.appendChild(span);
    });
}

// Initialize intro text
createNeonText('Hola', document.getElementById('line1'));
createNeonText('Chúc mừng 20/10', document.getElementById('line2'));
createNeonText('Các bông hoa đã sẵn sàng chưa, click tiếp tục nhé', document.getElementById('line3'));

function startExperience() {
    document.getElementById('introScreen').classList.add('fade-out');
    document.getElementById('mainContainer').classList.add('show');
    
    const audio = document.getElementById('bgMusic');
    audio.volume = 0.7;
    
    audio.play().catch(() => {
        document.getElementById('toggleMusic').textContent = '▶️ Phát nhạc';
        isPlaying = false;
    });
    
    setTimeout(() => {
        document.getElementById('introScreen').style.display = 'none';
    }, 800);
}

const toggleBtn = document.getElementById('toggleMusic');
const volumeControl = document.getElementById('volumeControl');
const volumeText = document.getElementById('volumeText');
const songSelect = document.getElementById('songSelect');
const currentSongDisplay = document.getElementById('currentSong');
let isPlaying = true;

function updateCurrentSong() {
    const selectedOption = songSelect.options[songSelect.selectedIndex];
    currentSongDisplay.textContent = selectedOption.text;
}

songSelect.addEventListener('change', () => {
    const audio = document.getElementById('bgMusic');
    if (!audio) return;
    
    const wasPlaying = !audio.paused;
    
    audio.src = songSelect.value;
    audio.load();
    
    if (wasPlaying) {
        audio.play().catch(() => {
            toggleBtn.textContent = '▶️ Phát nhạc';
            isPlaying = false;
        });
    }
    
    updateCurrentSong();
});

toggleBtn.addEventListener('click', () => {
    const audio = document.getElementById('bgMusic');
    if (!audio) return;
    
    if (isPlaying) {
        audio.pause();
        toggleBtn.textContent = '▶️ Phát nhạc';
    } else {
        audio.play().catch(() => {
            alert('Vui lòng tương tác với trang để phát nhạc');
        });
        toggleBtn.textContent = '⏸️ Tạm dừng';
    }
    isPlaying = !isPlaying;
});

volumeControl.addEventListener('input', (e) => {
    const audio = document.getElementById('bgMusic');
    if (audio) {
        audio.volume = e.target.value / 100;
    }
    volumeText.textContent = e.target.value + '%';
});

updateCurrentSong();

function createSparkles() {
    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(sparkle);
    }
}

function createAutumnElements() {
    const elements = ['🍂', '🍁', '🍎'];
    setInterval(() => {
        const element = document.createElement('div');
        element.className = 'autumn-element';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDuration = (Math.random() * 3 + 5) + 's';
        element.style.opacity = Math.random() * 0.5 + 0.5;
        document.body.appendChild(element);

        setTimeout(() => element.remove(), 8000);
    }, 500);
}

function createFlyingElements() {
    const elements = ['🍂', '🍎'];
    setInterval(() => {
        const element = document.createElement('div');
        element.className = 'flying-element';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.bottom = '0';
        element.style.animationDelay = Math.random() + 's';
        document.body.appendChild(element);

        setTimeout(() => element.remove(), 4000);
    }, 800);
}

const publicWishes = [];
const privateWishes = [];

document.querySelectorAll('input[name="wishType"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const recipientGroup = document.getElementById('recipientGroup');
        const recipientName = document.getElementById('recipientName');
        if (e.target.value === 'private') {
            recipientGroup.style.display = 'block';
            recipientName.required = true;
        } else {
            recipientGroup.style.display = 'none';
            recipientName.required = false;
            recipientName.value = '';
        }
    });
});

function displayWishes() {
    const container = document.getElementById('wishesContainer');
    
    if (publicWishes.length === 0) {
        container.innerHTML = '<p class="no-wishes">Chưa có lời chúc công khai nào. Hãy là người đầu tiên gửi lời chúc! 🍂</p>';
        return;
    }

    container.innerHTML = publicWishes.map(wish => `
        <div class="wish-item">
            <div class="name">🍂 ${wish.name}</div>
            <div class="message">${wish.message}</div>
            <div class="time">${wish.time}</div>
        </div>
    `).join('');
}

function checkPrivateWishes() {
    const checkName = document.getElementById('checkName').value.trim();
    
    if (!checkName) {
        alert('🍂 Vui lòng nhập tên của bạn!');
        return;
    }
    
    const myWishes = privateWishes.filter(wish => 
        wish.recipient.toLowerCase() === checkName.toLowerCase()
    );
    
    if (myWishes.length === 0) {
        alert('🍎 Chưa có lời chúc nào dành cho bạn!');
        return;
    }
    
    const modal = document.getElementById('privateWishesModal');
    const container = document.getElementById('privateWishesContainer');
    const nameDisplay = document.getElementById('recipientNameDisplay');
    
    nameDisplay.textContent = checkName;
    
    container.innerHTML = myWishes.map(wish => `
        <div class="wish-item">
            <div class="name">🍎 Từ: ${wish.sender}</div>
            <div class="message">${wish.message}</div>
            <div class="time">${wish.time}</div>
        </div>
    `).join('');
    
    modal.classList.add('active');
}

function closePrivateWishesModal(event) {
    const modal = document.getElementById('privateWishesModal');
    modal.classList.remove('active');
}

function openPhotoModal() {
    const modal = document.getElementById('photoModal');
    modal.classList.add('active');
    
    setTimeout(() => {
        createElementBurst();
    }, 300);
}

function closePhotoModal(event) {
    const modal = document.getElementById('photoModal');
    modal.classList.remove('active');
    
    document.querySelectorAll('.burst-element').forEach(e => e.remove());
}

function createElementBurst() {
    const modal = document.getElementById('photoModal');
    const elements = ['🍂', '🍁', '🍎'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            element.className = 'burst-element';
            element.textContent = elements[Math.floor(Math.random() * elements.length)];
            element.style.left = '50%';
            element.style.top = '50%';
            
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 200;
            element.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            element.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            
            modal.appendChild(element);
            
            setTimeout(() => element.remove(), 1000);
        }, i * 30);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePhotoModal(e);
        closePrivateWishesModal(e);
    }
});

document.getElementById('wishForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwyEFXHjpH2jJHIHSzvyd6ruKyDuOirKTj9JS3_e7SysYnmZeUnUTVNgEEveeqSxK7QZA/exec; // <--- THAY URL CỦA BẠN VÀO ĐÂY

    const senderName = document.getElementById('senderName').value.trim();
    const message = document.getElementById('wishMessage').value.trim();
    const wishType = document.querySelector('input[name="wishType"]:checked').value;
    const recipientName = document.getElementById('recipientName').value.trim();

    if (!senderName || !message) {
        alert('🍂 Vui lòng điền đầy đủ thông tin!');
        return;
    }

    if (wishType === 'private' && !recipientName) {
        alert('🍎 Vui lòng nhập tên người nhận!');
        return;
    }

    const now = new Date();
    const timeStr = now.toLocaleString('vi-VN');

    // Gửi dữ liệu lên Google Sheet
    const payload = wishType === 'public'
    ? { type: 'public', sender: senderName, message }
    : { type: 'private', sender: senderName, recipient: recipientName, message };

    await fetch(SHEET_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
    });

    alert(wishType === 'public' 
        ? '✨ Lời chúc công khai của bạn đã được gửi thành công! 🍂'
        : `✨ Lời chúc riêng của bạn đã được gửi đến ${recipientName}! 🍎`
    );

    // Làm mới form
    document.getElementById('senderName').value = '';
    document.getElementById('wishMessage').value = '';
    document.getElementById('recipientName').value = '';
    document.querySelector('input[name="wishType"][value="public"]').checked = true;
    document.getElementById('recipientGroup').style.display = 'none';

    // Tải lại danh sách lời chúc công khai
    if (wishType === 'public') {
    // 🧹 Xóa cache cũ để đảm bảo lấy dữ liệu mới nhất
    localStorage.removeItem('publicWishes');
    // 🔄 Gọi lại hàm loadPublicWishes để hiển thị lời chúc mới
    loadPublicWishes();
}
});

async function loadPublicWishes() {
    const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwyEFXHjpH2jJHIHSzvyd6ruKyDuOirKTj9JS3_e7SysYnmZeUnUTVNgEEveeqSxK7QZA/exec';
    const container = document.getElementById('wishesContainer');

    // 1️⃣ — Hiển thị dữ liệu có sẵn trong cache (nếu có)
    const cached = localStorage.getItem('publicWishes');
    if (cached) {
        try {
            const data = JSON.parse(cached);
            container.innerHTML = data.map(wish => `
                <div class="wish-item">
                    <div class="name">🍂 ${wish.sender}</div>
                    <div class="message">${wish.message}</div>
                    <div class="time">${new Date(wish.time).toLocaleString('vi-VN')}</div>
                </div>
            `).join('');
        } catch (e) {
            console.warn('Lỗi đọc cache:', e);
            localStorage.removeItem('publicWishes');
        }
    } else {
        // Nếu chưa có cache, hiển thị "đang tải"
        container.innerHTML = '<p class="no-wishes">⏳ Đang tải lời chúc...</p>';
    }

    // 2️⃣ — Lấy dữ liệu mới nhất từ Google Sheet
    try {
        const res = await fetch(`${SHEET_URL}?action=public`, { cache: "no-store" });
        const json = await res.json();

        if (!json.ok || !json.data || json.data.length === 0) {
            container.innerHTML = '<p class="no-wishes">Chưa có lời chúc công khai nào. 🍂</p>';
            return;
        }

        // 3️⃣ — Lưu vào cache để load nhanh lần sau
        localStorage.setItem('publicWishes', JSON.stringify(json.data));

        // 4️⃣ — Hiển thị lời chúc mới nhất
        container.innerHTML = json.data.map(wish => `
            <div class="wish-item">
                <div class="name">🍂 ${wish.sender}</div>
                <div class="message">${wish.message}</div>
                <div class="time">${new Date(wish.time).toLocaleString('vi-VN')}</div>
            </div>
        `).join('');
    } catch (err) {
        console.error('❌ Lỗi tải dữ liệu mới:', err);
        // Nếu fetch lỗi, vẫn giữ cache cũ (tránh mất dữ liệu hiển thị)
        if (!cached) {
            container.innerHTML = '<p class="no-wishes">⚠️ Không thể tải dữ liệu, vui lòng thử lại sau!</p>';
        }
    }
}


createSparkles();
createAutumnElements();
createFlyingElements();
loadPublicWishes();
