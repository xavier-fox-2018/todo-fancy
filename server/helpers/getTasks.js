const getMonthDate = require('./getMonthName.js')
//get the list of tasks and format it
function getTasks(tasks) {
    return new Promise(function (resolve, reject) {
        let formattedTasks = []
        for (let i = 0; i < tasks.length; i++) {
            let createdMonth = getMonthDate(tasks[i].created_date.getMonth() + 1)
            let dueMonth = getMonthDate(tasks[i].due_date.getMonth() + 1)
            let formattedCreateDate = createdMonth + " " + tasks[i].created_date.getDate() + ", " + tasks[i].created_date.getFullYear()
            let formattedDueDate = dueMonth + " " + tasks[i].due_date.getDate() + ", " + tasks[i].due_date.getFullYear()
            let status = ''
            if (tasks[i].status) {
                status = 'Done'
            } else {
                status = 'Pending'
            }
            let obj = {
                status: status,
                _id: tasks[i]._id,
                name: tasks[i].name,
                description: tasks[i].description,
                created_date: formattedCreateDate,
                due_date: formattedDueDate,
                user: tasks[i].user
            }
            formattedTasks.push(obj)
        }
        resolve(formattedTasks)
    })
}

module.exports = getTasks