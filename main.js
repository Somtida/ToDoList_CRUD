'use strict';

$(document).ready(init);
function init(){
  var lists = getLists();
  renderTasks(lists);
  $('.top').on('click','.addTodo',addTodoList);
  $('.tskList').on('click','.edit',editList);
  $('.save').click(saveEdit);
  $('.cancel').click(cancelEdit);
  $('.tskList').on('click','.delete',deleteTask);
  $('.tskList').on('change','.isCompl',selected);
}

function selected(){
  // console.log("selected");
  var index = $(this).parent().parent().index();
  $(this).addClass('lineThrough');
  // debugger;
  // console.log(index);
  var tasks = getLists();
  var isDone = tasks[index].isComplete;
  tasks[index].isComplete = !tasks[index].isComplete;

  writeTask(tasks);
  renderTasks(tasks);
}

function deleteTask(){
  cancelEdit();
  var index = $(this).parent().parent().parent().index();
  // console.log(index);
  var tasks = getLists();
  tasks.splice(tasks[index],1);
  writeTask(tasks);
  renderTasks(tasks);

}

function saveEdit(data){
  var index = $('.editArea').data('editIndex');
  // console.log("saveEdit --> index: ",index);
  var newTask = $('.editDesc').val();
  // console.log("saveEdit --> newTask: ",newTask);

  var lists = getLists();
  // console.log("lists: ",lists);
  lists[index].description = newTask;
  // console.log("lists: ",lists);

  writeTask(lists);
  renderTasks(lists);
  cancelEdit();

}

function cancelEdit(){
  $('.editArea').hide();
  $('.editDesc').val('');
}

function editList(){
  // console.log("doing editList");
  var desc = $(this).parent().siblings('.desc').text();
  // console.log("desc: ",desc);
  var index = ($(this).parent().parent().index());
  // console.log("index: ",index);
  $('.editArea').data('editIndex',index);

  $('.editDesc').val(desc);
  $('.editArea').show();

}

function addTodoList(){
  // console.log("addTodoList");
  var $inputDate = $('#duedate');
  var date = $inputDate.val();
  // console.log("date: ",date);
  var $inputDesc = $('.description');
  var description = $inputDesc.val();

  var task  = {
      description : description,
      date : date,
      isComplete : false
  }

  var tasks = getLists();
  // console.log("typeof tasks", Array.isArray(tasks))
  tasks.push(task);
  // console.log("task after push", tasks);
  writeTask(tasks);
  renderTasks(tasks);
  clearInput();

}

function clearInput(){
  $('.description').val('');
  $('.date').val('');
}

// function addTask(desc,date){
//   var task = {
//       description : desc,
//       date : date,
//       isComplete : false
//   }
//   return task;
// }

function renderTasks(tasks){
  var $rows = tasks.map(function(task){
    // debugger;
    var $tr = $('.template').clone();
    $tr.removeClass('template');
    $tr.find('.desc').text(task.description);
    $tr.find('.date').text(task.date);

    if(task.isComplete === true){
      $tr.find('.desc').addClass('lineThrough');
    }

    $tr.find('.isCompl').prop("checked", task.isComplete);
    // console.log("$tr", $tr);
    return $tr;
  });
    // debugger;

  // console.log("$rows: ",$rows);
  $('.tskList').empty().append($rows);
}

function writeTask(tasks){
  localStorage.tasks = JSON.stringify(tasks)
  // console.log("localStorage.tasks", localStorage.tasks);
}

function getLists(){
  // console.log("doing in getLists");
  var str = localStorage.tasks;
  try{
    var todoLists = JSON.parse(str);
    // console.log("todoLists", todoLists);
  }catch(err){
    var todoLists = [];
  }
  return todoLists;
}
