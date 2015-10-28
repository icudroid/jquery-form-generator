/**
 * Fonction utilitaire au table générateur html
 * @param table
 * @param $td
 * @param form
 * @param formObject
 * @param objectName
 * @param row
 * @constructor
 */
icudroid.utils.form.table.AbstractGenerator = function(table,$td,form,formObject,objectName,row){
    this.$table = table;
    this.$td = $td;
    this.form = form;
    this.formObject = formObject;
    this.objectName = objectName;
    this.row = row;
};
icudroid.utils.form.table.AbstractGenerator.prototype = {

    /**
     * Retrouve le label
     * @param val
     * @returns {*}
     */
    getLabelOption : function(val){
        if(typeof this.row.options != "undefined"){
            for (var i = 0; i < this.row.options.length; i++) {
                var opt = this.row.options[i];
                if(opt.value==val){
                    return opt.label;
                }
            }
        }else{
            return val;
        }

    },
    /**
     *
     * @param val
     */
    value : function(val){
        if(typeof val == "undefined"){
            return this.val;
        }else{
            this.val = val;
            this.$td.html(val);
        }

    }
};