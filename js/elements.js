/**
 * Way of building html elements with an object of option
 * 
 * @version 1.1
 * @author Andrew Killen
 */

var Elmnts = {
    elm : false,
    /**
     * Takes an object of values to create a new HTML fragment
     * 
     * @param {object} obj {
     *      'type' : type of tag to create
     *      'class' : string or array of classes
     *      'atts' : object of all possible tag attributes
     *      'html'  : items that should be added as innerHTML
     *      'text'  : text that shouldbe added using innerText
     *      'append' : array of html object fragments or html object fragmenet to append to current object. 
     * }
     * 
     * usage example 
     * 
     * var elm = Elmnts.make({
     *      'type' : 'span',
     *      'text' : 'do something'
     * });
     * 
     * var elm2 =Elmnts.make({
     *      'type' : 'h1',
     *      'apprend: elm
     * });
     */
    make : function(obj){
        // clean anything that was there before
        this.elm = false;
        /**
         * Check if the options object has a type setting.
         * 
         * if there is no type, then we cannot go further and
         * with this.
         */
        if ( "type" in obj ) {
            this.create(obj.type) 
        } else {
             return false ;
        }
        /**
         * If there is a html or text setting in the options object, then apply that to the 
         * element.
         */
        var content = ['html', 'text'];
        for (var i = 0; i < content.length; i++){
            if(content[i] in obj) this[content[i]]( obj[content[i]] );
        }
        /**
         * Check for the atts in the options object and 
         * apply if set.  it just loops them
         */
        if ( "atts" in obj ) {
            for ( property in obj.atts ){
                this.set(property , obj.atts[property]);
            }
        }
        /**
         * Check if there is a class seting in the options object. 
         * 
         * If there is, then check if it is an array or string, if
         * its an array then loop it and add the classed
         */
        if ( "class" in obj ) {
            if(Array.isArray(obj.class)){
                // loop the array
                for(var i = 0; i < obj.class.length; i++){
                    this.class(obj.class[i]);
                }
            }
            else {
                // add the single string
                this.class(obj.class);
            }
        }
        /**
         * If there is an append option, then append that 
         * HTML DOM element to this element
         */
        if ( "append" in obj )  this.append(obj.append);

        /**
         * return the output 
         */
        return this.elm;

    },
    /**
     * creates a html element
     */
    create : function (el){
        this.elm = document.createElement(el);
    },
    /**
     * adds innerHTML
     */
    html : function (html){
        this.elm.innerHTML = html;
    },
    /**
     * adds innerText
     */
    text : function (text){
       // console.log('called');
        this.elm.innerText = text;  
    },
    /**
     * Set's an attribute on the element
     */
    set : function ( attribute, value ){
        this.elm.setAttribute(attribute, value);
    },
    /**
     * appends a class to the current classes
     */
    class : function(value){
        this.elm.classList.add( value );
    },
    /**
     * appends a child DOM object to this DOM object
     */
    append : function ( obj ){
        if( Array.isArray(obj) ){
            for(var i=0;i < obj.length; i++){
                this.elm.appendChild(obj[i]);
            }
        } else {
            this.elm.appendChild(obj);
        }
    }
};
