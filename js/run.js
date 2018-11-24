jQuery(document).ready(function ($) {

    var options = {
        $SlideDuration: 800,                    
        $DragOrientation: 3,                    
        $AutoPlay: 1,                           
        $Idle: 1500,                            

        $BulletNavigatorOptions: {              
            $Class: $JssorBulletNavigator$,     
            $ChanceToShow: 2,                   
            $Steps: 1,                          
            $Rows: 1,                           
            $SpacingX: 10,                      
            $SpacingY: 10,                      
            $Orientation: 1                     
        },

        $ArrowNavigatorOptions: {
            $Class: $JssorArrowNavigator$,      
            $ChanceToShow: 2                    
        }
    };

    var jssor_slider1 = new $JssorSlider$('slider1_container', options);
    
    jssor_slider1.$Elmt.style.margin = "";

    function ScaleSlider() {

        var containerElement = jssor_slider1.$Elmt.parentNode;
        var containerWidth = containerElement.clientWidth;

        if (containerWidth) {
            var expectedWidth = Math.min(containerWidth, jssor_slider1.$OriginalWidth());

            //scale the slider to original height with no change
            jssor_slider1.$ScaleSize(expectedWidth, jssor_slider1.$OriginalHeight());

            jssor_slider1.$Elmt.style.left = ((containerWidth - expectedWidth) / 2) + "px";
        }
        else {
            window.setTimeout(ScaleSlider, 30);
        }
    }

    ScaleSlider();

    $(window).bind("load", ScaleSlider);
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", ScaleSlider);
    
});