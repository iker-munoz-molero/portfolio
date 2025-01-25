const app = angular.module("portfolio", []);
app.run(function($rootScope) {

    //? [Variables]
    $rootScope.is_mobile = window.matchMedia("(hover: none)").matches;
    $rootScope.has_moved = false;
    $rootScope.mouse_x = "0px";
    $rootScope.mouse_y = "0px";
    $rootScope.mouse_type = "default";

    //? [Functions]
    $rootScope.redirect = function(url) { console.log(url); window.open(url, '_blank').focus(); }

    //? [Event listeners]
    if (!$rootScope.is_mobile) {

        document.addEventListener("mousemove", (event) => {
            
            $rootScope.has_moved = true;
            const viewport_width = window.innerWidth;
            const viewport_height = window.innerHeight;
            const padding = 50;

            $rootScope.$apply(() => {

                $rootScope.mouse_x = Math.min(Math.max(event.clientX, padding), viewport_width - padding) + "px";
                $rootScope.mouse_y = Math.min(Math.max(event.clientY, padding), viewport_height - padding) + "px";

            });

        });

        document.querySelectorAll("#pointer").forEach((button) => {

            button.addEventListener("mouseenter", function() { $rootScope.mouse_type = "pointer"; })
            button.addEventListener("mouseleave", function() { $rootScope.mouse_type = "default"; })

        })

        document.querySelectorAll("#text").forEach((text) => {

            console.log(text)
            text.addEventListener("mouseenter", function() { $rootScope.mouse_type = "text"; })
            text.addEventListener("mouseleave", function() { $rootScope.mouse_type = "default"; })

        })

    }

});