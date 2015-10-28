/**
 * Générer un input password
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.PasswordGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstracInputGenerator.call(this,form,layout,formObject,objectName);
    this.type = "password";
    this._init();
};
icudroid.utils.form.PasswordGenerator.prototype = $.extend({},icudroid.utils.form.AbstracInputGenerator.prototype);