/**
 * Générer un input text
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.TextGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstracInputGenerator.call(this,form,layout,formObject,objectName);
    this.type = "text";
    this._init();
};
icudroid.utils.form.TextGenerator.prototype = $.extend({},icudroid.utils.form.AbstracInputGenerator.prototype);