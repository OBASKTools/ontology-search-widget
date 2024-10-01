$.widget("sanger.ontology_search", {
    // default options
    options: {
        endpoint: "https://cellular-semantics.sanger.ac.uk/demo",
        filter: [],
        boost: [],
    },
    _create: function () {
        // destroy existing typeahead configuration
        $(this.element).typeahead('destroy');
        $(this.element).addClass("typeahead");
        $(this.element).addClass("search-box");
        endpoint = this.options.endpoint;
        // append trailing slash if not present
        if (endpoint.slice(-1) !== "/") {
            endpoint = endpoint + "/";
        } 
        filter_qparam="";
        if (this.options.filter.length > 0) {
            filter_qparam = this.options.filter.map(item => `&filter=${item}`).join("")
        }
        boost_qparam="";
        if (this.options.boost.length > 0) {
            boost_qparam = this.options.boost.map(item => `&boost=${item}`).join("")
        }
        self = this;
        var typeaheadBH = new Bloodhound({
        datumTokenizer: datum => Bloodhound.tokenizers.whitespace(datum.value),
        queryTokenizer: Bloodhound.tokenizers.nonword,
        identify: function(t) {
            return t.id
        },
        remote: {
            url: endpoint + "api/suggest?query=%QUERY"+filter_qparam+boost_qparam,
            wildcard: "%QUERY",
            transform: function(t) {
                return self._transformResults(t);
            }
        }
        });
        typeaheadBH.initialize();

        $(this.element).typeahead({
            highlight: true, 
            minLength: 1
        },
        {
            name: 'autocomplete',
            source: typeaheadBH,
            display: 'value',
            templates: {
                suggestion: function(t) {
                    return self._renderResult(t);
                }
            }
        });
    },
    updateOptions: function (options) {
        if (!("endpoint" in options)) {
            options.endpoint = this.options.endpoint;
        }
        if (!("filter" in options)) {
            options.filter = [];
        } else if (typeof options.filter === "string") {
            options.filter = [options.filter];
        }
        if (!("boost" in options)) {
            options.boost = [];
        } else if (typeof options.boost === "string") {
            options.boost = [options.boost];
        }
        this.options = options;
        this._setOptions(options);
        this._create();  // re-create the typeahead with new options
    },
    _transformResults: function (t) {
        console.log(t);
        var search_term = t.responseHeader.params.q;
        refined_result = jQuery.map(t.response.docs, function(o) {
            var id = o.id,
                lbl = o.label[0],
                syn = "",
                r = !0;
            void 0 != t.highlighting[id].label_autosuggest ? (lbl = t.highlighting[id].label_autosuggest[0], r = !1) : void 0 != t.highlighting[id].label && (lbl = t.highlighting[id].label[0], r = !1), r && (void 0 != t.highlighting[id].synonym_hasExactSynonym_autosuggest_e ? syn = t.highlighting[id].synonym_hasExactSynonym_autosuggest_e[0] : void 0 != t.highlighting[id].synonym && (syn = t.highlighting[id].synonym[0]));
            var s = o.obo_id[0];
            return void 0 == s && (s = o.short_form[0]), {
                id: id,
               // display label of the selected element
                value: o.label[0],
                data: {
                    ontology: o.ontology_name,
                    prefix: o.ontology_prefix,
                    iri: o.iri[0],
                    label: lbl,
                    synonym: syn,
                    shortForm: s,
                    type: o.type
                },
                query: search_term
            }
        })
        console.log(refined_result);
        return refined_result;
    },
    _renderResult: function (result) {
        var lbl = result.data.label,
            syn = "";
        "" != result.data.synonym && (lbl = result.data.synonym, syn = "<div class='sub-text'>synonym for " + result.value + "</div>");
        var a = "<div class='term-source'>" + result.data.shortForm + "</div>";
        return "<div style='width: 93%; display: table;'> <div style='display: table-row'><div  style='display: table-cell;' class='ontology-suggest'><div class='suggestion-value'>" + lbl + "</div>" + syn + "</div><div style='vertical-align:middle; text-align: right; width:60px; display: table-cell;'>" + a + "</div></div></div>"     
    },
});