(function($) {
  "use strict";

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/

  $(window).on("load", function() {
    $(window).trigger("scroll");
    $(window).trigger("resize");
  });
  $( () => {
    $(window).trigger("resize");
    mainMenu();
    mobileMenu();
    sideBarHeader();
    stickyHeader();
    onePageNav();
    dynamicBackgroundImage();
    tabInt();
    accordianInt();
    progressBar();
    calendarInt();
    customSelectInt();
    modalVideoInt();
    nicescrollInt();
    customToggleInt();
    emailEditorInt();
    nestableSetup();
    dynamicTableInt();
    bootstrapInt();
    buttonLoaders();
  } );

  $(window).on("resize", function() {
    mobileMenu();
  });

  $(window).on("scroll", function() {
    stickyHeader();
  });

  $.exists = function(selector) {
    return $(selector).length > 0;
  };


  /*--------------------------------------------------------------
    1. Header Sctipt
  --------------------------------------------------------------*/

  /* Main Menu */
  function mainMenu() {
    $(".yoo-nav-toggle").on("click", function() {
      $(this).siblings(".yoo-nav").slideToggle();
      $(this).toggleClass("yoo-active");
    });
    $(".yoo-has-children").append('<span class="yoo-dropdown-btn"></span>');
    $(".yoo-dropdown-btn").on("click", function() {
      $(this).siblings("ul, .yoo-megamenu-in, .yoo-vertical-megamenu-in").slideToggle("slow");
      $(this).toggleClass("yoo-active");
    });

  }
  /* Mobile Menu */
  function mobileMenu() {
    if ($(window).width() <= 991) {
      $(".yoo-header").addClass("yoo-mobile-header");
      $(".yoo-nav").addClass("yoo-mobile-nav").removeClass("yoo-desktop-nav");
    } else {
      $(".yoo-header").removeClass("yoo-mobile-header");
      $(".yoo-nav").addClass("yoo-desktop-nav").removeClass("yoo-mobile-nav");
    }
  }
  /* Sticky Header */
  function stickyHeader() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $(".yoo-header").addClass("yoo-sticky-active");
    } else {
      $(".yoo-header").removeClass("yoo-sticky-active");
    }
  }
  /* Sidebar Header */
  function yoo_sidebarheaderHoverOn(){
    $('body').addClass("yoo-sidebar-hover-active");
  }
  function yoo_sidebarheaderHoverOff(){
    $('body').removeClass("yoo-sidebar-hover-active");
  }
  function sideBarHeader() {
    $(".yoo-sidebar-has-children").append('<span class="yoo-dropdown-arrow"></span>');
    $(".yoo-sidebar-has-children>a").removeAttr("href").on("click", function() {
      $(this).siblings(".yoo-sidebar-nav-dropdown").slideToggle();
      $(this).siblings(".yoo-dropdown-arrow").toggleClass("active");
    });
    $(".yoo-sidebarheader-toggle").on("click", function() {
      $("body").toggleClass("yoo-sidebar-active");
    });
    // Hover To Class Toggle
    $(".yoo-sidebarheader").on('mouseenter',yoo_sidebarheaderHoverOn).on('mouseleave',yoo_sidebarheaderHoverOff);
   }
  /*--------------------------------------------------------------
    2. One Page Navigation
  --------------------------------------------------------------*/
  function onePageNav() {
    $('.yoo-doc-nav-dropdown-btn').on('click', function() {
      $(this).toggleClass('active');
      $(this).siblings('.yoo-doc-nav-dropdown-list').slideToggle();
    })
    // Click to Go Top Animation
    $('.yoo-onepage-nav a').each(function() {
      var thisAttr = $(this).attr('href');
      if ($(thisAttr).length) {
        $(this).addClass('yoo-page-nav');
      }
    });
    $('.yoo-page-nav').on('click', function() {
      var thisAttr = $(this).attr('href');
      if ($(thisAttr).length) {
        var scrollPoint = $(thisAttr).offset().top - 80;
        $('body,html').animate({
          scrollTop: scrollPoint
        }, 650);
      }
      return false;
    });
    // One Page Active Class
    var topLimit = 300,
      ultimateOffset = 200;
    $('.yoo-onepage-nav').each(function() {
      var $this = $(this),
        $parent = $this.parent(),
        current = null,
        $findLinks = $this.find("a");

      function getHeader(top) {
        var last = $findLinks.first();
        if (top < topLimit) {
          return last;
        }
        for (var i = 0; i < $findLinks.length; i++) {
          var $link = $findLinks.eq(i),
            href = $link.attr("href");
          if (href.charAt(0) === "#" && href.length > 1) {
            var $anchor = $(href).first();
            if ($anchor.length > 0) {
              var offset = $anchor.offset();
              if (top < offset.top - ultimateOffset) {
                return last;
              }
              last = $link;
            }
          }
        }
        return last;
      }
      $(window).on("scroll", function() {
        var top = window.scrollY,
          height = $this.outerHeight(),
          max_bottom = $parent.offset().top + $parent.outerHeight(),
          bottom = top + height + ultimateOffset;
        var $current = getHeader(top);
        if (current !== $current) {
          $this.find(".active").removeClass("active");
          $current.addClass("active");
          current = $current;
        }
      });
    });
  }

  /*--------------------------------------------------------------
    3. Background Image Script
  --------------------------------------------------------------*/
  function dynamicBackgroundImage() {
    $('.yoo-dynamicbg').each(function() {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')'
      });
    });
  }

  /*--------------------------------------------------------------
    4. Tab Style
  --------------------------------------------------------------*/
  function tabInt() {
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

  /*--------------------------------------------------------------
    4. Accordion
  --------------------------------------------------------------*/
  function accordianInt() {
    $('.yoo-accordian.yoo-active').find('.yoo-accordian-title').addClass('yoo-open');
    $(".yoo-accordian-wrap .yoo-accordian-title").on('click', function(e) {
      $(this).toggleClass('yoo-open');
      $(this).parents('.yoo-accordian').siblings().find('.yoo-accordian-title').removeClass('yoo-open');
      $(this).parents('.yoo-accordian-wrap').find(".yoo-accordian-body").slideUp();
      if ($(this).next().is(":hidden")) {
        $(this).next().slideDown();
      }
    });
  }

  /*--------------------------------------------------------------
    5. Progress Bar
  --------------------------------------------------------------*/
  function progressBar() {
    $(".yoo-single-progress").each(function() {
      let progressPercentage = $(this).find(".yoo-progressbar").data("progress-percentage") + "%";
      $(this).find(".yoo-progressbar-in").css("width", progressPercentage);
      $(this).find(".yoo-progress-percentage").html(progressPercentage);
    });
  }

  /*--------------------------------------------------------------
    6. Calendar
  --------------------------------------------------------------*/
  function calendarInt() {
    /*if ($.exists("#yoo-calendar")) {
      $('#yoo-calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
        },
        defaultDate: '2019-01-12',
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: [{
            title: 'All Day Event',
            start: '2019-01-01T20:00:00'
          }
        ]
      });
    }*/
  }

  /*--------------------------------------------------------------
    7. Custom Select
  --------------------------------------------------------------*/
  function customSelectInt() {
    $(".yoo-custom-select").each(function() {
      if ($(this).attr("id") == null)
        $(this).attr("id", "csw_" + Math.floor(Math.random() * 100000000));
      var classes = $(this).attr("class"),
        id = $(this).attr("id"),
        name = $(this).attr("name");
      var template = '<div class="' + classes + '" data-id="tmp_'+id+'">';
      template += '<span class="custom-select-trigger" data-id="cst_'+id+'">' + $(".yoo-custom-select-wrap > .yoo-custom-select option:selected").html() + "</span>";
      template += '<div class="custom-options" data-id="cos_'+$(this).attr('id')+'">';
      var itemIndex = 0;
      $(this).find("option").each(function() {
        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '" data-itemindex="'+itemIndex+'" data-sid="co_'+id+'">' + $(this).html() + "</span>";
        itemIndex++;
      });
      template += "</div></div>";

      $(this).wrap('<div class="custom-select-wrapper"></div>');
      $(this).hide();
      $(this).after(template);
    });
    $(".custom-select-trigger").on("click", function(event) {
      $("html").one("click", function() {
        $(".yoo-custom-select").removeClass("opened");
      });
      $(this).parents(".yoo-custom-select").toggleClass("opened");
      event.stopPropagation();
    });
    $(".custom-option").on("click", function() {
      $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
      $(this).parents(".custom-options").find(".yoo-custom-option").removeClass("selection");
      $(this).addClass("selection");
      $(this).parents(".custom-select").removeClass("opened");
      $(this).parents(".yoo-custom-select").find(".custom-select-trigger").text($(this).text());

      var selectedObject = $(this).data('sid').replace('co_','');
      var selectedIndex = $(this).data('itemindex');
      $('#'+selectedObject+' option').eq(selectedIndex).prop('selected', true);
      $('#'+selectedObject).change();
    });
  }


  /*--------------------------------------------------------------
    10. Modal Video
  --------------------------------------------------------------*/
  function modalVideoInt() {
    $(document).on('click', '.yoo-video-open', function(e) {
      e.preventDefault();
      var video = $(this).attr('href');
      $('.yoo-video-popup-container iframe').attr('src', video);
      $('.yoo-video-popup').addClass('active');

    });
    $('.yoo-video-popup-close, .yoo-video-popup-layer').on('click', function(e) {
      $('.yoo-video-popup').removeClass('active');
      $('html').removeClass('overflow-hidden');
      $('.yoo-video-popup-container iframe').attr('src', 'about:blank')
      e.preventDefault();
    });
  }

  /*--------------------------------------------------------------
    12. Nice Scroll
  --------------------------------------------------------------*/
  function nicescrollInt() {
    Scrollbar.initAll();
  }

  /*--------------------------------------------------------------
    14. Toggle Btn
  --------------------------------------------------------------*/
  function customToggleInt() {
    // Custome Toggle Button
    $(".yoo-toggle-btn").on("click", function() {
      $(this).toggleClass("active").siblings(".yoo-dropdown").toggleClass("active");
      $(this).parents("li").siblings().find(".yoo-dropdown, .yoo-toggle-btn").removeClass("active");
      $(this).parents('.yoo-toggle-body').siblings().find('.yoo-dropdown, .yoo-toggle-btn').removeClass('active');
    });
    $('.yoo-toggle-cross-btn').on('click', function() {
      $(this).parents('.yoo-toggle-body').find('.yoo-toggle-btn, .yoo-dropdown').removeClass('active');
    })
    $(document).on("click", function() {
      $(".yoo-dropdown").removeClass("active").siblings().removeClass("active");
    });
    $(".yoo-dropdown, .yoo-toggle-btn").on("click", function(e) {
      e.stopPropagation();
    });

    $(".yoo-circle-color, .yoo-vertical-chart-layer").each(function() {
      let buletColor = $(this).data("bulet-color");
      $(this).css("background-color", buletColor);
    });
    $('.yoo-toggle-cross').on('click', function(){
      $(this).parents('.yoo-dropdown').removeClass('active').siblings('.yoo-toggle-btn').removeClass('active');
    })
    // Star Toggle Btn
    $('.yoo-get-star, .yoo-mobile-toggle-btn').on('click', function() {
      $(this).toggleClass('active');
    })

    // Switch Btn Toggle
    $('.yoo-switch').on('click', function() {
      $(this).toggleClass('yoo-active');
    })
    // Profile Toggle
    $('.yoo-profile-sidebar-btn').on('click', function() {
      $(this).parents('.yoo-profile-sidebar').addClass('active');
    })
    $('.yoo-profile-sidebar-cross').on('click', function() {
      $(this).parents('.yoo-profile-sidebar').removeClass('active');
    })
  }

  /*--------------------------------------------------------------
    15. Email Editor
  --------------------------------------------------------------*/
  function emailEditorInt() {
    /*if ($.exists("#yoo-email-editor")) {
      console.clear()
      var FontAttributor = Quill.import('formats/font');
      var fonts = ['impact', 'courier', 'comic'];
      var lHeights = ['1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6'];
      FontAttributor.whitelist = fonts;
      Quill.register(FontAttributor, true);
      var quill = new Quill('#yoo-email-editor', {
        modules: {
          toolbar: { container: '#yoo-email-editor-toolbox' }
        },
        placeholder: 'Type something here',
        theme: 'snow' // 'snow' or 'bubble'
      });
      $('.ql-bold').html('<i class="material-icons-outlined">format_bold</i>');
      $('.ql-italic').html('<i class="material-icons-outlined">format_italic</i>');
      $('.ql-underline').html('<i class="material-icons-outlined">format_underlined</i>');
    }*/
  }

  /*--------------------------------------------------------------
    16. Nestable List
  --------------------------------------------------------------*/
  function nestableSetup() {
    if ($.exists("#yoo-nestable1")) {
      $('#yoo-nestable1').nestable();
    }
    if ($.exists("#yoo-nestable2")) {
      $('#yoo-nestable2').nestable();
    }

    $('.yoo-nested-dropdown-btn').on('click', function() {
      $(this).toggleClass('yoo-active').siblings('.yoo-nested-dropdown').slideToggle();
    });
    $('.yoo-nosted-cancel').on('click', function() {
      $(this).parents('.yoo-nested-dropdown').slideUp();
    })
    $('.yoo-nosted-delete').on('click', function() {
      $(this).parents('.yoo-nested-dropdown-wrap').parent('.dd-item').remove();
    })
  }

  /*--------------------------------------------------------------
    17. Dynamic Table
  --------------------------------------------------------------*/
  function dynamicTableInt() {
    $("#yoo-locked-table").each(function() {
      var table = $('#yoo-locked-table').DataTable({
        scrollY: ($('#yoo-locked-table').data("scrolly") != undefined ? $('#yoo-locked-table').data("scrolly"): "600px"),
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        searching: false,
        ordering:  false,
        info: false,
        fixedColumns: {
          leftColumns: ($('#yoo-locked-table').data("lockedleft") != undefined ? $('#yoo-locked-table').data("lockedleft"): 0),
          rightColumns: ($('#yoo-locked-table').data("lockedright") != undefined ? $('#yoo-locked-table').data("lockedright"): 0)
        }
      });
    });
    $("#yoo-left-locked").each(function() {
      var table = $('#yoo-left-locked').DataTable({
        scrollY: "600px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns: {
          leftColumns: 1
        }
      });
    })
    $("#yoo-right-locked").each(function() {
      var table = $('#yoo-right-locked').DataTable({
        scrollY: "600px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns: {
          leftColumns: 0,
          rightColumns: 1
        }
      });
    })
    $("#yoo-left-right-locked").each(function() {
      var table = $('#yoo-left-right-locked').DataTable({
        scrollY: "600px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns: {
          leftColumns: 1,
          rightColumns: 1
        }
      });
    })
    $("#yoo-no-locked").each(function() {
      var table = $('#yoo-no-locked').DataTable({
        scrollX: true,
        scrollCollapse: true,
        paging: false
      });
    })
  }

  /*--------------------------------------------------------------
    18. Bootstrap Setup Mode
  --------------------------------------------------------------*/
  function bootstrapInt() {
    $('.your-checkbox').prop('indeterminate', true);

    $('#myModal').on('shown.bs.modal', function() {
      $('#myInput').trigger('focus')
    })
  }

  /*--------------------------------------------------------------
    18. Buttons with loaders
  --------------------------------------------------------------*/
  function buttonLoaders()
  {
    $('.btn-with-loader').on('click', function() {
      var $this = $(this);
      $this.addClass('button-loading-active');
      setTimeout(function() {
        $this.removeClass('button-loading-active');
      }, 8000);
    });
  }

})(jQuery); // End of use strict
