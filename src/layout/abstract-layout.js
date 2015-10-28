
/**
 *
 * @constructor
 */
icudroid.utils.form.AbstractLayout = function(options){
    this.$container = null;

    /**
     * Default settings
     */
    this.layoutSettings = {
        labelClass : icudroid.utils.form.CLASS_LABEL,
        containerClass : icudroid.utils.form.CLASS_CONTAINER,
        offsetBtnBarClass : icudroid.utils.form.CLASS_BUTTON_OFFEST
    };

    this.layoutSettings = $.extend(this.layoutSettings, options);


};
icudroid.utils.form.AbstractLayout.prototype = {


    getSetting : function(settingName){
        return this.layoutSettings[settingName];
    },

    /**
     * Ajoute simplement l'element à la fin du container
     * @param dom
     */
    appendToContainer : function(dom){
        this.$container.append(dom);
    },

    appendBarAction : function(dom){
        this.$container.append(dom);
    },

    /**
     *
     * @param container
     */
    build : function(container){
        this.$container = container;
    },

    appendInfo : function(dom){
        this.$container.append(dom);
    }
};