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
                self.toggleTrig = options;
            } else {
                self.toggleTrig = options.toggleTrigger;
                self.jqAnim = options.jqAnim;
                self.speed = options.speed;
                self.indicator = options.indicator;
                self.options = $.extend({}, $.fn.makeExpander.options, options);
            }
            self.wrapHidden(self.$el, self.options);
            self.attachToggle(self.$el, self.toggleTrig, self.jqAnim);
        },
        wrapHidden: function ($el, options) {
            var toggleTrig = options.toggleTrigger;
            var jqAnim = options.jqAnim;
            $el.find(toggleTrig).each(function(){ 
                if(jqAnim){
                    $(this).nextUntil(toggleTrig).wrapAll('<div class="expandy" />');
                    $('.expandy').hide();
                }else{
                    $(this).nextUntil(toggleTrig).wrapAll('<div class="expandy expandy-hidden" />');   
                }
            });
        },
        attachToggle: function ($el, toggleTrig, jqAnim) {
            $el.find(toggleTrig).addClass('expandy-toggle').on('click', function(){ 
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
        toggleTrigger: 'h2',
        jqAnim: false,
        speed: 'medium',
        indicator: 'plusminus'
    };
    
})( jQuery, window, document );


/**

USAGE
var options = {
        toggleTrigger: 'h2',
        jqAnim: false,
        speed: 400,
        indicator: 'plusminus'
    }
$(container).makeExpander(options);

// container - element containing all the toggle/expanding content
// toggleTrigger - heading for each piece of hidden/displayed content. Everything between each toggleTrigger will be hidden. default is <h2>
// jqAnim - use jQuery slide animation instead of CSS to show/hide. default is false.
// speed - speed of animation when using jQuery slide animation. accepts a # of milliseconds, or the keywords 'fast' (200ms) and 'slow' (600ms). default is 400.
// indicator - what to add as an open-closed indicator. this option adds a class to the  
**/