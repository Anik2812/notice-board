document.addEventListener('DOMContentLoaded', () => {
    const classSelect = document.getElementById('classSelect');
    const addNoticeBtn = document.getElementById('addNoticeBtn');
    const noticeBoard = document.getElementById('noticeBoard');
    const noticeModal = document.getElementById('noticeModal');
    const closeModal = document.querySelector('.close');
    const noticeForm = document.getElementById('noticeForm');
    const noticeTitle = document.getElementById('noticeTitle');
    const noticeContent = document.getElementById('noticeContent');
    const noticeClass = document.getElementById('noticeClass');
    const submitBtn = document.getElementById('submitBtn');
    const confettiBtn = document.getElementById('confettiBtn');
    let currentClass = 'all';

    let notices = JSON.parse(localStorage.getItem('notices')) || [];

    function saveNotices() {
        localStorage.setItem('notices', JSON.stringify(notices));
    }

    function loadNotices() {
        const filteredNotices = notices.filter(notice => currentClass === 'all' || notice.class === currentClass);
        noticeBoard.innerHTML = '';
        if (filteredNotices.length === 0) {
            updatePlaceholder('No magical notices yet! Cast a new one below. ✨');
        } else {
            updatePlaceholder('');
        }
        filteredNotices.forEach((notice, index) => {
            const noticeCard = document.createElement('div');
            noticeCard.className = 'notice-card animate__animated animate__fadeIn';
            noticeCard.style.animationDelay = `${index * 0.1}s`;
            noticeCard.innerHTML = `
                <h3>${notice.title}</h3>
                <p>${notice.content}</p>
                <div class="class-info">Class ${notice.class}</div>
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
            `;
            noticeBoard.appendChild(noticeCard);

            noticeCard.querySelector('.edit-btn').addEventListener('click', () => openModal('Edit Magic Notice', notice));
            noticeCard.querySelector('.delete-btn').addEventListener('click', () => deleteNotice(notice.id));
        });
    }

    classSelect.addEventListener('change', (event) => {
        currentClass = event.target.value;
        loadNotices();
    });

    addNoticeBtn.addEventListener('click', () => openModal('Cast a New Magic Notice'));

    function openModal(title, notice = null) {
        if (notice) {
            noticeTitle.value = notice.title;
            noticeContent.value = notice.content;
            noticeClass.value = notice.class;
            submitBtn.textContent = 'Update Magic Notice ✨';
            submitBtn.onclick = () => updateNotice(notice.id);
        } else {
            noticeTitle.value = '';
            noticeContent.value = '';
            noticeClass.value = '';
            submitBtn.textContent = 'Cast Notice ✨';
            submitBtn.onclick = () => addNotice();
        }
        document.querySelector('#modalTitle').textContent = title;
        noticeModal.style.display = 'block';
        setTimeout(() => {
            noticeModal.querySelector('.modal-content').classList.add('open');
        }, 10);
    }

    closeModal.addEventListener('click', () => {
        noticeModal.querySelector('.modal-content').classList.remove('open');
        setTimeout(() => {
            noticeModal.style.display = 'none';
        }, 300);
    });

    function addNotice() {
        const newNotice = {
            id: Date.now(),
            title: noticeTitle.value,
            content: noticeContent.value,
            class: noticeClass.value,
        };

        notices.push(newNotice);
        saveNotices();
        loadNotices();
        closeModal.click();
        showNotification('Magic notice added successfully! ✨');
        castSpellEffect();
    }

    function updateNotice(noticeId) {
        const updatedNotice = {
            title: noticeTitle.value,
            content: noticeContent.value,
            class: noticeClass.value,
        };

        notices = notices.map(notice =>
            notice.id === noticeId ? { ...notice, ...updatedNotice } : notice
        );
        saveNotices();
        loadNotices();
        closeModal.click();
        showNotification('Magic notice updated successfully! ✨');
        castSpellEffect();
    }

    function deleteNotice(noticeId) {
        if (confirm('Are you sure you want to vanish this magic notice?')) {
            notices = notices.filter(notice => notice.id !== noticeId);
            saveNotices();
            loadNotices();
            showNotification('Magic notice vanished successfully! 💨');
            castSpellEffect();
        }
    }

    function updatePlaceholder(text) {
        const placeholder = document.querySelector('.notice-placeholder');
        if (placeholder) {
            placeholder.textContent = text;
            placeholder.classList.add('animate__animated', 'animate__pulse');
        }
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification animate__animated animate__fadeInDown';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('animate__fadeInDown');
            notification.classList.add('animate__fadeOutUp');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 2000);
    }

    function castSpellEffect() {
        const spell = document.createElement('div');
        spell.className = 'spell-effect';
        document.body.appendChild(spell);

        gsap.to(spell, {
            duration: 1,
            scale: 20,
            opacity: 0,
            ease: "power2.out",
            onComplete: () => {
                document.body.removeChild(spell);
            }
        });
    }

    function addMagicalEffects() {
        const header = document.querySelector('header');
        header.addEventListener('mouseenter', () => {
            gsap.to(header, { 
                duration: 0.3, 
                scale: 1.05, 
                boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                ease: "power2.out"
            });
        });
        header.addEventListener('mouseleave', () => {
            gsap.to(header, { 
                duration: 0.3, 
                scale: 1, 
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                ease: "power2.out"
            });
        });
    }

    confettiBtn.addEventListener('click', () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    });

    // Initialize the notice board
    loadNotices();
    addMagicalEffects();
});

// Add this to create a twinkling star effect
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    document.body.appendChild(starsContainer);

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }
}

createStars();