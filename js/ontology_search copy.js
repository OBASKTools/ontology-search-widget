$.widget("sanger.ontology_search", {
    // default options
    options: {
        myvalue: 0
    },
    _create: function () {
        $(this.element).val(this.options.myvalue);
        $(this.element).addClass("my-widget-input")
        this._on(this.element, {
            "focus": function (event) {
                // console.log({ event });
                var input_position = $(event.target).offset();
                var targetHeight = $(event.target).height() + 6;
                var targetWidth = ($(event.target).width() - 2);

                this._generateHtml();
                // console.log({ input_position });
                $("#my-widget").css({ //widget move
                    'top': (input_position.top + targetHeight) + 'px',
                    'left': (input_position.left) + 'px'
                });
                $("#my-widget").fadeIn();

                $("#my-widget .my-widget-value").html(this.options.myvalue);
            }
        });

        $(document).on("mousedown", this._hideWidget);

    },
    _generateHtml: function () {
        $("#my-widget").remove();
        $("body").append('<div id="my-widget">' +
            '<button type="button" class="btn btn-info my-widget-minus">-</button>' +
            '<p class="my-widget-value"></p>' +
            '<button type="button" class="btn btn-info my-widget-plus">+</button>' +
            '</div>');

        var that = this;
        // $("#my-widget .my-widget-plus").off("click");
        // $("#my-widget .my-widget-minus").off("click");

        $("#my-widget .my-widget-plus").on("click", function () {
            that.options.myvalue++;
            $(that.element).val(that.options.myvalue);
            $("#my-widget .my-widget-value").html(that.options.myvalue);
        });

        $("#my-widget .my-widget-minus").on("click", function () {
            that.options.myvalue--;
            $(that.element).val(that.options.myvalue);
            $("#my-widget .my-widget-value").html(that.options.myvalue);
        });
    },
    _hideWidget: function () {
        var $target = $(event.target);
        if (!$target.closest("#my-widget").length && !$target.hasClass("my-widget-input")) {
            $("#my-widget").fadeOut();
        }
    },
    _setOption: function (key, value) {
        if (key === "value") {
            value = this._constrain(value);
        }
        this._super(key, value);
    },
    _setOptions: function (options) {
        this._super(options);
        // this.refresh();
    },
});