/**
 * Générer un select
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.MultiSelectGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.SelectGenerator.call(this,form,layout,formObject,objectName);
    this._initMulti();
};
icudroid.utils.form.MultiSelectGenerator.prototype = $.extend({
    /**
     *
     * @private
     */
    _initMulti : function(){
        var that = this;
       var multiselectOptions ={
            enableClickableOptGroups: true,
            enableFiltering: true,
            filterPlaceholder: 'Chercher',
            maxHeight: 300,
            buttonWidth:250,
            nonSelectedText:"Sélectionner",
            numberDisplayed:3,
            nSelectedText:" choix",
            allSelectedText: 'Tous les choix selectionnés'
        };

        this.formObject.multiselectOptions = $.extend(multiselectOptions,this.formObject.multiselectOptions);

        var opts = $.extend({
            onChange: function(option, checked, select) {
                Metronic.updateUniform();
            }
        }, this.formObject.multiselectOptions);

        this.select.attr("multiple","multiple");
        this.select.multiselect(opts);


    }
},icudroid.utils.form.SelectGenerator.prototype,{
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