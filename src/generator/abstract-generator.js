/**
 * Fonction utilitaire au générateur html
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.AbstractGenerator = function(form,layout,formObject,objectName){
    this.form = form;
    this.layout = layout;
    this.formObject = formObject;
    this.objectName = objectName;

};
icudroid.utils.form.AbstractGenerator.prototype = {
    /**
     * Mettre le placeholder sur le champs si il est définit
     * @param $elt
     */
    placeholder : function($elt){
        if (typeof this.formObject.placeholder !== "undefined") {
            $elt.attr("placeholder",this.formObject.placeholder);
        }
    },
    /**
     * Créer la partie label
     * @returns {*|jQuery|HTMLElement}
     */
    label : function(){
        if (typeof this.formObject.title == "undefined" &&  typeof this.formObject.titleKey == "undefined") {
            return;
        }

        var controlLabel = $('<label class="control-label"></label>');
        controlLabel.addClass(this.layout.getSetting("labelClass"));

        var title = this.formObject.title;
        if (typeof this.formObject.titleKey != "undefined") {
            title =  ICUDROID.i18nTranslate(this.form.getOption("i18n"),this.formObject.titleKey);
        }
        controlLabel.html(title);
        return controlLabel;
    },
    /**
     * Créer le container form-group
     * @returns {*|jQuery|HTMLElement}
     */
    formGroup: function(){
        return $('<div class="form-group"></div>');
    },
    /**
     * Créer le container
     * @returns {*|jQuery}
     */
    container : function(){
        return $('<div></div>').addClass(this.layout.getSetting("containerClass"));
    },
    /**
     * Créer le commentaire en dessous du champs
     * @param container
     */
    description : function(container){
        if (typeof this.formObject.description !== "undefined") {
            var $description = $('<span class="help-block"></span>')
            $description.html(this.formObject.description);
            container.append($description);
        }
    },
    /**
     * Initialise le validateur du champs
     * @param $elt
     */
    validation : function($elt){
        if (typeof this.formObject.validator !== "undefined") {
            $elt.rules( "add",this.formObject.validator);
        }
    },
    /**
     * set la valeur
     */
    value : function(){},

    /**
     * Ajout l'erreur
     * @param err
     */
    error : function(err){},




    /**
     * Retrouve le label
     * @param val
     * @returns {*}
     */
    getLabelOption : function(val){

        if($.isFunction(this.formObject.options)){
            this.formObject.options = this.formObject.options(this.form._data());
        }

        if(typeof this.formObject.options != "undefined"){
            for (var i = 0; i < this.formObject.options.length; i++) {
                var opt = this.formObject.options[i];
                if(opt.value==val){
                    if(typeof opt.labelKey != "undefined"){
                        return ICUDROID.i18nTranslate(this.form._getOption("i18n"),opt.labelKey);
                    }else{
                        return opt.label;
                    }
                }
            }
        }else{
            return val;
        }

    },

    /**
     * Retrouve le label
     * @param val
     * @returns {*}
     */
    getMessageKey : function(){
        if(typeof this.formObject.messageKey != "undefined"){
            return ICUDROID.i18nTranslate(this.form._getOption("i18n"),this.formObject.messageKey);
        }else{
            return this.formObject.message;
        }
    },

    /**
     * Retrouve le label
     * @param val
     * @returns {*}
     */
    getLabelKey : function(opt){
        if(typeof opt.labelKey != "undefined"){
            return ICUDROID.i18nTranslate(this.form._getOption("i18n"),opt.labelKey);
        }else{
            return opt.label;
        }
    },


    getTooltipsMessageKey : function(){
        if(typeof this.formObject.tooltips.messageKey != "undefined"){
            return ICUDROID.i18nTranslate(this.form._getOption("i18n"),this.formObject.tooltips.messageKey);
        }else{
            return this.formObject.tooltips.message;
        }
    }


};
