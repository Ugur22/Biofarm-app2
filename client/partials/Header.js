Template.Header.onRendered(function(){
    function togglescroll() {
        $('body').on('touchstart', function(e) {
            if ($('body').hasClass('noscroll')) {
                e.preventDefault();
            }
        });
    }

    $(document).ready(function() {
        togglescroll()
        $(".icon").click(function() {
            $(".mobilenav").fadeToggle(500);
            $(".top-menu").toggleClass("top-animate");
            $("body").toggleClass("noscroll");
            $(".mid-menu").toggleClass("mid-animate");
            $(".bottom-menu").toggleClass("bottom-animate");
        });
    });

});
