/**
 *
 * @param table
 * @param $td
 * @param form
 * @param formObject
 * @param objectName
 * @param row
 * @param index
 * @constructor
 */
icudroid.utils.form.table.AbstracMultiInputGenerator = function(table,$td,form,formObject,objectName,row,index){
    icudroid.utils.form.table.AbstractGenerator.call(this,table,$td,form,formObject,objectName,row);
    this.index = index;
};
icudroid.utils.form.table.AbstracMultiInputGenerator.prototype = $.extend({
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
    }
},icudroid.utils.form.table.AbstractGenerator.prototype,{
    value : function(val){

        if(typeof val == "undefined"){
            if(this instanceof icudroid.utils.form.table.CheckboxGenerator){
                return this.$td.find("input:checked").map(function() {
                    return this.value;
                }).get();

            }else{
                return this.$td.find("input:checked").val();
            }
        }

        if($.isFunction(this.row.options)){
            this.row.options = this.row.options(this.form._data());
        }

        var $inputContainer = $("<div></div>").addClass(this.classContainer);
        this.$td.append($inputContainer);

        // remlpir les radio
        for (var i = 0; i < this.row.options.length; i++) {
            var opt = this.row.options[i];
            var option = $(this.TPL.split("@@VAL@@").join(opt.value)
                .split("@@TXT@@").join(this.getLabelKey(opt))
                .split("@@NAME@@").join(this.objectName+'['+this.index+']'));
            option.addClass(this.row.labelClass);
            $inputContainer.append(option);
        }

        if($.isArray(val)){
            for (var i = 0; i < val.length; i++) {
                var v = val[i];
                $inputContainer.find('input[value="'+v+'"]').prop('checked', true);
            }
        }else{
            $inputContainer.find('input[value="'+val+'"]').prop('checked', true);
        }
    }
});