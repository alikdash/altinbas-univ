function setCookie(name,value,hours)
{
  var expire = "";
  expire = new Date((new Date()).getTime() + hours * 3600000);
  document.cookie = name + "=" + escape(value) + "; expires=" + expire.toGMTString();
  return true;
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function bindAutoComplete(acObject, searchURL, returnFunction) {
  $( function() {
    $( acObject ).autocomplete({
      source: function( request, response ) {
        $.ajax( {
          url: searchURL,
          dataType: "json",
          type: 'post',
          data: {
            acSearch: request.term
          },
          success: function( data ) {
            response( data );
          }
        } );
      },
      minLength: 2,
      select: function( event, ui ) {
        returnFunction(event, ui);
        return false;
      }
    } );
  } );
}

function bindAutoFill(srcObject, destObject, searchURL)
{
  $(
      $(srcObject).on('change', function() {
        var Data = { "acSearch" : $(srcObject).val() };
        $.ajax({
          url: searchURL,
          data: Data,
          type: 'post',
          dataType: "json",
          success: function (Resp) {
            if (Resp.Status == 'OK') {
              $(destObject).empty();
              $.each(Resp.List, function (i, item) {
                $(destObject).append($('<option>', {
                  value: item.id,
                  text : item.text
                }));
              });
              if((Resp.DefaultValue||null) != null)
              {
                $(destObject).val(Resp.DefaultValue);
              }
              $(destObject).trigger('change');
            } else {
              $(destObject).empty();
              $(destObject).trigger('change');
            }
          },
          error: function (xhr, status, error) {
            $(destObject).empty();
            $(destObject).trigger('change');
          }
        });
    })
  );
}
function bindFill(destObject, searchURL){
  var Data = {  };
  $.ajax({
    url: searchURL,
    data: Data,
    type: 'post',
    dataType: "json",
    success: function (Resp) {
      if (Resp.Status == 'OK') {
        $(destObject).empty();
        $.each(Resp.List, function (i, item) {
          $(destObject).append($('<option>', {
            value: item.id,
            text : item.text
          }));
        });
        if((Resp.DefaultValue||null) != null)
        {
          $(destObject).val(Resp.DefaultValue);
        }
        $(destObject).trigger('change');
      } else {
        $(destObject).empty();
        $(destObject).trigger('change');
      }
    },
    error: function (xhr, status, error) {
      $(destObject).empty();
      $(destObject).trigger('change');
    }
  });
}
function generateTab() {
  $('.yoo-tabs.yoo-fade-tabs .yoo-tab-links a:not(.yoo-work-link)').on('click', function(e) {
    var currentAttrValue = $(this).attr('href');
    $('.yoo-tabs ' + currentAttrValue).fadeIn(400).siblings().hide();
    $(this).parents('li').addClass('yoo-active').siblings().removeClass('yoo-active');
    $(this).parents('li').siblings().each(function(){if(typeof $(this).attr('id') != 'undefined'){setCookie('fadeTabsActive['+$(this).attr('id')+']','0',-24);}});
    if(typeof $(this).parents('li').attr('id') != 'undefined')
      setCookie('fadeTabsActive['+$(this).parents('li').attr('id')+']','1',24);
    e.preventDefault();
  });

  var hasActiveLi;
  $('.yoo-tabs.yoo-fade-tabs .yoo-tab-links').each(
      function ()
      {
        if($(this).data('autorender') == '0')
          return;
        hasActiveLi = false;
        $(this).find('li').each(
            function (){
              if(getCookie('fadeTabsActive['+$(this).attr('id')+']') == '1')
              {
                hasActiveLi = true;
                $(this).find('a').trigger('click');
              }
            });
        if (!hasActiveLi)
          $(this).find('li').first().addClass('yoo-active').siblings().removeClass('yoo-active');
      }
  );
}