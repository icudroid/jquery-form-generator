/**
 * Générer un select
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.Select2Generator = function(form,layout,formObject,objectName){
    icudroid.utils.form.SelectGenerator.call(this,form,layout,formObject,objectName);
    this._initSelect2();
};
icudroid.utils.form.Select2Generator.prototype = $.extend({
    /**
     *
     * @private
     */
    _initSelect2 : function(){
        this.select.select2();
    }
},icudroid.utils.form.SelectGenerator.prototype,{
    /**
     * set la valeur
     * @param val
     */
    value : function(val){
        if(typeof val == "undefined"){
            return this.select.val();
        }else{
            this.select.val(val);
            this.select.select2("val", val);
        }

    }

});