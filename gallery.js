function Gallery(gallery) {
    if(!gallery) {
        throw new Error('No Gallery Found!')
    }
    //select the elements we need 
    const images = Array.from(gallery.querySelectorAll('img'));
    const modal = document.querySelector('.modal');
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');
    let currentImage;

    function openModal() {
        console.info('Opening Modal...');
        //firs check if the modal is already open
        if(modal.matches('.open')) {
            console.info('Modal already open');
            return;
        }
        modal.classList.add('open'); 

        //Event listners to be bound when we open the modal
        window.addEventListener('keyup', handleKeyUp);
        nextButton.addEventListener('click', showNextImage);
        prevButton.addEventListener('click', showPrevImage);
    }
    
    function closeModal() {
        modal.classList.remove('open'); 
        //add evetListeners for clicks and keyboard..
        window.removeEventListener('keyup', handleKeyUp);
        nextButton.removeEventListener('click', showNextImage);
        prevButton.removeEventListener('click', showPrevImage);
        

    }

    function handleClickOutside(e) {
        if(e.target === e.currentTarget) {
            closeModal();
        }
    }

    function showNextImage() {
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }

    function showPrevImage() {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }

    function handleKeyUp(event) {
        if(event.key === 'Escape') return closeModal();
        if(event.key === 'ArrowRight') return showNextImage();
        if(event.key === 'ArrowLeft') return showPrevImage();

    }

    function showImage(el) {
        if(!el) {
            console.info('no image to show');
            return
        }
        //update the modal with this info
        console.log(el);
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('figure p').textContent = el.dataset.description;
        currentImage = el;
        openModal();
    }

//these are our event listeners 
    images.forEach(image => 
        image.addEventListener('click', (e) => showImage
        (e.currentTarget))
    );

    images.forEach(image => {
        image.addEventListener('keyup', e => {
            if(e.key === 'Enter') {
                showImage(e.currentTarget);
            }
        });
    });

    modal.addEventListener('click', handleClickOutside);

}


//use it on the page

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));