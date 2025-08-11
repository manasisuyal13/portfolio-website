function toggleMode() {
  const body = document.body;
  const icon = document.getElementById("themeIcon");
  body.classList.toggle("light-mode");
  icon.textContent = body.classList.contains("light-mode") ? "🌙" : "🌞";
}

var typed = new Typed("#element", {
  strings: [ "Software Engineer &#128640;.", "B.Tech Graduate &#127891;.", "AI/ML Enthusiast &#129504;.", "Beginner Web Developer &#128187;.", "Data Analytics Buff &#128202;.","Python & SQL Learner &#128013;.",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 1200,
  loop: true,
  showCursor: false,
  contentType: "html"
});

 const container = document.querySelector('.projects-container');
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('active');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1;
    container.scrollLeft = scrollLeft - walk;
  });
