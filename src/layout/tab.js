/**
 * Tab Layout pour du multi colonne
 * @constructor
 */
icudroid.utils.form.TabLayout = function(nbCol,options){
    icudroid.utils.form.AbstractLayout.call(this,options);
    this.nbCol = nbCol;
    this.index = 0;
    this.row = null;
};
icudroid.utils.form.TabLayout.prototype = $.extend({
    /**
     * Ajout l'élément au bonne emplacement
     * @param dom
     */
    append : function(dom){
        var col = $('<div class="col-md-'+(12/this.nbCol)+'"></div>');
        if(this.index%this.nbCol == 0){
            this.row = $('<div class="row"></div>');
            this.row.append(col);
            col.append(dom);
            this.$container.append(this.row);
        }else{
            col.append(dom);
            this.row.append(col);
        }
        this.index ++;
    },
    /**
     * Ajout de la section
     * @param dom
     */
    appendSection : function(dom){
        this.$container.append(dom);
        this.index = 0;
    }
},icudroid.utils.form.AbstractLayout.prototype);