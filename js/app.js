const app = angular.module("portfolio", []);
app.run(function($rootScope, $http) {

    //? [Variables]
    $rootScope.is_mobile = window.matchMedia("(hover: none)").matches;
    $rootScope.has_moved = false;
    $rootScope.mouse_x = "0px";
    $rootScope.mouse_y = "0px";
    $rootScope.mouse_type = "default";
    $rootScope.user_message = { name: "", email: "", description: "" };
    $rootScope.user_feedback = "";
    $rootScope.year = new Date().getFullYear();

    //? [Functions]
    $rootScope.redirect = function(url) { console.log(url); window.open(url, '_blank').focus(); }
    $rootScope.scroll_to = function(section) { document.getElementById(section).scrollIntoView({ behavior: 'smooth' }); }

    $rootScope.send_message = function() {

        $rootScope.user_feedback = "";
        if (
            !$rootScope.user_message.name ||
            !$rootScope.user_message.email ||
            !$rootScope.user_message.description
        ) { 

            $rootScope.user_feedback = "Please fill in all fields.";
            return;

        };

        const regex_pattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
        if (!regex_pattern.test($rootScope.user_message.email)) { 

            $rootScope.user_feedback = "Enter a valid email address.";
            return;

        }

        request_data = {

            access_key: "625071a7-183c-47b6-bd4f-c5987db4bb47",
            email: $rootScope.user_message.email,
            subject: `${$rootScope.user_message.name} has a consult!`,
            message: $rootScope.user_message.description

        }
        $http.post("https://api.web3forms.com/submit", request_data)
        .then(function(response) {

            $rootScope.user_message = { name: "", email: "", description: "" };
            $rootScope.user_feedback = "Message sent successfully!";


        }).catch(function(error) {

            $rootScope.user_message = { name: "", email: "", description: "" };
            $rootScope.user_feedback = "Error. Please try again later.";

        });

    }

    //? [Event listeners]
    if (!$rootScope.is_mobile) {

        document.addEventListener("mousemove", (event) => {
            
            $rootScope.has_moved = true;
            $rootScope.$apply(() => {

                $rootScope.mouse_x = event.pageX + "px";
                $rootScope.mouse_y = event.pageY + "px";

            });

        });

        document.querySelectorAll("#pointer").forEach((button) => {

            button.addEventListener("mouseenter", function() { $rootScope.mouse_type = "pointer"; })
            button.addEventListener("mouseleave", function() { $rootScope.mouse_type = "default"; })

        })

        document.querySelectorAll("#text").forEach((text) => {

            text.addEventListener("mouseenter", function() { $rootScope.mouse_type = "text"; })
            text.addEventListener("mouseleave", function() { $rootScope.mouse_type = "default"; })

        })

        document.querySelectorAll("#input").forEach((input) => {

            input.addEventListener("mouseenter", function() { $rootScope.mouse_type = "input"; })
            input.addEventListener("mouseleave", function() { $rootScope.mouse_type = "default"; })

        })

    }

});