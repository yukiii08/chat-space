$(function() {
  var search_list=$('#user-search-result')
  function appendUser(user){
    var html=
        `<div class="chat-group-user clearfix">
            <p class="chat-group-user__name">${user.name}</p>
          <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
        </div>`
        search_list.append(html)
      }
  function appendErrMsgToHTML(msg){
    var html= `<p class="chat-group-user__name">${msg}</p>`
    search_list.append(html)
  }

  function add_menber(name,id){
    var html=
    `<div class='chat-group-user'>
    <input name='group[user_ids][]' type='hidden' value='${id}'>
    <p class='chat-group-user__name'>${name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
  $(".chat-group-users").append(html)
  }

  function deli_member(name){
    var html= `<p class="chat-group-user__name" ${name}>`
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーはいません")
          }
        })
        .fail(function(){
        alert('error');
    })
  });

  $(document).on('click',".chat-group-user__btn--add", function(){
    var name = $(this).data('user-name')
    var id = $(this).data('user-id')
    $(this).parent().remove()
    add_menber(name,id)

  })

  $(document).on("click", ".js-remove-btn",function(){
    var name = $(this).attr(".chat-group-user__name")
    var id = $(this).attr("data-user-id")
    $(this).parent().remove()
    deli_menber(name)
  });


});





