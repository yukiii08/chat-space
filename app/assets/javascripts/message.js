$(function(){

  function buildPost(message){
    image = (message.image) ? `<img class= "lower-message__image" src=${ message.image } >` : "";
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <div class="message__text">
                      ${message.content}
                    </div>
                  </div>
                  ${image}
                  
                </div>`
      return html;
  }
  

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
    var html = buildPost(message);
    $('.messages').append(html)
    $('#new_message')[0].reset();
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(message){
      alert('メッセージ送信エラー')
    })
    .always(function(message){
      $('.submit-btn').prop('disabled', false);　
    })
  });
});