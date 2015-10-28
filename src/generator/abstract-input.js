
/**
 *
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.AbstracInputGenerator = function (form,layout,formObject,objectName){
    icudroid.utils.form.AbstractGenerator.call(this,form,layout,formObject,objectName);
    this.input = null;
    this.type = null;
};
icudroid.utils.form.AbstracInputGenerator.prototype = $.extend({
    /**
     *
     * @private
     */
    _init : function(){
        var that = this;

        var formGroup = this.formGroup();
        var controlLabel = this.label();
        formGroup.append(controlLabel);

        var container = this.container();

        this.input = $('<input class="form-control" />')
        this.input.attr('type',this.type);
        this.input.attr("name",this.objectName).attr("id",this.objectName);

        this.placeholder(this.input);

        if(typeof this.formObject.tooltips == 'undefined'){
            container.append(this.input);
        }else{
            var tooltipContainer = $('<div class="input-icon right"></div>');
            var icon = $('<i ></i>').addClass(this.formObject.tooltips.iconClass);
            tooltipContainer.append(icon).append(this.input);

            icon.tooltip({
                html : true,
                title : that.getTooltipsMessageKey()
            });
            container.append(tooltipContainer);
        }


        formGroup.append(container);

        this.description(container);

        this.layout.append(formGroup,this.objectName);

        this.validation(this.input)
    }
},icudroid.utils.form.AbstractGenerator.prototype,{
    /**
     * set la valeur
     * @param val
     */
    value : function(val){
        if(typeof val == "undefined"){
            return this.input.val();
        }else{
            this.input.val(val);
        }
    },
    /**
     *
     * @param err
     */
    error : function(err){
        var $error = $('<span class="help-block jqg-error"></span>');
        $error.html(err);
        this.input.parent().append($error);
        this.input.parents('.form-group').addClass("has-error");
    }

});