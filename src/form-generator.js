/**
 * Générateur de formulaire à partir d'un schema json
 *
 *
 * Les options du composants :
 *
 * - src : selecteur jquery du l'element form
 * - properties : schema
 * - data : données pour le remplissage des valeurs
 * - layout : permet de définir le layout d'affichage par defaut c'est DefaultLayout
 * - errors :  les erreurs provenant du serveur
 *  exemple :
 *  {
 *   field1 : "err",
 *   field2 : "err"
 *  }
 *  - steper : affichage du wizard
 *  - url : url du chargement des properties et du steper. Viens ecraser le champs properties et steper si il était défini.
 *
 * Les Layouts :
 *
 * - DefaultLayout : Affichage des champs les uns en dessous des autres
 * - TabLayout : Affichage en mode colonne
 * le constructor de TabLayout prend en paramètre le nombre de colonne à afficher
 *
 *
 *
 * Tous les types possibles :
 *
 *    'section' :
 *
 *     "section" : { // nom de la section et son titre si la propriété title est absente
 *           type : "section",
 *           title : "Mon titre",
 *       },
 *
 *
 *    'text' :
 *    'password' :
 *    'date' :
 *    'select' :
 *    'radio' :
 *    'checkbox' :
 *    'textarea' :
 *
 *    "number" : {
 *           type: "text|password|date|select|radio|checkbox|textarea",
 *           title: 'Mon titre',
 *           description : 'Ma description'
 *           validator : { // jquery validation
 *                   required: true,
 *                   minlength: 2,
 *                   messages: {
 *                           required: "Champs réquis",
 *                           minlength: jQuery.validator.format("Au moins {0} sont nécessaire")
 *                   }
 *           }
 *   },
 *
 *    'static' : // affichage d'information non modifiable
 *
 *    staticField : {
 *           type : 'static',
 *           title : "Mon titre"
 *   },
 *
 *    'empty' : // pour de la mise en page
 *    'hidden' : //input type hidden
 *
 *    hiddenTest : {
 *           type : 'empty|hidden'
 *    },
 *
 *
 *
 * 'select' : // select
 * 'select2' : // select avec select2
 * 'multi-select' : // select à valeur multiple
 *
 *
 * exemple :
 *  "sex": {
 *     "type": "select",
 *     "title": "Sexe",
 *     "options": [
 *       {
 *         "value": "",
 *         "label": "Sélectionnez"
 *       },
 *       {
 *         "value": "MR",
 *         "label": "Monsieur"
 *       },
 *       {
 *         "value": "MME",
 *         "label": "Madame"
 *       }
 *     ],
 *     "validator": {
 *       "required": true
 *     }
 *   },
 *
 *
 *  'info' : permet d'avoir un block d'information
 *
 *  info : {
 *      type : 'info',
 *      message : 'BlocInfo-MN1-CNI-1', // le message du bock
 *      typeAlert : 'info|success|warning|danger',
 *      icon : "" // class css de l'icon a mettre devant le message
 *  }
 *
 *    'actions' :
 *
 *
 *   btns : {
 *           type : 'actions',
 *           buttons :[
 *               {
 *                   type : 'button|submit',
 *                   title : 'cancel',
 *                   className : 'default',
 *                   events : { // event jquery
 *                       click : function(e){
 *                           console.log('btn1');
 *                       }
 *                   }
 *
 *               },
 *               {
 *                   type : 'button|submit',
 *                   title : 'OK',
 *                   className : 'blue',
 *                   events : { // event jquery
 *                       click : function(e){
 *                           console.log('btn2');
 *                       }
 *                   }
 *
 *               }
 *           ]
 *       }
 *
 *
 *
 *  - on peut faire afficher ou non un composant grace à la propriété conditionnal :
 *  exemple :
 *  info : {
 *      type : 'info',
 *      conditionnal : "{type} == 'MON _TYPE'",
 *      message : 'BlocInfo-MN1-CNI-1', // le message du bock
 *      typeAlert : 'info|success|warning|danger',
 *      icon : "" // class css de l'icon a mettre devant le message
 *  }
 *
 *  pour prendre la valeur d'un attribut du model on place le nom de le propriété entre {}
 *
 *
 *
 *  - on peut faire changer les informations du composant grace à la propriété conditionnals :
 *  exemple :
 *
 *      "personalNumber" : {
 *                           type : 'text',
 *                           conditionals : [
 *                           {
 *                                   conditional : "{country} == 'PAMDA'",
 *                                   title : 'Numãrul de Identificare/ Personal No./ No personnel',
 *                                   "validator": {
 *                                       "required": true,
 *                                       "minlength": 13,
 *                                       "maxlength": 13,
 *                                       "messages": {
 *                                         "required": "Champs réquis",
 *                                         "minlength": jQuery.validator.format("Doit contenir {0} caractères"),
 *                                         "maxlength": jQuery.validator.format("Doit contenir {0} caractères")
 *                                       }
 *                                   }
 *                           },
 *                           {
 *                                   conditional : "{country} == 'P<BEN'",
 *                                   title : 'N° personnel / Personal No',
 *                                   "validator": {
 *                                       "required": true,
 *                                       "minlength": 9,
 *                                       "maxlength": 9,
 *                                       "messages": {
 *                                         "required": "Champs réquis",
 *                                         "minlength": jQuery.validator.format("Doit contenir {0} caractères"),
 *                                         "maxlength": jQuery.validator.format("Doit contenir {0} caractères")
 *                                       }
 *                                   }
 *                           }
 *                           ]
 *       }
 *
 *
 * exemple d'utilisation :
 *
 * Code HTML :
 *
 *         <form class="form-horizontal" id="form"></form>
 *
 *
 * Code JS :
 *              var data = {
 *                       lastName : 'KAHN',
 *                       weddingName : '',
 *                       firstName : 'Dimitri',
 *                       sex : 'MR',
 *                       birthday : '',
 *                       id : 1
 *               };
 *
 *              var properties =  {
 *
 *                               lastName : {
 *                                       type : "text",
 *                                       title: "Nom",
 *                                       validator : {
 *                                               required: true,
 *                                               minlength: 2
 *                                               messages: {
 *                                                       required: "Champs réquis",
 *                                                       minlength: jQuery.validator.format("Au moins {0} caractères sont nécessaires")
 *                                               }
 *                                       }
 *                               },
 *
 *                               weddingName : {
 *                                       type : "text",
 *                                       title : "Nom d’usage / nom d’épouse",
 *                                       validator : {
 *                                               required: true,
 *                                               minlength: 2
 *                                               messages: {
 *                                                       required: "Champs réquis",
 *                                                       minlength: jQuery.validator.format("Au moins {0} caractères sont nécessaires")
 *                                               }
 *                                       }
 *                               },
 *
 *                               firstName : {
 *                                       type : "text",
 *                                       title : "Prénom (s)",
 *                                       validator : {
 *                                               required: true
 *                                       }
 *                               },
 *
 *                               sex : {
 *                                       type : "select",
 *                                       title : "Sexe",
 *                                       "options": [
 *                                               {value : "", label:"Sélectionnez"},
 *                                               {value : "MR", label:"Monsieur"},
 *                                               {value : "MME", label:"Madame"}
 *                                       ],
 *                                       validator : {
 *                                               required: true
 *                                       }
 *                               },
 *
 *                               birthday : {
 *                                       type : "date",
 *                                       title : "Né(e) le",
 *                                       validator : {
 *                                               required: true,
 *                                               date: true
 *                                       }
 *                               },
 *                               delivery :{
 *                                       type : "date",
 *                                       title : "Carte délivrée le",
 *                                       validator : {
 *                                               required: true,
 *                                               date: true
 *                                       }
 *                               },
 *
 *                               id : {
 *                                   type : 'hidden'
 *                               },
 *
 *                               btns : {
 *                                   type : 'actions',
 *                                   buttons :[
 *                                       {
 *                                           type : 'button',
 *                                           title : 'cancel',
 *                                           className : 'default',
 *                                           events : {
 *                                               click : function(e){
 *                                                   console.log('btn1');
 *                                               }
 *                                           }
 *
 *                                       },
 *                                       {
 *                                           type : 'submit',
 *                                           title : 'OK',
 *                                           className : 'blue',
 *                                           events : {
 *                                               click : function(e){
 *                                                   console.log('btn2');
 *                                               }
 *                                           }
 *
 *                                       }
 *                                   ]
 *                               }
 *                       }
 *               };
 *
 *
 *              var form = new icudroid.utils.form.FormGenerator({
 *                       src : "#form",
 *                       properties : properties,
 *                       data : data,
 *                       layout : new icudroid.utils.form.TabLayout(2),
 *                       i18n : {
 *                          "MA-CLE" : "Ma traduction"
 *                       }
 *               });
 *
 * @param options
 * @constructor
 */
