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
                self.accordion = options.accordion;
                self.speed = options.speed;
                self.indicator = options.indicator;
                self.options = $.extend({}, $.fn.makeExpander.options, options);
            }
            self.wrapHidden(self.$el, self.options);
            self.attachToggle(self.$el, self.options);
            if(options.showFirst){
                self.showFirst(self.$el, self.options);
            }
            self.allToggle(self.$el, self.options);
        },
        wrapHidden: function ($el, options) {
            var toggleEl = options.toggleElement,
                jqAnim = options.jqAnim;
            $el.find(toggleEl).each(function(){ 
                if(jqAnim){
                    $(this).nextUntil(toggleEl).wrapAll('<div class="expandy" />');
                    $el.find('.expandy').hide();
                }else{
                    $(this).nextUntil(toggleEl).wrapAll('<div class="expandy expandy-hidden" />');   
                }
            });
        },
        attachToggle: function ($el, options) {
            var toggleEl = options.toggleElement,
                jqAnim = options.jqAnim,
                indicator = options.indicator,
                accord = options.accordion,
                speed = options.speed;
            
            $el.find(toggleEl).addClass('expandy-toggle expandy-hidden ' + indicator).on('click', function(){ 
                if(jqAnim){
                    if(accord){
                        $('.expandy-toggle').not(this).addClass('expandy-hidden').next('.expandy').slideUp(speed); // hide others
                    }    
                    $(this).toggleClass('expandy-hidden').next('.expandy').slideToggle(speed);// show this one
                }else{ 
                    if(accord){
                        $('.expandy-toggle').not(this).addClass('expandy-hidden').next('.expandy').addClass('expandy-hidden'); // hide others
                    }
                    $(this).toggleClass('expandy-hidden').next('.expandy').toggleClass('expandy-hidden'); // show this one  
                }
            });
        },
        showFirst: function($el, options){
            var first = $el.find('.expandy-toggle').first();
            if(options.jqAnim){
                first.toggleClass('expandy-hidden').next('.expandy').show(options.speed);
                
            }else{ 
                first.toggleClass('expandy-hidden').next('.expandy').toggleClass('expandy-hidden');  
            }         
        },
        allToggle: function($el, options){
            var $all = $('<span />').addClass('toggle-all ta-show').text('show all').on('click', function(){
                var txt,
                    toggleEl = options.toggleElement;
                $('.toggle-all').toggleClass('ta-show');
                if($all.text()==='show all'){
                    txt = 'hide all';
                    if(options.jqAnim){
                        $el.find(toggleEl).removeClass('expandy-hidden').next('.expandy').slideDown(options.speed);
                    }else{ 
                        $el.find(toggleEl).addClass('expandy-hidden').next('.expandy').removeClass('expandy-hidden');  
                    }
                }else{
                    txt = 'show all';
                    if(options.jqAnim){
                        $el.find(toggleEl).addClass('expandy-hidden').next('.expandy').slideUp(options.speed); 
                    }else{ 
                        $el.find(toggleEl).addClass('expandy-hidden').next('.expandy').addClass('expandy-hidden');  
                    }
                }
                $el.find('.toggle-all').text(txt);
            });
            // $all.prependTo($el).clone(true).appendTo($el); // show top + bottom
            $all.prependTo($el); // show at top only
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
        showFirst: false,
        accordion: false,
        speed: 'medium',
        indicator: 'plusminus'
    };
    
})( jQuery );