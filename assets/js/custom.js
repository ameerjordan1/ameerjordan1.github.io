// ── Timeline animation ──
const experienceArticle = document.getElementById('experience');

function checkTimelineVisibility() {
  const items = experienceArticle.querySelectorAll('.timeline-item');
  const containerRect = experienceArticle.getBoundingClientRect();

  items.forEach((item, index) => {
    const itemRect = item.getBoundingClientRect();
    const isVisible = itemRect.top < containerRect.bottom - 20 &&
                      itemRect.bottom > containerRect.top + 20;
    if (isVisible) {
      setTimeout(() => item.classList.add('visible'), index * 150);
    }
  });
}

const expObserver = new MutationObserver(() => {
  if (experienceArticle.classList.contains('active')) {
    setTimeout(checkTimelineVisibility, 100);
    experienceArticle.addEventListener('scroll', checkTimelineVisibility);
  } else {
    experienceArticle.querySelectorAll('.timeline-item')
      .forEach(item => item.classList.remove('visible'));
    experienceArticle.removeEventListener('scroll', checkTimelineVisibility);
  }
});

expObserver.observe(experienceArticle, { attributes: true });

// ── Project category toggle ──
function showCategory(category, btn) {
  const allCategories = document.querySelectorAll('.project-category');
  const allButtons = document.querySelectorAll('.toggle-btn');
  const target = document.getElementById(category);

  if (btn.classList.contains('active')) {
    target.style.display = 'none';
    btn.classList.remove('active');
    return;
  }

  allCategories.forEach(el => el.style.display = 'none');
  allButtons.forEach(b => b.classList.remove('active'));

  target.style.display = 'block';
  btn.classList.add('active');
}

function resetProjects() {
  document.querySelectorAll('.project-category').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
}

const projectsArticle = document.getElementById('projects');

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      if (!projectsArticle.classList.contains('active')) {
        resetProjects();
      }
    }
  });
});

observer.observe(projectsArticle, { attributes: true });

function toggleProject(card) {
  card.classList.toggle('open');
}

function closeProject(event, btn) {
  event.stopPropagation();
  btn.closest('.project-card').classList.remove('open');
}

function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';

  setTimeout(function() {
    $('article').removeClass('active').hide();
    var $projects = $('#projects');
    $projects.show();
    $projects.addClass('active');
  }, 50);
}

// ── Syntax highlighting ──
hljs.highlightAll();

fetch('app.py')
  .then(response => response.text())
  .then(code => {
    const el = document.getElementById('appcode');
    el.textContent = code;
    hljs.highlightElement(el);
  })
  .catch(() => {
    document.getElementById('appcode').textContent = 'Could not load source file.';
  });
