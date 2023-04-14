/*--------------------
Vars
--------------------*/
let progress = 0
let startX = 0
let active = 0
let isDown = false

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
}
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
$(document).ready(function () {
  $('.clickable').on('click', function () {
    const imageId = $(this).data('image');

    // Hide all images
    $('.image').hide();

    // Show the selected image
    $('#' + imageId).show();
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