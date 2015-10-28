/**
 * Default Layout
 * @constructor
 */
icudroid.utils.form.DefaultLayout = function(options){
    icudroid.utils.form.AbstractLayout.call(this,options);
};
icudroid.utils.form.DefaultLayout.prototype = $.extend({
    /**
     * Ajout l'élément au bonne emplacement
     * @param dom
     */
    append : function(dom){
        this.$container.append(dom);
    },
    /**
     * Ajout de la section
     * @param dom
     */
    appendSection : function(dom){
        this.$container.append(dom);
    }
},icudroid.utils.form.AbstractLayout.prototype);