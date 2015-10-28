/**
 * Générer la bare d'action contenant les boutons
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.InfoGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstractGenerator.call(this,form,layout,formObject,objectName);
    this.infoContainer = null;
    this._init();
};
icudroid.utils.form.InfoGenerator.prototype = $.extend({
    /**
     *
     * @private
     */
    _init : function(){
        var that = this;

        that.infoContainer = $("<div></div>").attr("name",that.objectName).attr("id",that.objectName);
        that.layout.appendInfo(that.infoContainer,this.objectName);

        if(typeof that.formObject.message != "undefined"){
            Metronic.alert({
                type: that.formObject.typeAlert,
                icon: that.formObject.icon,
                close : false,
                message: that.getMessageKey(),
                container:  '#'+that.objectName,
                place: 'prepend',
                reset : false
            });
        }

    }

},icudroid.utils.form.AbstractGenerator.prototype,{

    /**
     *
     * @param val
     */
    changeMessage : function(val){
        var that = this;
        Metronic.alert({
            type: val.typeAlert,
            icon: val.icon,
            close : false,
            message: val.message,
            container:  '#'+that.objectName,
            place: 'replace',
            reset : false
        });
    },
    /**
     *
     */
    remove : function() {
        this.infoContainer.empty();
    }


});
