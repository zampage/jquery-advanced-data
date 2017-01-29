/**
 * @author Markus Chiarot
 * @website https://github.com/zampage/jquery-advanced-data#readme 
 * @version 0.0.3
 * 
 * jQuery-advanced-data is a jQuery plugin for optimizing data attribute handling
 */
'use strict';

(function ($) {

    var ALL_DATA = 'jad-give-me-all-data-attributes';

    /**
     * detect if multiple nodes are selected
     *
     * @param $nodes
     * @returns {boolean}
     */
    var detectMultiple = function detectMultiple($nodes) {
        return $nodes.length > 1;
    };

    /**
     * warn user about multiple node selection
     */
    var warnMultiple = function warnMultiple() {
        console.warn('[jQuer-Adcanced-Data]: Warning, multiple nodes selected! Falling back to first node.');
    };

    /**
     * create result allowing for passing further functions
     *
     * @param obj
     * @returns {{}}
     */
    var createResult = function createResult(obj) {
        var result = {};
        Object.keys(obj).forEach(function (key) {
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
    var getAllAttributes = function getAllAttributes($node) {
        var attributes = [];
        $.each($node.attributes, function () {
            if (this.specified && this.name.indexOf('data-') === 0) {
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
    var getAttribute = function getAttribute(key, $node) {
        return key == ALL_DATA ? getAllAttributes($node) : $node.attr('data-' + key);
    };

    /**
     * main jquery-plugin function
     *
     * @param key
     * @returns {Array}
     */
    $.fn.data = function (key) {

        //parameters
        key = key || ALL_DATA;

        //if necessary warn about multiple node selection
        if (detectMultiple(this)) warnMultiple();

        //select node
        var $node = $(this.get(0));

        //get attribute
        var attribute = getAttribute(key, $node);

        //create and return result
        return createResult({
            value: attribute,
            node: $node
        });
    };
})(jQuery);