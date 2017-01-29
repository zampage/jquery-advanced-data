let jadUtility = {

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
        Object.keys(obj).forEach(function (key) {
            result[key] = obj[key];
        });
        return result;
    },

};

module.exports = jadUtility;