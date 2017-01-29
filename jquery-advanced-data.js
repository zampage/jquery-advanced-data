(function($){

    let ALL_DATA = 'jad-all-data';
    let NO_VAL_SET = 'jad-no-val';

    let utility = {

        /**
         * detect if multiple nodes are selected
         *
         * @param $nodes
         * @returns {boolean}
         */
        detectMultiple: function ($nodes) {
            return $nodes.length > 1;
        },

        /**
         * warn user about multiple node selection
         */
        warnMultiple: function () {
            console.warn('[jQuer-Adcanced-Data]: Warning, multiple nodes selected! Falling back to first node.')
        },

        /**
         * create result allowing for passing further functions
         *
         * @param obj
         * @returns {{}}
         */
        createResult: function (obj) {
            let result = {};
            let funcs = {
                toggle: functions.toggle
            };

            Object.keys(obj).forEach(function(key) {
                result[key] = obj[key];
            });

            Object.keys(funcs).forEach(function(key){
                result[key] = function(){
                    funcs[key]();
                    return this;
                }
            });

            return result;
        },

    };

    let data = {

        /**
         * get all attributes from a node
         *
         * @param $node
         * @returns {Array}
         */
        getAllAttributes: function ($node) {
            var attributes = [];
            $.each($node.get(0).attributes, function () {
                if (this.specified && this.name.indexOf('data-') === 0) {
                    attributes[this.name.replace('data-', '')] = this.value;
                }
            });
            return attributes;
        },

        /**
         * distinguish what attributes to get and return them
         *
         * @param key
         * @param node
         * @param $node
         * @returns {Array}
         */
        getAttribute: function (key, $node) {
            return (key == ALL_DATA) ? this.getAllAttributes($node) : $node.attr('data-' + key);
        },

        /**
         * set value for a key
         *
         * @param key
         * @param val
         * @param $node
         */
        setAttribute: function(key, val, $node){
            $node.get(0).dataset[data.convertToCamelCase(key)] = val;
        },

        /**
         * convert kebab-case to camelCase
         *
         * @param input
         * @returns {*}
         */
        convertToCamelCase: function(input){
            let output = input;
            let exp = /-/g;
            let match;
            while((match = exp.exec(output)) != null){
                let idx = match.index;
                output = output.slice(0, idx) + output.charAt(idx + 1).toUpperCase() + output.slice(idx + 2, output.length);
            }
            return output;
        }

    };

    let functions = {

        toggle: function(){

            let positive = [
                true,
                1,
                'yes',
            ];

            let negative = [
                false,
                0,
                'no'
            ];

            //TODO: implement

        },

    };

    /**
     * main jquery-plugin function
     *
     * @param key
     * @param val
     * @returns {Array}
     */
    $.fn.data = function(key, val){

        //parameters
        key = key || ALL_DATA;
        val = val || NO_VAL_SET;

        //if necessary warn about multiple node selection
        if(utility.detectMultiple(this)) utility.warnMultiple();

        //select node
        let $node = $(this.get(0));

        //get attribute
        let attribute = data.getAttribute(key, $node);

        //set attribute
        if(val !== NO_VAL_SET) data.setAttribute(key, val, $node);

        //create and return result
        return utility.createResult({
            value: attribute,
            node: $node
        });

    };

}(jQuery));