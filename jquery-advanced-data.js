(function($){

    global.ALL_DATA = 'jad-give-me-all-data-attributes';

    const utility = require('./src/utility');
    const data = require('./src/data');
    const functions = require('./src/functions');

    /**
     * main jquery-plugin function
     *
     * @param key
     * @returns {Array}
     */
    $.fn.data = function(key){

        //parameters
        key = key || ALL_DATA;

        //if necessary warn about multiple node selection
        if(utility.detectMultiple(this)) utility.warnMultiple();

        //select node
        let $node = $(this.get(0));

        //get attribute
        let attribute = data.getAttribute(key, $node);

        //create and return result
        return utility.createResult({
            value: attribute,
            node: $node
        });

    };

}(jQuery));