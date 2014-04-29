// object.create polyfill
if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        'use strict';
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function ($, undefined) {
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
                self.speed = options.speed;
                self.indicator = options.indicator;
                self.options = $.extend({}, $.fn.makeExpander.options, options);
            }
            self.wrapHidden(self.$el, self.options);
            self.attachToggle(self.$el, self.options);
        },
        wrapHidden: function ($el, options) {
            var toggleEl = options.toggleElement;
            var jqAnim = options.jqAnim;
            $el.find(toggleEl).each(function(){ 
                if(jqAnim){
                    $(this).nextUntil(toggleEl).wrapAll('<div class="expandy" />');
                    $('.expandy').hide();
                }else{
                    $(this).nextUntil(toggleEl).wrapAll('<div class="expandy expandy-hidden" />');   
                }
            });
        },
        attachToggle: function ($el, options) {
            var toggleEl = options.toggleElement;
            var jqAnim = options.jqAnim;
            var indicator = options.indicator;
            var speed = options.speed;
            $el.find(toggleEl).addClass('expandy-toggle expandy-hidden ' + indicator).on('click', function(){ 
                if(jqAnim){
                    $(this).toggleClass('expandy-hidden').next('.expandy').slideToggle(speed);
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
        jqAnim: false,
        speed: 'medium',
        indicator: 'plusminus'
    };
    
})( jQuery );