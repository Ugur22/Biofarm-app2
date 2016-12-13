Template.Info.events({
    'submit .close-info'(event){
        event.preventDefault();
        if ($(".billboard").hasClass('hide')) {
            $(".billboard").removeClass('hide').addClass('show');
            $("#info-button").val('Close info');
        } else {
            $(".billboard").removeClass('show').addClass('hide');
            $("#info-button").val('Show info');
        }
    }
});
