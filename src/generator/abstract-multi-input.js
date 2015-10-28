/**
 *
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.AbstracMultiInputGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstractGenerator.call(this,form,layout,formObject,objectName);
    this.containerMulti = null;
    this.classMulti = null;
};
icudroid.utils.form.AbstracMultiInputGenerator.prototype = $.extend({
    /**
     *
     * @private
     */
    _init : function(){
        var formGroup = this.formGroup();
        var controlLabel = this.label();
        formGroup.append(controlLabel);

        var container = this.container();

        this.containerMulti = $('<div></div>').addClass(this.classMulti);

        if($.isFunction(this.formObject.options)){
            this.formObject.options = this.formObject.options(this.form._data());
        }

        // remlpir les radio
        for (var i = 0; i < this.formObject.options.length; i++) {
            var opt = this.formObject.options[i];
            var option = $(this.TPL.split("@@VAL@@").join(opt.value)
                .split("@@TXT@@").join(this.getLabelKey(opt))
                .split("@@NAME@@").join(this.objectName));

            option.addClass(this.formObject.labelClass);

            this.containerMulti.append(option);
        }

        container.append(this.containerMulti);
        formGroup.append(container);

        this.description(container);

        this.layout.append(formGroup,this.objectName);

        if (typeof this.formObject.validator !== "undefined") {
            this.containerMulti.find('input').rules( "add",this.formObject.validator);
        }
    }
},icudroid.utils.form.AbstractGenerator.prototype,{

    /**
     *
     * @param err
     */
    error : function(err){
        var $error = $('<span class="help-block jqg-error"></span>');
        $error.html(err);
        this.containerMulti.parent().append($error);
        this.containerMulti.parents('.form-group').addClass("has-error");
    }
});