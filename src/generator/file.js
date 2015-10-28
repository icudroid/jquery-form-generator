/**
 * Générer un input password
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.FileGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstracInputGenerator.call(this,form,layout,formObject,objectName);
    this.type = "file";
    this._init();
};
icudroid.utils.form.FileGenerator.prototype = $.extend({},icudroid.utils.form.AbstracInputGenerator.prototype);