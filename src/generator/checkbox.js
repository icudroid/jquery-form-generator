
/**
 * Générer un input checkbox
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.CheckboxGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstracMultiInputGenerator.call(this,form,layout,formObject,objectName);
    this.TPL = '<label><input type="checkbox" name="@@NAME@@" value="@@VAL@@"/>@@TXT@@</label>';
    this.classMulti = "checkbox-list";
    this._init();
};
icudroid.utils.form.CheckboxGenerator.prototype = $.extend({},icudroid.utils.form.AbstracMultiInputGenerator.prototype,{
    /**
     * set la valeur
     * @param val
     */
    value : function(val){
        if(typeof val == "undefined"){
            return this.containerMulti.find("input:checked").map(function() {
                return this.value;
            }).get();
        }else{
            if($.isArray(val)){
                for (var i = 0; i < val.length; i++) {
                    var v = val[i];
                    this.containerMulti.find('input[value="'+v+'"]').prop('checked', true);
                }
            }else{
                this.containerMulti.find('input[value="'+val+'"]').prop('checked', true);
            }
        }


    }
});