
/**
 * Générer du html à partir d'un template
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.TemplatableGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstractGenerator.call(this,form,layout,formObject,objectName);
    this.tplContainer = null;
    this._init();
};
icudroid.utils.form.TemplatableGenerator.prototype = $.extend({
    /**
     *  formObject : {
     *                       type : 'template',
     *                       containerClass : '',
     *                       template : "<span>{field1}</span><span>{field2}</span>",
     *                       render : { //facultatif
     *                           field1 : function(fieldData){
     *                               return fieldData;
     *                           },
     *                           field2 : function(fieldData){
     *                               return fieldData;
     *                           }
     *                       }
     *               }
     * @private
     */
    _init : function(){
        this.tplContainer = $("<div></div>").addClass(this.formObject.containerClass);
        this.layout.append(this.tplContainer,this.objectName);
    },

    /**
     * Créer le html
     * @param str
     * @param data
     * @returns {*}
     */
    findToken : function(str,data){
        var indexStart = str.indexOf('{');
        if(indexStart==-1)return str;
        var indexEnd = str.indexOf('}');

        var token = str.substring(indexStart+1,indexEnd);
        var tmpStr;
        if(typeof this.formObject.render == "undefined" || typeof this.formObject.render[token] == "undefined"){
            tmpStr = str.split("{"+token+"}").join(eval('data.'+token));
        }else {
            tmpStr = str.split("{"+token+"}").join(this.formObject.render[token](eval('data.'+token)));
        }

        return this.findToken(tmpStr,data);
    }

},icudroid.utils.form.AbstractGenerator.prototype,{

    /**
     * set la valeur
     * @param val
     */
    value : function(val){
       this.tplContainer.html(this.findToken(this.formObject.template,this.form._originData()));
    }


});

