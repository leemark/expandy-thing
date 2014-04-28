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
            var self = this; // this = this instance of Expander
            self.el = el; // el = container element
            self.$el = $(el);
            if (typeof options === 'string') {
                self.toggleEl = options;
            } else {
                self.toggleEl = options.toggleElement;
                self.options = $.extend({}, $.fn.makeExpander.options, options);
            }
            self.wrapHidden(self.$el, self.toggleEl);

        },
        wrapHidden: function ($el, toggleEl) {
            $el.find(toggleEl).each(function(){ 
                $(this).nextUntil(toggleEl).andSelf().wrapAll('<div class="expandy-hide" />');
            });
        }/**,
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