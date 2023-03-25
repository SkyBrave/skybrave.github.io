/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

const $descriptionText = document.querySelector('.description-text');

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)

  // Update the description text based on the active carousel item
  if (index === active) {
    const description = item.dataset.description || ''; // Use the data-description attribute as the description text
    $descriptionText.textContent = description;
    document.querySelector('.description-box').style.opacity = '1';
  }
}



/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}


const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}
const handleKeyDown = (e) => {
  if (e.code === 'ArrowRight') {
    progress += 100 / ($items.length - 1);
  } else if (e.code === 'ArrowLeft') {
    progress -= 100 / ($items.length - 1);
  }
  animate();
};




let timer;

const createButton = () => {
  const button = document.createElement('button');
  button.textContent = 'Learn More';
  button.classList.add('new-button');
  button.addEventListener('click', () => {
    const activeUrl = urls[active];
    window.open(activeUrl, '_blank');
  });
  return button;
};

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('new-button-container');
document.querySelector('.carousel').appendChild(buttonContainer);

const urls = [
  'agentindepth/agentindepth.html',
  'page2.html',
  'page3.html',
  'page4.html',
  'agentindepth/agentindepth.html',
  'page6.html',
  'page7.html',
  'page8.html',
  'page9.html',
  'page10.html',
];

const button = createButton();
buttonContainer.appendChild(button);

$items.forEach((item, index) => {
  item.addEventListener('mouseenter', () => {
    // Check if the current item is active before showing the button
    if (index !== active) return;

    clearTimeout(timer);
    buttonContainer.style.top = `${item.getBoundingClientRect().top - 50}px`;
    button.style.opacity = '1';
    button.style.pointerEvents = 'auto';
  });

  item.addEventListener('mouseleave', () => {
    timer = setTimeout(() => {
      button.style.opacity = '0';
      button.style.pointerEvents = 'none';
    }, 2000); // Change the duration here (in milliseconds)
  });

  button.addEventListener('mouseenter', () => {
    clearTimeout(timer);
  });

  button.addEventListener('mouseleave', () => {
    timer = setTimeout(() => {
      button.style.opacity = '0';
      button.style.pointerEvents = 'none';
    }, 2000); // Change the duration here (in milliseconds)
  });
});










/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)
document.addEventListener('keydown', handleKeyDown);