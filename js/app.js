const app = angular.module("portfolio", []);
app.run(function($rootScope, $http) { 

    //? [Variables]
    //* Page data
    $rootScope.benefits = benefits;
    $rootScope.projects = projects;
    $rootScope.products = products;

    //* Current year
    $rootScope.year = new Date().getFullYear();

    //* Custom mouse
    $rootScope.is_mobile = window.matchMedia("(hover: none)").matches;
    $rootScope.has_moved;
    $rootScope.mouse_x;
    $rootScope.mouse_y;
    $rootScope.cursor = "default";

    //* Contact form
    $rootScope.name_value;
    $rootScope.name_error;
    $rootScope.mail_value;
    $rootScope.mail_error;
    $rootScope.description_value;
    $rootScope.description_error;
    $rootScope.status_feedback;

    //? [Functions]
    //* Navigation
    $rootScope.redirect = function(url) { console.log(url); window.open(url, '_blank').focus(); }
    $rootScope.scroll_to = function(section) { document.getElementById(section).scrollIntoView({ behavior: 'smooth' }); }

    //* Contact form
    $rootScope.clear_fields = function() {

        $rootScope.name_value = "";
        $rootScope.mail_value = "";
        $rootScope.description_value = "";

    }

    $rootScope.clear_errors = function() {

        $rootScope.name_error = "";
        $rootScope.mail_error = "";
        $rootScope.description_error = "";
        $rootScope.status_feedback = "";

    }

    $rootScope.validate_data = function() {

        $rootScope.clear_errors()
        if (!$rootScope.name_value) { $rootScope.name_error = "Please fill out this field."; return; }

        const regex_pattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
        if (!$rootScope.mail_value) { $rootScope.mail_error = "Please fill out this field."; return; }
        if (!regex_pattern.test($rootScope.mail_value)) { $rootScope.mail_error = "Enter a valid email address."; return; }

        if (!$rootScope.description_value) { $rootScope.description_error = "Please fill out this field."; return; }

        $rootScope.send_mail();

    }

    $rootScope.send_mail = function() {

        request_data = {

            access_key: "625071a7-183c-47b6-bd4f-c5987db4bb47",
            email: $rootScope.mail_value,
            subject: `${$rootScope.name_value} has a consult!`,
            message: $rootScope.description_value

        };

        $rootScope.clear_fields();
        $http.post("https://api.web3forms.com/submit", request_data)
        .then(function(response) { $rootScope.status_feedback = "Message sent successfully!"; })
        .catch(function(error) { $rootScope.status_feedback = "Error. Please try again later." });

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

        document.querySelectorAll("#button").forEach((button) => {

            button.addEventListener("mouseenter", function() { $rootScope.cursor = "button"; })
            button.addEventListener("mouseleave", function() { $rootScope.cursor = "default"; })

        })

        document.querySelectorAll("#hover").forEach((hover) => {

            hover.addEventListener("mouseenter", function() { $rootScope.cursor = "hover"; })
            hover.addEventListener("mouseleave", function() { $rootScope.cursor = "default"; })

        })

    }

});