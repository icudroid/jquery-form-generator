/**
 * Ajouter un generator
 */
icudroid.utils.form.addGenerator = function(type,generator) {
    icudroid.utils.form.generators[type] = generator;
};


icudroid.utils.form.findToken = function(str,data){
    var indexStart = str.indexOf('{');
    if(indexStart==-1)return str;
    var indexEnd = str.indexOf('}');

    var token = str.substring(indexStart+1,indexEnd);
    var tmpStr = str.split("{"+token+"}").join("'"+data[token]+"'");
    return icudroid.utils.form.findToken(tmpStr,data);

};