icudroid.utils.form.FormGenerator = function(options) {

    /**
     * Object Current pur ne pas perdre la référence
     * @type {icudroid.utils.form.FormGenerator}
     */
    var that = this;




    /**
     * Retourne l'objet modifier par les valeurs du formulaire
     * @returns {null}
     * @private
     */
    this._data = function(){
        var res = settings.data;

        for (var v in forms){
            var val = forms[v].value();
            if(typeof val != "undefined"){
                var indexOfDot = v.indexOf(".");
                var indexOfArray = v.indexOf("[");
                if(indexOfDot==-1 && indexOfArray==-1){
                    res[v]=val;
                }else{
                    var obj = {};
                    var indexOf = Math.min(indexOfDot,indexOfArray);
                    obj[v.substring(0,indexOf)] = createDataUrl(v,val);
                    res = $.extend(true,res,obj);
                }
            }
        }
        return res;
    };

    /**
     * Retourn l'objet data passer dans les settings
     * @returns {null}
     * @private
     */
    this._originData = function(){
        return settings.data;
    };


    /**
     * est-ce que tous les validators sont OK
     * @returns {*}
     * @private
     */
    this._isValid = function(){
        return $container.valid();
    };



    /**
     * Fermeture de la modal
     * @private
     */
    this._closeModal = function(){
        if(settings.layout instanceof icudroid.utils.form.DialogLayout){
            settings.layout.close();
        }
    };


    this._getOption = function(optName){
      return settings[optName];
    };

    this._setOption = function(optName,val){
        settings[optName] = val;
    };

    /**
     * retourne l'objet du générateur
     * @param blocName
     * @returns {*}
     * @private
     */
    this._getBlock = function(blocName){
        return forms[blocName];
    };

    /**
     * garde la reference des object du formulaire
     * @type {{}}
     */
    var forms = {};

    /**
     * Container jquery pour l'ajout des composants du form
     */
    var $container;

    /**
     * Default settings
     */
    var settings = {
        src : null,
        properties : null,
        errors : null,
        data : null,
        layout : new icudroid.utils.form.DefaultLayout(),
        steper : null,
        url : null,
        i18n : {},
        formClass : icudroid.utils.form.CLASS_FORM
    };

    settings = $.extend(settings, options);

    //create from tag
    var $form = $("<form></form>").addClass(settings.formClass);

    if(settings.src == null){
        $("body").append($form);
    }else{
        $(settings.src).empty().append($form);
    }

    $container = $form;

    //vide le form
    $container.empty();

    settings.layout.build($container);

    /**
     * Initialise jquery validation pour notre HTML
     */
    var initDefaultValidator = function(){
        $.validator.setDefaults({


            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element)
                    .closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },

            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            errorPlacement: function(error, element) {

                if (element.parent(".input-group").size() > 0) {
                    element.parent(".input-group").find(".jqg-error").remove();
                    error.insertAfter(element.parent(".input-group"));
                }else if(element.is(':checkbox')){
                    if (element.parents('.checkbox-inline').size() > 0){
                        element.parents(".checkbox-inline").parent().find(".jqg-error").remove();
                        error.appendTo(element.parents('.checkbox-inline'));
                    }else if (element.parents('.checkbox-list').size() > 0){
                        element.parents(".checkbox-list").parent().find(".jqg-error").remove();
                        error.appendTo(element.parents('.checkbox-list'));
                    }
                }else if(element.is(':radio')){
                    if (element.parents('.radio-inline').size() > 0){
                        element.parents(".radio-inline").parent().find(".jqg-error").remove();
                        error.appendTo(element.parents('.radio-inline'));
                    }else if (element.parents('.radio-list').size() > 0){
                        element.parents(".radio-list").parent().find(".jqg-error").remove();
                        error.appendTo(element.parents('.radio-list'));
                    }
                } else {
                    element.parent().parent().find(".jqg-error").remove();
                    if(error.html()!=""){// correct MRZ problème
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                }
            }
        });
    };

    /**
     * Initialisation dans le cas où l'url est défini
     */
    var initFormUrl = function(){
        //chargement du schema et du steper depuis une url
        if(settings.url!=null){
            $.ajax({
                url : settings.url,
                async : false,
                success: function(response) {
                    var config = eval ("(" + response + ")");
                    settings.properties = config.schema;
                    settings.steper = config.steper;
                }
            });
        }
    };


    /**
     * prendre en compte les field.property
     * @param data
     * @param urlData
     * @returns {*}
     */
    var getData = function(data,urlData){
        try{
            return eval('data.'+urlData);
        }catch(e){
            console.log(data,urlData);
            return;
        }

    };


    var isConditionalOk = function (property){
        if (typeof property.conditional == "undefined" && typeof property.conditionals == "undefined"){
            return true;
        }else if(typeof property.conditionals != "undefined"){
            //remplir la propriété avec les bonnes valeurs

            for (var i = 0; i < property.conditionals.length; i++) {
                var condition = property.conditionals[i];
                if(isConditionalOk(condition)){
                    property = $.extend(property,condition);
                    return true;
                }
            }

        }else if(typeof property.conditional != "undefined"){
            return eval(icudroid.utils.form.findToken(property.conditional,settings.data));
        }
    };

    /**
     * Initialisation du composant
     */
    var initComponent = function(){

        $container.validate({
            onfocusout: function(element) {
                this.element(element);
            },
            submitHandler: function(form) {
                console.log("do not submit ...");
            },
            ignore: "not:hidden"
        });


        for (var formObject in settings.properties){
            var property = settings.properties[formObject];

            if(isConditionalOk(property)){
                forms[formObject] = new icudroid.utils.form.generators[property.type](that,settings.layout,property,formObject)
                forms[formObject].value(getData(settings.data,formObject));
            }

        }

    };


    /**
     * Initialisation du wizard
     */
    var initSteper = function(){
        if(settings.steper!=null){
            new icudroid.utils.form.Step3Generator(that,settings.layout,settings.steper,settings.data);
        }
    };

    /**
     * Initialisation des errors provenants du serveur
     */
    var initErrors = function(){
        if(settings.errors!=null){
            for (var err in settings.errors){
                forms[err].error(settings.errors[err]);
            }
        }
    };


    /**
     * Permet de setter les objects complexe exemple :
     *
     *
     * test : {
     *  f1 : '1'
     * }
     *
     * donc la dataUrl sera test.f1
     *
     * @param dataUrl
     * @param val
     * @returns {*}
     */
    var createDataUrl = function(dataUrl,val){
        var indexOfDot = dataUrl.lastIndexOf(".");
        var indexOfArray = dataUrl.lastIndexOf("]");

        var indexOf = Math.max(indexOfDot,indexOfArray);

        if(indexOf==-1){
            return val;
        }else{
            if(indexOf == indexOfDot){
                var obj = {};
                obj[dataUrl.substring(indexOf+1)] = val;
                return createDataUrl(dataUrl.substring(0,indexOf),obj);
            }else{
                var obj = [];
                var index = dataUrl.substring(dataUrl.lastIndexOf("[")+1,indexOf);
                obj[index]= val;
                return createDataUrl(dataUrl.substring(0,dataUrl.lastIndexOf("[")),obj);
            }
        }
    };

