/**
 * DialogLayout
 *
 * options :
 * title : titre
 * closeBtn : /affichage de la croix pour fermer la modal par defaut on l'affiche
 * modalType : taille de la modal : par defaut taille standard à bootstrap
 *      valeur possible : modal-sm|modal-lg|modal-full (small large full)
 * bodyLayout : layout du corp de la modal par defaut DefaultLayout
 *  Par exemple si l'on veut afficher le formulaire sur deux colonnes on utiliser new icudroid.utils.form.TabLayout(2)
 *
 *
 * @constructor
 */
icudroid.utils.form.DialogLayout = function(options){
    icudroid.utils.form.AbstractLayout.call(this,options);

    /**
     * Default settings
     */
    var settings = {
        title : null,
        closeLabel : 'Fermer',
        closeBtn : true, //affichage de la croix pour fermer la modal
        modalType : '',// modal-sm|modal-lg|modal-full
        bodyLayout : new icudroid.utils.form.DefaultLayout()
    };

    settings = $.extend(settings, options);

    this.$modalContainer = $('<div class="modal modal-scrollable fade"></div>');
    this.$modalDialog = $('<div class="modal-dialog"></div>').addClass(settings.modalType);
    this.$modalContent = $('<div class="modal-content"></div>');
    this.$modalHeader = $('<div class="modal-header"></div>');

    this.$modalHeaderBtnClose = $('<button type="button" class="close" data-dismiss="modal" aria-label="Fermer"><span aria-hidden="true">&times;</span></button>');
    this.$modalHeaderBtnClose.attr("aria-label",settings.closeLabel);

    this.$modalHeaderTitle = $('<h4 class="modal-title"></h4>');


    if(settings.closeBtn){
        this.$modalHeader.append(this.$modalHeaderBtnClose);
    }


    if(settings.title!=null){
        this.$modalHeaderTitle.html(settings.title);
        this.$modalHeader.append(this.$modalHeaderTitle);
    }

    this.$modalBody = $('<div class="modal-body"></div>');
    this.$modalFooter = $('<div class="modal-footer"></div>');

    this.$modalDefaultCloseBtn = $('<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>')
    this.$modalDefaultCloseBtn.html(settings.closeLabel);

    this.$modalContainer.append(this.$modalDialog);
    this.$modalDialog.append(this.$modalContent);
    this.$modalContent.append(this.$modalHeader).append(this.$modalBody).append(this.$modalFooter);

    settings.bodyLayout.build(this.$modalBody);


    /**
     *
     * @param dom
     * @private
     */
    this._append = function(dom,objectName){
        settings.bodyLayout.append(dom,objectName);
    };


    /**
     *
     * @param dom
     * @private
     */
    this._appendSection = function(dom,objectName){
        settings.bodyLayout.append(dom,objectName);
    };



};
icudroid.utils.form.DialogLayout.prototype = $.extend({

        /**
         * set title
         * @param title
         */
        title : function(title){
            this.$modalHeaderTitle.html(title);
            if(this.$modalHeader.find("h4.modal-title").length==0){
                this.$modalHeader.append(this.$modalHeaderTitle);
            }
        },

        /**
         * Ajout l'élément au bonne emplacement
         * @param dom
         */
        append : function(dom,objectName){
            this._append(dom,objectName);
        },
        /**
         * Ajout de la section
         * @param dom
         */
        appendSection : function(dom,objectName){
            this._appendSection(dom,objectName);
        },


        /**
         * Fermeture de la modal
         */
        close : function(){
            this.$modalContainer.modal("hide");
        }



    },icudroid.utils.form.AbstractLayout.prototype,{
        /**
         * Ajoute au container
         * @param dom
         */
        appendToContainer : function(dom){
            this.$container.append(dom);
        },
        /**
         *
         * @param container
         */
        build : function(container){
            var that = this;
            this.$container = container;
            this.$container.append(this.$modalContainer);

            this.$modalContainer.on('hidden.bs.modal', function (e) {
                that.$container.remove();
            }).modal({backdrop: 'static'});

        },
        /**
         *
         * @param dom
         */
        appendBarAction : function(dom){
            this.$modalFooter.append(dom);
        },

        appendInfo : function(dom,objectName){
            this.$modalBody.append(dom);
        }
    }
);