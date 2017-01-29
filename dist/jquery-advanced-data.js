/**
 * @author Markus Chiarot
 * @website https://github.com/zampage/jquery-advanced-data#readme 
 * @version 0.0.4
 * 
 * jQuery-advanced-data is a jQuery plugin for optimizing data attribute handling
 */
"use strict";

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
            }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
        s(r[o]);
    }return s;
})({ 1: [function (require, module, exports) {
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
                },

                /**
                 * create result allowing for passing further functions
                 *
                 * @param obj
                 * @returns {{}}
                 */
                createResult: function createResult(obj) {
                    var result = {};
                    var funcs = {
                        toggle: functions.toggle
                    };

                    Object.keys(obj).forEach(function (key) {
                        result[key] = obj[key];
                    });

                    Object.keys(funcs).forEach(function (key) {
                        result[key] = function () {
                            funcs[key]();
                            return this;
                        };
                    });

                    return result;
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
                 * @param node
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
                 * @returns {*}
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

                toggle: function toggle() {

                    var positive = [true, 1, 'yes'];

                    var negative = [false, 0, 'no'];

                    //TODO: implement
                }

            };

            /**
             * main jquery-plugin function
             *
             * @param key
             * @param val
             * @returns {Array}
             */
            $.fn.data = function (key, val) {

                //parameters
                key = key || ALL_DATA;
                val = val || NO_VAL_SET;

                //if necessary warn about multiple node selection
                if (utility.detectMultiple(this)) utility.warnMultiple();

                //select node
                var $node = $(this.get(0));

                //get attribute
                var attribute = data.getAttribute(key, $node);

                //set attribute
                if (val !== NO_VAL_SET) data.setAttribute(key, val, $node);

                //create and return result
                return utility.createResult({
                    value: attribute,
                    node: $node
                });
            };
        })(jQuery);
    }, {}] }, {}, [1]);