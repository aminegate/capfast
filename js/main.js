$(document).ready(function() {
 
 $("#catalogueSelect").change(function(){
                $("#printCatalogue").prop("disabled", $(this).val() === "");
            }); 
    
    
$('#printCatalogue').on('click', function() {
            window.print(); // Open the print dialog
        });    
    
    
(function () {


    // Function to toggle between print and view buttons
    function toggleButtons() {
        if ($(window).width() <= 768) { 
            $('#viewInvoice').show();   
            $('#printInvoice').hide();  
            captureScreenshot();
        } else {
            $('#viewInvoice').hide();   
            $('#printInvoice').show(); 
        }
    }

    // Function to capture a screenshot
    function captureScreenshot() {
        const devisElement = $('#invoice');

        if (devisElement.length === 0) {
            console.error("Invoice element not found.");
            return;
        }

        const originalStyles = devisElement.attr('style') || '';

        // Temporarily apply styles to make the invoice element ready for capturing
        devisElement.css({
            'position': 'absolute',
            'left': '-9999px',
            'width': '1024px',
            'font-size': '16px',
            'display': 'block',
            'visibility': 'visible'
        });

        // Allow the browser to render the element before capturing the screenshot
        setTimeout(function() {
            html2canvas(devisElement[0]).then(function(canvas) {
                devisElement.attr('style', originalStyles);  // Restore original styles
                const screenshotURL = canvas.toDataURL("image/png");
                $('.deviscapture .screenshot').attr('src', screenshotURL);
            }).catch(function(error) {
                console.error("Error capturing screenshot:", error);
                devisElement.attr('style', originalStyles);  // Restore original styles
            });
        }, 100);  // Delay to allow rendering
    }

    // Function to display the invoice in full width
    function displayInvoiceAsHTML() {
        const invoiceContent = $('#invoice').html();

        if (!invoiceContent) {
            console.error("No content found in #invoice");
            return;
        }

        // Open the invoice content in a new tab
        const newWindow = window.open('', '_blank');
        if (newWindow) {
            const headContent = $('head').clone(); // Clone the head to reuse styles

            // Write HTML content to the new window, including styles
            newWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    ${headContent.html()} <!-- Include existing styles from the head -->
                    <style>
    body { 
        font-family: Arial, sans-serif; 
        margin: 20px; 
    }
    #invoicewrapper {  
        width: 1024px; 
         background: white;
    }

#invoice { 
        font-size: 12px; 
        width: 1024px; 
    }
</style>

                </head>
                <body>
                    <div id="invoicewrapper">
                        ${invoiceContent}
                    </div>
                </body>
                </html>
            `);
            newWindow.document.close(); // Close the document to finish rendering
        } else {
            alert("Please allow pop-ups to view the invoice.");
        }
    }

    // Document ready function
    $(document).ready(function() {
        // Add click event for print button
        $('#printInvoice').on('click', function() {
            window.print(); // Open the print dialog
        });

        // Initialize button toggling on page load
        toggleButtons();

        // Handle window resize to adjust buttons dynamically
        $(window).on('resize', function() {
            toggleButtons();
        });
        
        // Handle the "View Invoice" button click
        $('#viewInvoice').click(function() {
            displayInvoiceAsHTML();
        });
    });
})();
     
    
// pop up
(function () {
    
      $('#showPopup').on('click', function (e) {
          e.preventDefault(); // Prevent form submission
          $('#popupOverlay').fadeIn();
      });

      // Submit form
      $('#popupForm').on('submit', function (e) {
          e.preventDefault(); // Prevent form submission
          $('#popupOverlay').fadeOut();
      });

      // Close popup when clicking outside
      $('#popupOverlay').on('click', function (e) {
          if ($(e.target).is('#popupOverlay')) {
              $(this).fadeOut();
          }
      });

  })();
    
// number   
(function () {
  // Increment button
  $('.increment').click(function() {
    var input = $(this).siblings('.quantity');
    var value = parseInt(input.val(), 10);
    if (value < input.attr('max')) {
      input.val(value + 1);
    }
  });

  // Decrement button
  $('.decrement').click(function() {
    var input = $(this).siblings('.quantity');
    var value = parseInt(input.val(), 10);
    if (value > input.attr('min')) {
      input.val(value - 1);
    }
  });
})();
    
// datatble
(function () {

    // Check if the table exists before initializing DataTable
    if ($('#table__fiche__clients').length) {
        $('#table__fiche__clients').DataTable({
            paging: true,
            responsive: {
        details: {
            type: 'inline', // or 'child-row' for expandable rows
            renderer: function (api, rowIdx, columns) {
                var data = $.map(columns, function (col, i) {
                    return col.hidden
                        ? '<tr><td>' + col.title + ':</td> <td>' + col.data + '</td></tr>'
                        : '';
                }).join('');
                return data ? $('<table/>').append(data) : false;
            }
        }
    },
            searching: true,
            ordering: false,
            info: false,
            pageLength: 30,
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'colvis',
                    text: 'Toggle Columns'
                    },
                {
                    extend: 'excelHtml5',
                    text: 'Export to Excel'
                    },
                {
                    text: 'Refresh',
                    action: function (e, dt, node, config) {
                        dt.ajax.reload();
                    }
                    }
                ],
            language: {
                search: "Rechercher  :  ",
                lengthMenu: "Afficher _MENU_ enregistrements par page",
                info: "Affichage de _START_ à _END_ sur _TOTAL_ enregistrements",
                infoEmpty: "Aucun enregistrement à afficher",
                infoFiltered: "(filtré à partir de _MAX_ enregistrements au total)",
                paginate: {
                    first: '<i class="fa-solid fa-backward-step"></i>',
                    last: '<i class="fa-solid fa-forward-step"></i>',
                    next: '<i class="fa-solid fa-caret-right"></i>',
                    previous: '<i class="fa-solid fa-caret-left"></i>'
                },
                zeroRecords: "Aucun résultat trouvé",
                emptyTable: "Aucune donnée disponible dans le tableau"
            },
            lengthMenu: [5, 10, 25, 50],
            buttons: [
                {
                    extend: 'colvis',
                    text: '<i class="fa-solid fa-table-columns"></i>'
                    },
                {
                    extend: 'pageLength',
                    text: '<i class="fa-solid fa-arrow-down-1-9"></i>',
                    titleAttr: 'Select number of rows per page',
                    options: [
                            [5, 10, 15, -1],
                            ['5 rows', '10 rows', '15 rows', 'All rows']
                        ],
                    },
                {
                    extend: 'excelHtml5',
                    text: '<i class="fa-solid fa-file-excel"></i>'
                    },
                {
                    text: '<i class="fa-solid fa-arrows-rotate"></i>',
                    action: function (e, dt, node, config) {
                        dt.ajax.reload();
                    }
                    }
                ]
        });
    }

})();
    
// menu
document.getElementById('menu-toggle').addEventListener('click', function() {
    var sideMenu = document.getElementById('side-menu');
    var menuToggle = this;

    if (sideMenu.style.left === '0px') {
        sideMenu.style.left = '-250px'; // Hide the menu
        menuToggle.style.left = '10px'; // Move the button back to its original position
        menuToggle.textContent = '☰ Menu';
    } else {
        sideMenu.style.left = '0'; // Show the menu
        menuToggle.style.left = '260px'; // Move the button to the right of the menu
        menuToggle.textContent = '✕ Menu';
    }
});
    
// slider  
(function() {
    var $carousel = $('.related_carousel .owl-carousel');
    var $wrapper = $('.productRelatedWrapper'); // Reference to the wrapper

    if ($carousel.children().length === 0) {
        // Hide the wrapper if there are no items
        $wrapper.hide();
    } else {
        // Calculate the number of items
        var itemCount = $carousel.children().length; // Store it globally

        console.log(itemCount); // You can now access it anywhere after this point

        // Check if we need to center the carousel
        var loopEnabled = itemCount > 4;  // Enable loop only if more than 6 items
        var autoplayEnabled = itemCount > 4; // Enable autoplay if more than 6 items
        var navEnabled = itemCount > 4; // Enable arrows if more than 6 items

        // Initialize Owl Carousel
        $carousel.owlCarousel({
            loop: loopEnabled,
            margin: 10,
            nav: navEnabled,  // Enable navigation arrows if more than 6 items
            autoplay: false,  // Enable autoplay if more than 6 items
            autoplayTimeout: 3000,  // Set the autoplay timeout to 3000ms
            dots: false,
            autoplayHoverPause: false,
            navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
            responsive: {
                0: {
                    items: 1,
                    nav: itemCount > 1 // Enable nav if more than 1 item
                },
                600: {
                    items: 2,
                    nav: itemCount > 2 // Enable nav if more than 3 items
                },
                991: {
                    items: 3,
                    nav: itemCount > 3 // Enable nav if more than 4 items
                },
                1200: {
                    items: 4,
                    nav: itemCount > 4 // Enable nav if more than 5 items
                }
            }
        });

if (itemCount < 2) {
    $carousel.find('.owl-stage').css({
        'width': '100%',
        'display': 'flex',
        'justify-content': 'center'
    });
    $carousel.find('.owl-item').css({
        'width': '315px'
    });
} else if (itemCount === 2 ) {
    $carousel.find('.owl-stage').css({
        'width': '100%',
        'display': 'flex',
        'justify-content': 'center'
    });
    $carousel.find('.owl-item').css({
        'width': '315px'
    });
} else if (itemCount < 5) {
    var itemWidth = 100 / itemCount; // Calculate the width for each item
    $carousel.find('.owl-stage').css({
        'width': '100%',
        'display': 'flex',
        'justify-content': 'center'
    });
    $carousel.find('.owl-item').css({
        'width': itemWidth + '%'
    });
}

        // Additional condition for screens <= 991px and at least 3 items
        if (window.innerWidth <= 991 && itemCount >= 3) {
    $carousel.trigger('refresh.owl.carousel'); // Refresh the carousel
    $carousel.owlCarousel({
        loop: false,
        margin: 10,
        nav: true, // Enable navigation arrows
        autoplay: false,
        dots: false,
        navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1,
                nav: itemCount > 1
            },
            600: {
                items: 2, // Display 2 items for screens <= 991px
                nav: true
            },
            991: {
                items: 2, // Display 2 items for screens <= 991px
                nav: true
            }
        }
    });
}
    
    }
})();

    
});
