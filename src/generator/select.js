/**
 * Générer un select
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.SelectGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstracInputGenerator.call(this,form,layout,formObject,objectName);
    this.select = null;
    this._init();
};
icudroid.utils.form.SelectGenerator.prototype = $.extend({
    /**
     *
     * @private
     */
    _init : function(){
        var formGroup = this.formGroup();
        var controlLabel = this.label();
        formGroup.append(controlLabel);

        var container = this.container();

        this.select = $('<select class="form-control" />')
        this.select.attr("name",this.objectName).attr("id",this.objectName);

        var TPL_OPTION = '<option value="@@VAL@@">@@TXT@@</option>';
        var TPL_OPTION_GRP = '<optgroup label="@@TXT@@"></optgroup>';

        var option;

        //remplir les options
        if($.isFunction(this.formObject.options)){
            this.formObject.options = this.formObject.options(this.form._data());
        }

        for (var i = 0; i < this.formObject.options.length; i++) {
            var opt = this.formObject.options[i];
            if(typeof opt.type  == "undefined"){
                opt.type = 'option';
            }

            if(opt.type == 'option'){
                option = $(TPL_OPTION.split("@@VAL@@").join(opt.value).split("@@TXT@@").join(this.getLabelKey(opt)));
            }else{
                option = $(TPL_OPTION_GRP.split("@@TXT@@").join(this.getLabelKey(opt)));

                for (var j = 0; j < opt.options.length; j++) {
                    var optGroupOpt = opt.options[j];
                    option.append($(TPL_OPTION.split("@@VAL@@").join(optGroupOpt.value).split("@@TXT@@").join(this.getLabelKey(optGroupOpt))));
                }
            }

            this.select.append(option);
        }


        container.append(this.select);
        formGroup.append(container);

        this.description(container);

        this.layout.append(formGroup,this.objectName);

        this.validation(this.select);
    }
},icudroid.utils.form.AbstractGenerator.prototype,{
    /**
     * set la valeur
     * @param val
     */
    value : function(val){
        if(typeof val == "undefined"){
            return this.select.val();
        }else{
            this.select.val(val);
        }

    },
    /**
     *
     * @param err
     */
    error : function(err){
        var $error = $('<span class="help-block jqg-error"></span>');
        $error.html(err);
        this.select.parent().append($error);
        this.select.parents('.form-group').addClass("has-error");
    }
});