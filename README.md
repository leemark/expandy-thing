expandy-thing
=============

Just a dead simple jQuery plugin to show+hide content on a web page.

USAGE: include expandy.js and expandy.css

---------------------------------------
```
var options = {
        toggleElement: 'h2',
        jqAnim: false,
        speed: 400,
        indicator: 'plusminus'
    }
    
$(container).makeExpander(options);
```
---------------------------------------

*container* - outer container element containing *all* of the toggle/expanding content

*toggleElement* - heading for each piece of hidden/displayed content. everything between each toggleElement will be hidden. this element will be used to trigger the toggling behavior. default is 'h2'

*jqAnim* - use jQuery slide animation instead of simply using CSS to show/hide. default is false.

*speed* - speed of animation when using jQuery slide animation. accepts a # of milliseconds, or the keywords 'fast' (200ms) and 'slow' (600ms). default is 400.

*indicator* - what to add as an open-closed indicator. this option adds a class to the  toggleElement, the actual indicator is created/styled in the CSS. accepts 'plusminus', 'triangle', or 'arrow' (or anything else there are CSS classes for, if you want to roll your own). default is 'plusminus'. 