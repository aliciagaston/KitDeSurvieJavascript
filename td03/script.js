$( function() {
  var dataID = 0;
  $("#newButton").on("click", function(){
    var id = dataID;
    if($('#newInput').val() != ""){
      var newTodo = createTodo(id, $('#newInput').val());
      $("#list ul").append(newTodo);
      $("#newInput").val("");
      dataID++;
    }
  })

  function createTodo(id, text){
    var newTodo =  $("<li></li>").text(text);
    newTodo.attr("id", id);

    var checkSpan = $("<span></span>").attr("class", "fa fa-check");
    checkSpan.on("click", function(){
      check(id);
    })
    var editSpan = $("<span></span>").attr("class", "fa fa-pencil-alt");
    editSpan.on("click", function(){
      edit(id);
    })
    var delSpan = $("<span></span>").attr("class", "fa fa-trash-alt");
    delSpan.on("click", function(){
      del(id);
    })
    var div = $("<div></div>");

    div.append(checkSpan);
    div.append(editSpan);
    div.append(delSpan);
    newTodo.append(div);

    return newTodo;
  }

  function edit(id){
    var selector = '#' + id;
    var li = $(selector);
    var div = $("<div></div>").attr("id", id);
    var input = $("<input/>").attr('placeholder', li.text());
    var button = $("<button>Valider</button>").on("click", function(){
      editValidate(id);
    });
    div.append(input);
    div.append(button);
    div.attr("class", "editTodo")
    $(selector).replaceWith(div);
  }

  function del(id){
    var selector = '#' + id;
    $(selector).remove();

  }

  function editValidate(id){
    var selector = '#' + id;
    var input = $(selector);
    var inputText = $(selector).children("input").val();

    var li = createTodo(id, inputText);

    $(selector).replaceWith(li);
  }

  function check(id){
    var selector = '#' + id;
    $(selector).css("text-decoration", "line-through");
  }



  $("#list ul").sortable();
  $("#list ul").disableSelection();

  // Saving element in local storage
  data[id] = tempData;
  localStorage.setItem("todoData", JSON.stringify(data));

  // Generate Todo Element
  generateElement(tempData);
});