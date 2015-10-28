
/**
 * Générer une partie vide pour pouvoir aligner les composants comme on le veux avec le TabLayout
 *
 *   formObject : {
 *          type : 'table',
 *          heads : {
 *              'field1' : { label : 'titre1'},
 *              'field2' : { label : 'titre2'},
 *              'field3' : { label : 'titre3'}
 *          },
 *          rows : {
 *              'field1' : {
 *                  type : 'static',
 *                  options : [ // optionnel
 *                      { value:'0', label : 'lable1'},
 *                      { value:'1', label : 'lable2'}
 *                  ]
 *              },
 *              'field2' : {
 *                  type : 'radio',
 *                  labelClass : 'radio-inline' // optionnel
 *              },
 *              'field3' : {
 *                  type : 'static',
 *                  additionalClass : 'row-title',
 *                  render : function(data){
 *                      return data;
 *                  }
 *
 *              }
 *          }
 *
 *  }
 *
 * @param layout
 * @param formObject
 * @param objectName
 * @constructor
 */
icudroid.utils.form.table.TableGenerator = function(form,layout,formObject,objectName){
    icudroid.utils.form.AbstractGenerator.call(this,form,layout,formObject,objectName);
    this.$table = null;
    this.$tableBody = null;
    this.generators = [];
    this._init();
};
icudroid.utils.form.table.TableGenerator.prototype = $.extend({
    /**
     *
     *
     * @private
     */
    _init : function(){
        var formGroup = this.formGroup();

        this.$table = $("<table></table>").addClass("table");
        //remplir les headers
        var $thead = $("<thead></thead>");
        this.$table.append($thead);
        var $trHead = $("<tr></tr>");

        for (var name in this.formObject.heads) {
            var head = this.formObject.heads[name];
            var $th = $("<th></th>")
            $th.html(head.label);
            $trHead.append($th);
        }
        $thead.append($trHead);

        this.$tableBody =  $("<tbody></tbody>");
        this.$table.append(this.$tableBody);
        formGroup.append(this.$table);
        this.layout.append(formGroup,this.objectName);
    }

},icudroid.utils.form.AbstractGenerator.prototype,{
    /**
     * set la valeur
     * @param val
     */
    value : function(val){
        var that = this;

        if(typeof val == "undefined"){
            var res = [];

            for (var i = 0; i <this.generators.length; i++) {
                var rowValues = {};
                var gens = this.generators[i];
                for (var generatorName in gens) {
                    rowValues[generatorName]=gens[generatorName].value();
                }
                res.push(rowValues);
            }
            return res;
        }

        //conserve la valeur setter en premier
        this.val =  val;



        var $tr, v, row,$td;
        for (var i = 0; i < val.length; i++) {
            v = val[i];
            $tr = $("<tr></tr>");
            var gens = {};
            for (var name in this.formObject.rows) {
                row = this.formObject.rows[name];
                $td= $("<td></td>");
                $tr.append($td);

                //obtenir la valeur
                var data =  eval('v.'+name);

                gens[name] = new icudroid.utils.form.table.generators[row.type](that,$td,this.form,this.formObject,this.objectName,row,i);
                gens[name].value(data);



            }
            this.generators.push(gens);
            this.$tableBody.append($tr);
        }





    }
});