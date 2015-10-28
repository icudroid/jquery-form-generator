/**
 *
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 *
 */
icudroid.utils.form.StaticActionGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstractGenerator.call(this,form,layout,formObject,objectName);
    this.staticPart = null;
    this.val = null;
    this._init();
};
icudroid.utils.form.StaticActionGenerator.prototype = $.extend({
    /**
     *
     * @private
     */
    _init : function(){

        var formGroup = this.formGroup();
        var controlLabel = this.label();
        formGroup.append(controlLabel);

        var container = this.container();

        var staticContainer = $('<div class="form-control-static col-md-12" ></div>');

        this.staticPart =  $('<div class="pull-left"></div>');
        var $btnContainer = $('<div class="pull-right">').css("margin-top","-8px");
        var $btn = $("<button type='button'></button>").addClass("btn default");
        $btn.bind("click",this.form,this.formObject.click);
        $btn.html(this.formObject.btnLabel);
        $btnContainer.append($btn);

        container.append(staticContainer);

        staticContainer.append(this.staticPart);
        staticContainer.append($btnContainer);


        formGroup.append(container);

        this.description(container);



        this.layout.append(formGroup,this.objectName);
    }

},icudroid.utils.form.AbstractGenerator.prototype,{
    /**
     * set la valeur
     * @param val
     */
    value : function(val){
        var that = this;

        if(typeof val == "undefined"){
            return this.val;
        }

        //conserve la valeur setter en premier
        this.val =  val;

        this.staticPart.html(that.getLabelOption(val));
    }
});