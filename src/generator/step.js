icudroid.utils.form.Step3Generator = function(form,layout,stepOptions,data){

    this.form = form;

    var settings = {
        current : 0,
        additionClass : '',
        steps : []
        /*
         exemple : [
         {
         title : 'Mon titre',
         href : '/step1'
         }

         ]
         */
    };

    settings = $.extend(settings, stepOptions);


    var ul = $('<ul class="steps"></ul>').addClass(settings.additionClass);
    var nb = settings.steps.length;


    for (var i = 0; i < settings.steps.length; i++) {
        var step = settings.steps[i];
        var li = $("<li></li>");
        var stepIndex = i+1;

        var stepNumber =  $('<span class="step"></span>').html(stepIndex);
        var stepTile =  $('<span class="title"></span>').html(step.title);

        if(stepIndex>settings.current){
            li.append(stepNumber).append(stepTile);
        }else  if(settings.current==stepIndex  && nb!=stepIndex){
            li.addClass("active")
            li.append(stepNumber).append(stepTile);
        }else if(stepIndex<nb) {
            li.addClass("complete")
            var $a = $('<a>').append(stepNumber).append(stepTile);
            if(typeof step.href != "undefined"){
                $a.attr('href', icudroid.utils.form.findToken(step.href,data));
            }

            li.append($a);
            if(typeof step.click != "undefined"){
                $a.bind("click",this.form,step.click);
            }

        }else{
            li.addClass("complete");
            li.append(stepNumber).append(stepTile);
        }

        ul.append(li);

    }

    var hr = $("<hr/>")


    layout.append(ul);
    layout.append(hr);


};