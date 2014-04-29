expandy-thing
=============

Just a dead simple jQuery plugin to show+hide content on a web page.

USAGE
include expandy.js and expandy.css

var options = {
        toggleElement: 'h2',
        jqAnim: false
    }
$(container).makeExpander(options);

// container - element containing all the toggle/expanding content
// toggleElement - heading for each piece of hidden/displayed content. Everything between each toggleElement will be hidden. default is 'h2'
// jqAnim - use jQuery slide animation instead of CSS to show/hide. default is false.
