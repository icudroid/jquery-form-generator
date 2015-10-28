/**
 * Tabs Layout
 *
 * options : {
 *  active : 'tab1',
 *  tabs : {
 *      tab1 :{
 *          layout : new icudroid.utils.form.DefaultLayout(),
 *          includes : ["field1","field2","field3"],
 *          title : "onglet1"
 *      }
 *      tab2 :{
 *          layout : new icudroid.utils.form.DefaultLayout(),
 *          includes : ["field4","field5","field6"],
 *          title : "onglet3"
 *      }
 *  }
 *
 * }
 *
 * @constructor
 */
icudroid.utils.form.TabableLayout = function(options){
    icudroid.utils.form.AbstractLayout.call(this,options);

    this.layouts = {};

    //création mémoire des éléments

    this.$componentContainer = $("<div></div>")
    this.$navTabsContainer = $('<ul class="nav nav-tabs" role="tablist"></ul>');
    this.$componentContainer.append(this.$navTabsContainer);

    this.tabsContainer = $('<div class="tab-content"></div>');
    this.$componentContainer.append(this.tabsContainer);

    for (var tabName in options.tabs) {
        var tab = options.tabs[tabName];
        var $tab = $('<li role="presentation"></li>');

        var $contentContainer = $('<div role="tabpanel" class="tab-pane"></div>');
        this.tabsContainer.append($contentContainer);

        if(options.active == tabName){
            $tab.addClass("active");
            $contentContainer.addClass("active");
        }
        var $a = $('<a role="tab" data-toggle="tab"></a>');
        $a.attr('href','#'+tabName);
        $a.attr('aria-controls',tabName);
        $a.html(tab.title);
        $tab.append($a);

        this.$navTabsContainer.append($tab);

        $contentContainer.attr('id',tabName);
        this.layouts[tabName] = $contentContainer;
    }


    this.getTab = function(objectName){
        for (var tabName in this.layoutSettings.tabs) {
            var tab = this.layoutSettings.tabs[tabName];
            if($.inArray(objectName, tab.includes )!=-1){
                return tab;
            }
        }
    }

};
icudroid.utils.form.TabableLayout.prototype = $.extend({
    /**
     * Ajout l'élément au bonne emplacement
     * @param dom
     */
    append : function(dom,objectName){
        this.getTab(objectName).layout.append(dom);
    },
    /**
     * Ajout de la section
     * @param dom
     */
    appendSection : function(dom,objectName){
        this.getTab(objectName).layout.appendSection(dom);
    }



},icudroid.utils.form.AbstractLayout.prototype,{
    /**
     * Ajoute au container
     * @param dom
     */
    appendToContainer : function(dom,objectName){
        this.$container.append(dom);
    },
    /**
     *
     * @param container
     */
    build : function(container){
        this.$container = container;
        this.$container.append(this.$componentContainer);
        this.$componentContainer.tab('show');

        for (var tabName in this.layoutSettings.tabs) {
            var tab = this.layoutSettings.tabs[tabName];
            tab.layout.build(this.layouts[tabName]);
        }

    },

    appendInfo : function(dom,objectName){
        this.getTab(objectName).layout.appendInfo(dom);
    }
});