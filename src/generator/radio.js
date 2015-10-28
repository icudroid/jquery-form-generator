/**
 * Générer des input radio
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.RadioGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstracMultiInputGenerator.call(this,form,layout,formObject,objectName);
    this.TPL = '<label><input type="radio" name="@@NAME@@" value="@@VAL@@"/>@@TXT@@</label>';
    this.classMulti = "radio-list";

    this._init();
};
icudroid.utils.form.RadioGenerator.prototype = $.extend({},icudroid.utils.form.AbstracMultiInputGenerator.prototype,{
    value : function(val){
        if(typeof val == "undefined"){
            if(this instanceof icudroid.utils.form.RadioGenerator){
                return this.containerMulti.find("input:checked").val();
            }else{
                return this.containerMulti.find("input:checked").map(function() {
                    return this.value;
                }).get();
            }
        }else{
            this.containerMulti.find('input[value="'+val+'"]').prop('checked', true);
        }
    }
});