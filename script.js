const modes = [
  {
    name: 'balanced',
    description: '빠른 프로토타입과 품질 체크 사이의 균형을 추천합니다.',
  },
  {
    name: 'fast',
    description: '아이디어를 먼저 눈에 보이게 만들고 바로 피드백을 받습니다.',
  },
  {
    name: 'careful',
    description: '구조와 카피를 조금 더 정리한 뒤 다음 단계를 진행합니다.',
  },
];

const modeButton = document.querySelector('#modeButton');
const modeLabel = document.querySelector('#modeLabel');
const year = document.querySelector('#year');
const clock = document.querySelector('#clock');
const panelDescription = document.querySelector('.panel-card p');

let modeIndex = 0;

const renderMode = () => {
  const currentMode = modes[modeIndex];
  modeButton.textContent = `현재 모드: ${currentMode.name}`;
  modeLabel.textContent = currentMode.name;
  panelDescription.textContent = currentMode.description;
};

const updateClock = () => {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

if (modeButton && modeLabel && panelDescription) {
  modeButton.addEventListener('click', () => {
    modeIndex = (modeIndex + 1) % modes.length;
    renderMode();
  });

  renderMode();
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (clock) {
  updateClock();
  window.setInterval(updateClock, 1000 * 30);
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}