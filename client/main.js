var dialog = new jBox('Modal', {
    addClass: 'jBox-Notice-green',
    overlay : false,
    maxWidth: 400,
    minWidth: 100,
    blockScroll : false,
    minHeight: 50,
    autoClose: 2000,
    position: { x: 'right' , y: 'bottom' },
    offset : {x: -45, y: -50},
    closeButton: false,
})

$(document).ready(function () {
    let token = localStorage.getItem('token')
    if (token) {
        $.ajax({
                type: "get",
                url: "https://todofancy.adishare.online/verify",
                headers: {
                    token
                }
            })
            .done(user => {
                dialog.setContent(`Welcome ${user.name}`).open()
                $('.registerBtn').hide();
                $('#userBtn').html(user.name);
                $('.maincontainer').empty().load('todo.html')

            })
            .fail(err => {
                dialog.setContent(`invalid user creditial`).open()
            })
    } else {
        $('.navbarcontainer').hide()
        $('.maincontainer').empty()
        $('.maincontainer').load('registerLogin.html')
    }
});


$(document).ready(function () {
    $('.navbarcontainer').load('navbar.html');
    $('.leftSide').load('leftSide.html');
});