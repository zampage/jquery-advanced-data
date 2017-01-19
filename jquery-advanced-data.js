(function($){

    const ALL_DATA = 'jad-give-me-all-data-attributes';

    /**
     * get all attributes from a node
     *
     * @param node
     * @returns {Array}
     */
    const getAllAttributes = function(node){
        var attributes = [];
        $.each(node.attributes, function(){
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
    const getAttribute = function(key, node, $node){
        return (key == ALL_DATA) ? getAllAttributes(node) : $node.attr('data-' + key);
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

        //init result
        let result = [];

        //loop nodes
        this.each(function(){

            //set current node
            let node = this;
            let $node = $(node);

            //get data
            let attribute = getAttribute(key, node, $node);

            //add data to result
            result.push([attribute, this]);

        });

        //return one or multiple results
        return (result.length == 1) ? result[0][0] : result;
    };

}(jQuery));