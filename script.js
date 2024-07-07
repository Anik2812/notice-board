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
    let currentClass = 'all';
  
    let notices = [];
  
    function loadNotices() {
      const filteredNotices = notices.filter(notice => currentClass === 'all' || notice.class === currentClass);
      noticeBoard.innerHTML = '';
      if (filteredNotices.length === 0) {
        updatePlaceholder('No notices for this class.');
      } else {
        updatePlaceholder('');
      }
      filteredNotices.forEach(notice => {
        const noticeCard = document.createElement('div');
        noticeCard.className = 'notice-card';
        noticeCard.innerHTML = `
          <h3>${notice.title}</h3>
          <p>${notice.content}</p>
          <button class="edit-btn">&#9998;</button>
          <button class="delete-btn">&#10006;</button>
        `;
        noticeBoard.appendChild(noticeCard);
  
        noticeCard.querySelector('.edit-btn').addEventListener('click', () => openModal('Edit Notice', notice));
        noticeCard.querySelector('.delete-btn').addEventListener('click', () => deleteNotice(notice.id));
      });
    }
  
    classSelect.addEventListener('change', (event) => {
      currentClass = event.target.value;
      loadNotices();
    });
  
    addNoticeBtn.addEventListener('click', () => openModal('Add New Notice'));
  
    function openModal(title, notice = null) {
      if (notice) {
        noticeTitle.value = notice.title;
        noticeContent.value = notice.content;
        noticeClass.value = notice.class;
        submitBtn.textContent = 'Update Notice';
        submitBtn.onclick = () => updateNotice(notice.id);
      } else {
        noticeTitle.value = '';
        noticeContent.value = '';
        noticeClass.value = '';
        submitBtn.textContent = 'Add Notice';
        submitBtn.onclick = () => addNotice();
      }
      document.querySelector('#modalTitle').textContent = title;
      noticeModal.style.display = 'block';
      noticeModal.querySelector('.modal-content').classList.add('open');
    }
  
    closeModal.addEventListener('click', () => {
      noticeModal.style.display = 'none';
      noticeModal.querySelector('.modal-content').classList.remove('open');
    });
  
    function addNotice() {
      const newNotice = {
        id: Date.now(),
        title: noticeTitle.value,
        content: noticeContent.value,
        class: noticeClass.value,
      };
  
      notices.push(newNotice);
      loadNotices();
      closeModal.click();
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
      loadNotices();
      closeModal.click();
    }
  
    function deleteNotice(noticeId) {
      notices = notices.filter(notice => notice.id !== noticeId);
      loadNotices();
    }
  
    function updatePlaceholder(text) {
      const placeholder = document.querySelector('.notice-placeholder');
      if (placeholder) {
        placeholder.textContent = text;
      }
    }
  
    loadNotices();
  });
  