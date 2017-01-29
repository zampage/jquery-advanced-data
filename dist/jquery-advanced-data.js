/**
 * @author Markus Chiarot
 * @website https://github.com/zampage/jquery-advanced-data#readme 
 * @version 0.0.3
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
        (function (global) {
            (function ($) {

                global.ALL_DATA = 'jad-give-me-all-data-attributes';

                var utility = require('./src/utility');
                var data = require('./src/data');
                var functions = require('./src/functions');

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
                    if (utility.detectMultiple(this)) utility.warnMultiple();

                    //select node
                    var $node = $(this.get(0));

                    //get attribute
                    var attribute = data.getAttribute(key, $node);

                    //create and return result
                    return utility.createResult({
                        value: attribute,
                        node: $node
                    });
                };
            })(jQuery);
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "./src/data": 2, "./src/functions": 3, "./src/utility": 4 }], 2: [function (require, module, exports) {
        var jadData = {

            /**
             * get all attributes from a node
             *
             * @param node
             * @returns {Array}
             */
            getAllAttributes: function getAllAttributes($node) {
                var attributes = [];
                $.each($node.attributes, function () {
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
                return key == ALL_DATA ? getAllAttributes($node) : $node.attr('data-' + key);
            }

        };

        module.exports = jadData;
    }, {}], 3: [function (require, module, exports) {
        var jadFunctions = {};

        module.exports = jadFunctions;
    }, {}], 4: [function (require, module, exports) {
        var jadUtility = {

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
                Object.keys(obj).forEach(function (key) {
                    result[key] = obj[key];
                });
                return result;
            }

        };

        module.exports = jadUtility;
    }, {}] }, {}, [1]);