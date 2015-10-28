/**
 * Générer la bare d'action contenant les boutons
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.ActionsGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstractGenerator.call(this,form,layout,formObject,objectName);
    this._init();
};
icudroid.utils.form.ActionsGenerator.prototype = $.extend({
    /**
     *
     * @private
     */
    _init : function(){
        var actionsContainer = $('<div class="form-actions"></div>');
        var rowContainer = $('<div class="row"></div>');
        actionsContainer.append(rowContainer);
        var container = $('<div></div>').addClass(this.layout.getSetting("offsetBtnBarClass"));
        rowContainer.append(container);


        for (var i = 0; i < this.formObject.buttons.length; i++) {
            var btn = this.formObject.buttons[i];

            var $btn = $('<button type="submit" class="btn"></button>');
            $btn.attr("type",btn.type).html(btn.title);
            var className = "default";
            if (typeof btn.className !== "undefined") {
                className = btn.className;
            }
            $btn.addClass(className);

            for (var event in btn.events){
                $btn.bind(event,this.form,btn.events[event]);
            }

            container.append($btn);
        }

        this.layout.appendBarAction(actionsContainer,this.objectName);
    }

},icudroid.utils.form.AbstractGenerator.prototype);