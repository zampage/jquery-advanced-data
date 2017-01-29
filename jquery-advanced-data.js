(function($){

    const ALL_DATA = 'jad-give-me-all-data-attributes';

    /**
     * detect if multiple nodes are selected
     *
     * @param $nodes
     * @returns {boolean}
     */
    const detectMultiple = function($nodes){
        return $nodes.length > 1;
    };

    /**
     * warn user about multiple node selection
     */
    const warnMultiple = function(){
        console.warn('[jQuer-Adcanced-Data]: Warning, multiple nodes selected! Falling back to first node.')
    };

    /**
     * create result allowing for passing further functions
     *
     * @param obj
     * @returns {{}}
     */
    const createResult = function(obj){
        let result = {};
        Object.keys(obj).forEach(function(key){
            result[key] = obj[key];
        });
        return result;
    };

    /**
     * get all attributes from a node
     *
     * @param node
     * @returns {Array}
     */
    const getAllAttributes = function($node){
        var attributes = [];
        $.each($node.attributes, function(){
            if(this.specified && this.name.indexOf('data-') === 0){
                attributes[this.name.replace('data-', '')] = this.value;
            }
        });
        return attributes;
    };

    /**
     * distinguish what attributes to get and return them
     *
     * @param key
     * @param node
     * @param $node
     * @returns {Array}
     */
    const getAttribute = function(key, $node){
        return (key == ALL_DATA) ? getAllAttributes($node) : $node.attr('data-' + key);
    };

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
        if(detectMultiple(this)) warnMultiple();

        //select node
        let $node = $(this.get(0));

        //get attribute
        let attribute = getAttribute(key, $node);

        //create and return result
        return createResult({
            value: attribute,
            node: $node
        });

    };

}(jQuery));