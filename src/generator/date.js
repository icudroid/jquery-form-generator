/**
 * Générer un input date
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.DateGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstracInputGenerator.call(this,form,layout,formObject,objectName);
    var that = this;
    this.type = "text";
    this._init();

    that.input.attr("size",10).attr("maxlength",10);
    that.input.addClass('date-form-group');

    var handleDate = function(){

        var defaultOptions ={
                placeholder: "jj/mm/aaaa",
                mask :       "d/m/y"
        };

        var opts = $.extend(true, {}, defaultOptions, formObject.inputmask);

        that.input.inputmask(opts);
    };

    handleDate();

};
icudroid.utils.form.DateGenerator.prototype = $.extend({},icudroid.utils.form.AbstracInputGenerator.prototype);