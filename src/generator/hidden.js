/**
 * Générer un champs caché
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.HiddenGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstractGenerator.call(this,form,layout,formObject,objectName);
    this.hidden = null;
    this._init();
};
icudroid.utils.form.HiddenGenerator.prototype = $.extend({
    /**
     *
     * @private
     */
    _init : function(){
        this.hidden = $('<input type="hidden"/>');
        this.hidden.attr("name",this.objectName).attr("id",this.objectName);
        this.layout.appendToContainer(this.hidden);
    }
},icudroid.utils.form.AbstractGenerator.prototype,{
    /**
     * Set la valeur
     * @param val
     */
    value :  function(val){
        if(typeof val == "undefined"){
            return this.hidden.val();
        }else{
            this.hidden.val();
        }
    }
});