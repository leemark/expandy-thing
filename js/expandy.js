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
                self.jqAnim = options.jqAnim;
                self.options = $.extend({}, $.fn.makeExpander.options, options);
            }
            self.wrapHidden(self.$el, self.toggleEl, self.jqAnim);
            self.attachToggle(self.$el, self.toggleEl, self.jqAnim);
        },
        wrapHidden: function ($el, toggleEl, jqAnim) {
            $el.find(toggleEl).each(function(){ 
                if(jqAnim){
                    $(this).nextUntil(toggleEl).wrapAll('<div class="expandy" />').slideUp();
                }else{
                    $(this).nextUntil(toggleEl).wrapAll('<div class="expandy expandy-hidden" />');   
                }
            });
        },
        attachToggle: function ($el, toggleEl, jqAnim) {
            $el.find(toggleEl).addClass('expandy-toggle').on('click', function(){ 
                if(jqAnim){
                    $(this).toggleClass('expandy-hidden').next('.expandy').slideToggle();
                }else{ 
                    $(this).toggleClass('expandy-hidden').next('.expandy').toggleClass('expandy-hidden');  
                }
            });
        }
    };
    
    $.fn.makeExpander = function( options ){
        return this.each(function(){
            var expander = Object.create( Expander );
            expander.init( options, this );
        });   
    };
    
    $.fn.makeExpander.options = {
        toggleElement: 'h2',
        jqAnim: false
    };
    
})( jQuery, window, document );


/**

USAGE
var options = {
        toggleElement: 'h2',
        jqAnim: false
    }
$(container).makeExpander(options);

// container - element containing all the toggle/expanding content
// toggleElement - heading for each piece of hidden/displayed content. Everything between each toggleElement will be hidden. default is <h2>
// jqAnim - use jQuery slide animation instead of CSS to show/hide. default is false.

**/