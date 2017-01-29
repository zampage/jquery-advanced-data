/**
 * @author Markus Chiarot
 * @website https://github.com/zampage/jquery-advanced-data#readme 
 * @version 0.1.0
 * 
 * jQuery-advanced-data is a jQuery plugin for optimizing data attribute handling
 */
'use strict';

(function ($) {

    var ALL_DATA = 'jad-all-data';
    var NO_VAL_SET = 'jad-no-val';

    var utility = {

        /**
         * detect if multiple nodes are selected
         *
         * @param $nodes
         * @returns {boolean}
         */
        detectMultiple: function detectMultiple($nodes) {
            return $nodes.length > 1;
        },

        /**
         * warn user about multiple node selection
         */
        warnMultiple: function warnMultiple() {
            console.warn('[jQuer-Adcanced-Data]: Warning, multiple nodes selected! Falling back to first node.');
        }

    };

    var data = {

        /**
         * get all attributes from a node
         *
         * @param $node
         * @returns {Array}
         */
        getAllAttributes: function getAllAttributes($node) {
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
         * @param $node
         * @returns {Array}
         */
        getAttribute: function getAttribute(key, $node) {
            return key == ALL_DATA ? this.getAllAttributes($node) : $node.attr('data-' + key);
        },

        /**
         * set value for a key
         *
         * @param key
         * @param val
         * @param $node
         */
        setAttribute: function setAttribute(key, val, $node) {
            $node.get(0).dataset[data.convertToCamelCase(key)] = val;
        },

        /**
         * convert kebab-case to camelCase
         *
         * @param input
         * @returns {string}
         */
        convertToCamelCase: function convertToCamelCase(input) {
            var output = input;
            var exp = /-/g;
            var match = void 0;
            while ((match = exp.exec(output)) != null) {
                var idx = match.index;
                output = output.slice(0, idx) + output.charAt(idx + 1).toUpperCase() + output.slice(idx + 2, output.length);
            }
            return output;
        }

    };

    var functions = {

        /**
         * toggle value of the current data attribute
         *
         * @returns {{}}
         */
        toggle: function toggle() {
            var positive = [true, "true", 1, "1", 1, "1", "yes"];
            var negative = [false, "false", 0, "0", -1, "-1", "no"];
            var positiveIdx = positive.indexOf(this.value);
            var negativeIdx = negative.indexOf(this.value);
            var newValue = void 0;
            var found = false;

            if (positiveIdx >= 0) {
                newValue = negative[positiveIdx];
                found = true;
            }
            if (negativeIdx >= 0) {
                newValue = positive[negativeIdx];
                found = true;
            }

            if (found) {
                data.setAttribute(this.key, newValue, this.node);
                this.value = newValue;
            } else {
                console.error('[jQuery-Advanced-Data]: unable to toggle "data-' + this.key + '" with value "' + this.value + '"');
            }

            return this;
        }

    };

    /**
     * main jquery-plugin function
     *
     * @param key
     * @param val
     * @returns {{}}
     */
    $.fn.data = function (key, val) {

        //parameters
        key = key || ALL_DATA;
        val = val || NO_VAL_SET;

        //if necessary warn about multiple node selection
        if (utility.detectMultiple(this)) utility.warnMultiple();

        //select node
        var $node = $(this.get(0));

        //set attribute
        if (val !== NO_VAL_SET) data.setAttribute(key, val, $node);

        //get attribute
        var attribute = data.getAttribute(key, $node);

        //create and return result
        return {
            value: attribute,
            node: $node,
            key: key,
            toggle: functions.toggle
        };
    };
})(jQuery);