/*    var createDataUrl = function(dataUrl,val){
        var indexOfDot = dataUrl.lastIndexOf(".");
        var indexOfArray = dataUrl.lastIndexOf("]");

        var indexOf = Math.max(indexOfDot,indexOfArray);

        if(indexOf==-1){
            return val;
        }else{
            if(indexOf == indexOfDot){
                var obj = {};
                obj[dataUrl.substring(indexOf+1)] = val;
                return createDataUrl(dataUrl.substring(0,indexOf),obj);
            }else{
                var obj = [];

            }

        }
    };*/


    /**
     * Pour un chargement de donnée après l'affichage du formulaire
     * @param data
     * @private
     */
    var _setData = function(data){
        settings.data = data;
        for (var formObject in forms){
            forms[formObject].value(getData(settings.data,formObject));
        }
    };


    /**
     * Gére le scroll dans la modal pour ne pas dépasser la taille de l'écran
     */
    var handleModal = function(){


        var modalScrollBar = function(){
            var $modal = $container.find(".modal");

            if ($modal.hasClass("modal-scrollable")) {

                $modal.find(".modal-body").css({
                    height: '',
                    overflow:''
                });

                var windowHeight =$( window ).height();
                var $modalDialog = $modal.find(".modal-dialog");

                var marginTop = parseInt($modalDialog.css('margin-top'));
                var marginBottom = parseInt($modalDialog.css('margin-bottom'));

                var modalHeight = parseInt($modalDialog.css('height')) + marginTop + marginBottom;

                if(modalHeight>windowHeight){

                    var $modalHeader = $modal.find(".modal-header");
                    var $modalFooter = $modal.find(".modal-footer");

                    var modalHeaderHeight = 0;
                    if($modalHeader.length>0){
                        modalHeaderHeight = parseInt($modalHeader.css('height'));
                    }

                    var modalFooterHeight =0;
                    if($modalFooter.length>0){
                        modalFooterHeight = parseInt($modalFooter.css('height'));
                    }

                    $modal.find(".modal-body").css({
                        height: windowHeight - marginTop - marginBottom - modalHeaderHeight - modalFooterHeight,
                        overflow:"auto"
                    });
                }

            }
        };

        $('body').on('shown.bs.modal', '.modal', function() {
            modalScrollBar();
        });

        $('body').on("modal-change-content",function() {
            modalScrollBar();
        });

        $( window ).resize(function() {
            modalScrollBar();
        });


    };



    initDefaultValidator();
    initFormUrl();
    initSteper();
    initComponent();
    initErrors();


    if(settings.layout instanceof icudroid.utils.form.DialogLayout){
        handleModal();
        $('body').trigger("modal-change-content");
    }


    return {
        //mettre ici les methodes public

        /**
         *
         * @param blocName
         * @returns {*}
         */
        getBlock : function(blocName){
            return that._getBlock(blocName);
        },

        /**
         *
         * @returns
         */
        getDatas : function(){
            return that._data();
        },

        /**
         *
         * @param data
         */
        setData : function(data){
            _setData(data);
        },

        /**
         * Dans le cas d'un LayoutModal pouvoir fermer la modal
         */
        closeModal : function(){
            that._closeModal();
        },

        /**
         * get les options
         */
        getOption : function(optName){
            return that._getOption(optName);
        },


        /**
         * set les options
         * @param nameOpt
         * @param val
         */
        setOption : function(nameOpt,val){
            that._setOption(nameOpt,val);
        }

    };
};


