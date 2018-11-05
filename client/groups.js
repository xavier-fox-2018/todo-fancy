let inviteBox = new jBox('Modal', {
    minWidth: 300,
    minHeight: 200,
    overlay: false,
    addClass: 'jBox-Notice-gray',
    blockScroll: false,
    fixed: true,
    zIndex: 1,
    closeOnEsc: true,
    closeButton: 'title',
    closeOnClick : 'body',
    animation: { open: 'slide:left', close: 'slide:left' },
})  

function getGroups() {

    $('#listOfGroup').empty()

    $.ajax({
            type: "get",
            url: "https://todofancy.adishare.online/groups",
            headers: {
                token: localStorage.getItem('token')
            },
            dataType: "json",
        })
        .done(groups => {

            $.each(groups, function (i, group) { 

                $('#listOfGroup').append(`
                    <div id="${group._id}" class="list-group">
                        <div class="list-group-item info active">
                            <b>${group.name} <span onclick="inviteMember('${group._id}','${group.name}')" class="btn-sm btn-info pull-right invitebutton">+ Invite</span> </b>
                        </div>
                    </div>
                `);

                $.each(group.members, function (j, member) { 
                     $(`#${group._id}`).append(`
                        <div class="list-group-item">
                            <div>${member.name}</div>
                        </div>
                     `);
                });

            });
        })
        .fail(err => {
            console.log(err);
        })

}

function addMember(groupId,userId) {
    
    $.ajax({
        type: "get",
        url: `https://todofancy.adishare.online/groups/addMember/${groupId}/${userId}`,
        dataType: "json"
    })
    .done(response => {
        notif.setContent(response.message).open()
        inviteBox.close()
        getGroups()
    })
    .fail(err => {
        console.log(err);
    })

}

function inviteMember(groupId,groupName) {
    inviteBox.close()

    $.ajax({
        type: "get",
        url: `https://todofancy.adishare.online/groups/nonMembers/${groupId}`,
        dataType: "json",
    })
    .done(users => {
   
        let content = ''

        $.each(users, function (i, user) { 
            content += `
                <div class="list-group-item">
                    <b>${user.name} <span onclick="addMember('${groupId}','${user._id}');" class="btn-sm btn-info pull-right invitebutton">+</span> </b>
                </div>
            `
        });

        setTimeout(() => {
            inviteBox.setTitle('Invite to '+groupName).setContent(`
                <div  class="list-group"> ${content} </div>
            `)
            .open()
        }, 180);
        
    })
    .fail(err => {
        console.log(err);
    })

}

function addGroup() {

    if ($('#groupNameAdd').val() != '') {

        $.ajax({
                type: "POST",
                url: "https://todofancy.adishare.online/groups",
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    name: $('#groupNameAdd').val()
                },
                dataType: "json",
            })
            .done(group => {
                notif.setContent(`creat group ${group.name} success `).open()
                $('#groupNameAdd').val('')
                $('#spanAddGroup').hide();
                $('#listGroupToAddTask').prepend(`
                    <option value="${group._id}">${group.name}</option>
                `);
                getGroups()
            })
            .fail(err => {
                console.log(err);
            })

    }
}

$(document).ready(function () {

    getGroups()

    $('#cerateGroupToggle').click(function (e) {
        e.preventDefault();
        $('#spanAddGroup').toggle();
    });


});