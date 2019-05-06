$(document).ready(onReady);

function onReady() {
    getTasks();
    console.log('DOM is Ready. Start App');
    $('.js-btn-submit-task').on('click', postTask);
    $('.js-tasks-container').on('click', '.js-btn-complete', putTask);
    $('.js-tasks-container').on('click', '.js-btn-delete', deleteTask);
}

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/todo',
    })
    .then(function(response) {
        console.log(response);
        render(response);
    });
}

function postTask() {
    // const taskValue = $('#newTask').val();
    // const dataObject = {
    //     task: taskValue,
    // };

    $.ajax({
        type: 'POST',
        url: '/todo',
        // data: dataObject,
        data: { task: $('#newTask').val() }
    })
    .then(function(response) {
        console.log(response);
        $('#newTask').val('');
        getTasks();
    });
}

function putTask() {
    const taskId = $(this).parent().data('id');

    $.ajax({
        type: 'PUT',
        url: '/todo/' + taskId,
    })
    .then(function(response) {
        console.log(response);
        getTasks();
    });
}

function deleteTask() {
    const taskId = $(this).parent().data('id');

    $.ajax({
        type: 'DELETE',
        url: '/todo/' + taskId,
    })
    .then(function(response) {
        console.log(response);
        getTasks();
    });
}

function render(taskArray) {
    const $tasksCntr = $('.js-tasks-container');

    $tasksCntr.empty();
    for (let task of taskArray) {
        $tasksCntr.append(`
            <div class="task" data-id="${task.id}">
                <div>
                    <p>${task.task}</p>
                </div>
                <div>
                    <p>${task.completed}</p>
                </div>
                <button class="js-btn-complete">Complete</button>
                <button class="js-btn-delete">Delete</button>
            </div>
        `);

        if (task.completed) {
            $tasksCntr.children().last().addClass('task-isComplete');
        }
    }
}
