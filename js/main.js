$(document).ready(function() {
    
    
var itemCount; // Declare itemCount globally

(function() {
    var $carousel = $('.related_carousel .owl-carousel');
    var $wrapper = $('.productRelatedWrapper'); // Reference to the wrapper

    if ($carousel.children().length === 0) {
        // Hide the wrapper if there are no items
        $wrapper.hide();
    } else {
        // Calculate the number of items
        itemCount = $carousel.children().length; // Store it globally

        console.log(itemCount); // You can now access it anywhere after this point

        // Check if we need to center the carousel
        var loopEnabled = itemCount > 5;  // Enable loop only if more than 6 items
        var autoplayEnabled = itemCount > 5; // Enable autoplay if more than 6 items
        var navEnabled = itemCount > 5; // Enable arrows if more than 6 items

        // Initialize Owl Carousel
        $carousel.owlCarousel({
            loop: loopEnabled,
            margin: 10,
            nav: navEnabled,  // Enable navigation arrows if more than 6 items
            autoplay: autoplayEnabled,  // Enable autoplay if more than 6 items
            autoplayTimeout: 3000,  // Set the autoplay timeout to 3000ms
            dots: false,
            autoplayHoverPause: false,
            navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        });

        // Center carousel if there are fewer than 5 items
        if (itemCount < 5) {
            $carousel.find('.owl-stage-outer').css({
                'display': 'flex',
                'justify-content': 'center'
            });
        }
    }
})();

console.log(itemCount); // Now you can access itemCount outside the function

    
    
});
