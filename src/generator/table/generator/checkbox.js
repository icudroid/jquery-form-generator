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
icudroid.utils.form.table.CheckboxGenerator = function(table,$td,form,formObject,objectName,row,index){
    icudroid.utils.form.table.AbstracMultiInputGenerator.call(this,table,$td,form,formObject,objectName,row,index);
    this.TPL = '<label><input type="checkbox" name="@@NAME@@" value="@@VAL@@"/>@@TXT@@</label>';
    this.classContainer = "checkbox-list";
};


icudroid.utils.form.table.CheckboxGenerator.prototype = $.extend({

},icudroid.utils.form.table.AbstracMultiInputGenerator.prototype,{

});
