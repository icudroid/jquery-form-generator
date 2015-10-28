
/**
 * Générer une partie vide pour pouvoir aligner les composants comme on le veux avec le TabLayout
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.EmptyGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstractGenerator.call(this,form,layout,formObject,objectName);
    this._init();
};
icudroid.utils.form.EmptyGenerator.prototype = $.extend({
    /**
     *
     * @private
     */
    _init : function(){
        var formGroup = this.formGroup();
        var controlLabel = this.label();
        formGroup.append(controlLabel);

        var container = this.container();
        formGroup.append(container);

        this.layout.append(formGroup,this.objectName);
    }

},icudroid.utils.form.AbstractGenerator.prototype,{
    /**
     * Overide label
     * @returns {*|jQuery|HTMLElement}
     */
    label : function(){
        var controlLabel = $('<label class="control-label"></label>');
        controlLabel.addClass(this.layout.getSetting("labelClass"));
        return controlLabel;
    }
});