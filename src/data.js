let jadData = {

    /**
     * get all attributes from a node
     *
     * @param node
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
    }

};

module.exports = jadData;