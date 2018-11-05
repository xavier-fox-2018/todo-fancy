 const showerror = (error, id) => {
    let error_string = String(error.responseJSON.error)
    $(`#message-${id}`).text(error_string)
    $(`#${id}`).show()
}
