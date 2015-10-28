/**
 * Genérer un section
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.SectionGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstractGenerator.call(this,form,layout,formObject,objectName);
    this._init();
};
icudroid.utils.form.SectionGenerator.prototype = $.extend({
    /**
     *
     * @private
     */
    _init : function(){
        var section = $('<h3 class="form-section"></h3>');
        var title = this.formObject.title;
        if (typeof this.formObject.title == "undefined") {
            title = this.objectName;
        }
        section.html(title);
        this.layout.appendSection(section,this.objectName);
    }
},icudroid.utils.form.AbstractGenerator.prototype);