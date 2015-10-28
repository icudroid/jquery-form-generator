/**
 *
 * @param table
 * @param $td
 * @param form
 * @param formObject
 * @param objectName
 * @param row
 * @constructor
 */
icudroid.utils.form.table.StaticGenerator = function(table,$td,form,formObject,objectName,row){
    icudroid.utils.form.table.AbstractGenerator.call(this,table,$td,form,formObject,objectName,row);
};
icudroid.utils.form.table.StaticGenerator.prototype = $.extend({

},icudroid.utils.form.table.AbstractGenerator.prototype,{
    value : function(val){
        if(typeof val == "undefined"){
            return this.val;
        }else{
            this.val = val;
            this.$td
                .addClass(this.row.additionalClass);

            if(typeof this.row.render != "undefined"){
                this.$td.html(this.row.render(val));
            }else{
                this.$td.html(this.getLabelOption(val));
            }

        }

    }
});