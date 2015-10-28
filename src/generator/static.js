
/**
 * Générer un champs en lecture seul. Par exemple de le cas de champs qui ne peuvent pas être modifier
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.StaticGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstractGenerator.call(this,form,layout,formObject,objectName);
    this.staticPart = null;
    this.val = null;
    this._init();
};
icudroid.utils.form.StaticGenerator.prototype = $.extend({
    /**
     *
     * @private
     */
    _init : function(){
        var formGroup = this.formGroup();
        var controlLabel = this.label();
        formGroup.append(controlLabel);

        var container = this.container();

        this.staticPart = $('<p class="form-control-static" />');

        container.append(this.staticPart);
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

        if(typeof this.formObject.render != "undefined"){
            this.staticPart.html(this.formObject.render(val));
        }else{
            this.staticPart.html(that.getLabelOption(val));
        }


    }
});