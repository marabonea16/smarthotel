(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


// Lights Control
const lightDimButton = document.getElementById("lightDimButton");
const lightBrightenButton = document.getElementById("lightBrightenButton");
const lightTurnOffButton = document.getElementById("lightTurnOffButton");
const lightBulb = document.getElementById("lightBulb");

let lightOpacity = 1;

lightDimButton.addEventListener("click", () => {
    if (lightOpacity > 0.2) lightOpacity -= 0.2;
    updateLightBulb();
});

lightBrightenButton.addEventListener("click", () => {
    if (lightOpacity < 1) lightOpacity += 0.2;
    updateLightBulb();
});

lightTurnOffButton.addEventListener("click", () => {
    lightOpacity = 0;
    updateLightBulb();
});

function updateLightBulb() {
    lightBulb.style.opacity = lightOpacity;
}

// Windows Control
const windowOpenButton = document.getElementById("windowOpenButton");
const windowPartialButton = document.getElementById("windowPartialButton");
const windowCloseButton = document.getElementById("windowCloseButton");
const windowDisplay = document.getElementById("windowDisplay");

const windowStates = {
    closed: "closed",
    partial: "partial",
    open: "open"
};

let currentState = windowStates.closed;

windowOpenButton.addEventListener("click", () => updateWindowState(windowStates.open));
windowPartialButton.addEventListener("click", () => updateWindowState(windowStates.partial));
windowCloseButton.addEventListener("click", () => updateWindowState(windowStates.closed));

function updateWindowState(state) {
    windowDisplay.classList.remove(windowStates.closed, windowStates.partial, windowStates.open);
    windowDisplay.classList.add(state);
    currentState = state;
}

updateWindowState(currentState);

// Temperature Control
const temperatureIncreaseButton = document.getElementById("temperatureIncreaseButton");
const temperatureDecreaseButton = document.getElementById("temperatureDecreaseButton");
const temperatureDisplay = document.getElementById("temperatureDisplay");

let currentTemperature = 20; // Initial temperature

temperatureIncreaseButton.addEventListener("click", () => updateTemperature(1));
temperatureDecreaseButton.addEventListener("click", () => updateTemperature(-1));

function updateTemperature(delta) {
    currentTemperature += delta;
    temperatureDisplay.textContent = `${currentTemperature}°C`;
}

// Initial display of temperature
updateTemperature(0); // To display the initial temperature (20°C)

    
})(jQuery);

