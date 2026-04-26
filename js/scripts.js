(function () {
    var html = document.documentElement;
    var body = document.body;
    var header = document.querySelector(".site-header");
    var mobileOpen = document.getElementById("mobile-menu-open");
    var mobileClose = document.getElementById("mobile-menu-close");
    var menuLinks = Array.prototype.slice.call(document.querySelectorAll("#menu a"));
    var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal-card"));
    var sections = menuLinks
        .map(function (link) {
            return document.querySelector(link.getAttribute("href"));
        })
        .filter(Boolean);

    html.classList.remove("no-js");

    var year = document.getElementById("current-year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    function closeMenu() {
        if (!header) return;
        header.classList.remove("is-open");
        body.classList.remove("menu-open");
    }

    function scrollToTarget(target) {
        if (!target) return;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (mobileOpen && header) {
        mobileOpen.addEventListener("click", function () {
            header.classList.add("is-open");
            body.classList.add("menu-open");
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener("click", closeMenu);
    }

    menuLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            var target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            event.preventDefault();
            closeMenu();
            scrollToTarget(target);
        });
    });

    var leadDown = document.getElementById("lead-down");
    if (leadDown) {
        leadDown.addEventListener("click", function (event) {
            var target = document.querySelector(leadDown.getAttribute("href"));
            if (!target) return;
            event.preventDefault();
            scrollToTarget(target);
        });
    }

    var toTop = document.getElementById("to-top");
    if (toTop) {
        toTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        }, {
            rootMargin: "0px 0px -10% 0px",
            threshold: 0.12
        });

        revealItems.forEach(function (item) {
            if (item.classList.contains("is-visible")) return;
            revealObserver.observe(item);
        });

        var navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var id = "#" + entry.target.id;
                menuLinks.forEach(function (link) {
                    link.classList.toggle("is-active", link.getAttribute("href") === id);
                });
            });
        }, {
            rootMargin: "-38% 0px -58% 0px",
            threshold: 0
        });

        sections.forEach(function (section) {
            navObserver.observe(section);
        });
    } else {
        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
        });
    }
})();
