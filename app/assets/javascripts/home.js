// Create the event bindings
$(document).ready(function() {

var pointer = 0;
var step = 1;
var offset = 0;


var template_f = Handlebars.compile($('#countries_template').html()); //define handlebar template to render
var $content = $('#content'); //isolate area where to append the handlebars

var  populateCountries = function() {
    $.ajax ({
      url: '/countries/' + step + '/' + offset,
      dataType: 'JSON'
    }).done(function (results) {
       $.each(results, function (i, content) {
      $content.append(template_f(content));
         });

        offset = offset + step;
        console.log(offset)

    });
  };

function populateAll() {
  var step = 500;
    var template_f = Handlebars.compile($('#countries_template').html());
    var $content = $('#content');
    $.ajax({
        url: '/countries/' + step + '/' + offset + '/',
        datatype: 'JSON'
    }).done(function (results) {
            if (results.length == 0) {
                finished = true;
            };
            $.each(results, function (i, render) {
                    $content.append(template_f(render));
                });

            })
    };


  // Demonstrates using a function name as the event handler instead of including the function inside (like we're used to seeing)
  // This is useful when re-binding events (certain events are unbound when clicking on the various buttons)
  $('#populate-button').click(populateCountries);
  $('#all-button').click(allButtonClick);
  $('#reset-button').click(function() {
    // this function resets the button and scroll bindings, and sets pointer to 0
    pointer = 0;
    $('#content').html('');
    $(window).unbind('scroll').scroll(scrollFunction);
    $('#populate-button').unbind('click').click(populateCountries);
    $('#all-button').unbind('click').click(allButtonClick);
  });

  $(window).scroll(scrollFunction);

  function scrollFunction() {
    var win = $(window);
    // Infinite scroll math!
    if(win.height() + win.scrollTop() >= $(document).height()) {
      populateCountries();
    }
  }

  // Disables other buttons and scroll event so we don't get duplicate data
  // This serves as a demonstration; we could also just set pointer = false
  function allButtonClick() {
    $(window).unbind('scroll');
    $('#populate-button').unbind('click');
    $('#all-button').unbind('click');
    populateAll();
  }

});

