// object.create polyfill
if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        'use strict';
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function ($, window, document, undefined) {
    'use strict';
    var Expander = {
        init: function (options, el) {
            var self = this;
            self.el = el;
            self.$el = $(el);
            console.log(el);
            console.log(this);
            /**
            if (typeof options === 'string') {
                self.tocEl = options;
            } else {
                self.tocEl = options.tocEl;
                self.options = $.extend({}, $.fn.makeTOC.options, options);
            }
            self.makeHeadingList(self.$el, self.tocEl);
            if (self.options.smoothScroll) {
                self.makeSmoothScroll(self.$el, self.tocEl);
            }
            **/
        }/**,
        makeHeadingList: function ($el, tocEl) {
            $("<ul/>").appendTo(tocEl);
            $el.find(':header').each(function () {
                var $this = $(this),
                    htxt = $this.text(),
                    hidtxt = htxt.replace(/\W/g, ''),
                    hclass = 'toc-' + $this.prop('tagName').toLowerCase();
                $this.attr('id', hidtxt);
                $('<li/>', {addClass: hclass}).html('<a href="#' + hidtxt + '">' + htxt + '</a>').appendTo(tocEl + ' ul');
            });
        },
        makeSmoothScroll: function($el, tocEl){
            $(tocEl).find('a').on('click', function(e) {
                $el.find(':header').removeClass('targeted');   
                var target = $(this).attr('href'); 
                $('html, body').animate({
                    scrollTop: $(target).offset().top -20
                }, 700);
                $(target).addClass('targeted');
                e.preventDefault();
            });  
        } 
        **/
    };
    
    $.fn.makeExpander = function( options ){
        return this.each(function(){
            var expander = Object.create( Expander );
            expander.init( options, this );
        });   
    };
    
    $.fn.makeExpander.options = {
        toggleElement: 'h2'
    };
    
})( jQuery, window, document );


/**

USAGE
var options = {
        toggleElement: 'h2'
    }
$(container).makeExpander(options);

// container - element containing all the toggle/expanding content
// toggleElement - heading for each piece of hidden/displayed content. Everything between each toggleElement will be hidden.

**/