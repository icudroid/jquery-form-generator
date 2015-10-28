/**
 * Générer un bouton
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.ButtonGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstractGenerator.call(this,form,layout,formObject,objectName);
    this._init();
};
icudroid.utils.form.ButtonGenerator.prototype = $.extend({
    /**
     * mybutton : {
                type: 'button',
                title: 'Click me',
                btnType: 'submit',
                containerClass: 'margin-15',
                additionalClass: 'my-button',
                events: {
                    click : function(e){
                        alert(this.className);
                    }
                }
            }
     * @private
     */
    _init : function(){
        var btn = this.formObject;

        var btnContainer = $('<div class="row"></div>');
        btnContainer.addClass(btn.containerClass);

        var $btn = $('<button type="submit" class="btn"></button>');
        $btn.attr("type", btn.btnType).html(btn.title);
        $btn.addClass(btn.additionalClass);

        for (var event in btn.events){
            $btn.bind(event,this.form,btn.events[event]);
        }

        btnContainer.append($btn);


        this.layout.append(btnContainer,this.objectName);
    }

},icudroid.utils.form.AbstractGenerator.prototype);