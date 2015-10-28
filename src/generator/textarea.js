
/**
 * Générer un textarea
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.TextareaGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstractGenerator.call(this,form,layout,formObject,objectName);
    this.textarea = null;
    this._init();
};
icudroid.utils.form.TextareaGenerator.prototype = $.extend({
    /**
     *
     * @private
     */
    _init : function(){
        var formGroup = this.formGroup();
        var controlLabel = this.label();
        formGroup.append(controlLabel);


        var nbRows = 3;
        if (typeof this.formObject.nbRows !== "undefined") {
            nbRows = this.formObject.nbRows;
        }

        var container = this.container();

        this.textarea = $('<textarea class="form-control" />')
        this.textarea.attr("rows",nbRows).attr("name",this.objectName).attr("id",this.objectName);

        this.placeholder(this.textarea);

        container.append(this.textarea);
        formGroup.append(container);

        this.description(container);

        this.layout.append(formGroup,this.objectName);

        this.validation(this.textarea)
    }
},icudroid.utils.form.AbstractGenerator.prototype,{
    /**
     * set la valeur
     * @param val
     */
    value : function(val){
        if(typeof val == "undefined"){
            return this.textarea.val();
        }else{
            this.textarea.val();
        }

    },
    /**
     *
     * @param err
     */
    error : function(err){
        var $error = $('<span class="help-block jqg-error"></span>');
        $error.html(err);
        this.textarea.parent().append($error);
        this.textarea.parents('.form-group').addClass("has-error");
    }
});
