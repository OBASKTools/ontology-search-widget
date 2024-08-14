$.widget("sanger.ontology_search", {
    // default options
    options: {
        endpoint: "https://cellular-semantics.sanger.ac.uk/ontology"
    },
    _create: function () {
        $(this.element).addClass("typeahead");
        $(this.element).addClass("search-box");
        endpoint = this.options.endpoint;
        // append trailing slash if not present
        if (endpoint.slice(-1) !== "/") {
            endpoint = endpoint + "/";
        } 

        my_obj_tokenizer = this._getObjTokenizer();
        self = this;
        var typeaheadBH = new Bloodhound({
        // datumTokenizer: my_obj_tokenizer(['cell_label', 'cell_set_accession']),
        datumTokenizer: datum => Bloodhound.tokenizers.whitespace(datum.value),
        queryTokenizer: Bloodhound.tokenizers.nonword,
        identify: function(t) {
            return t.id
        },
        remote: {
            url: endpoint + "api/suggest?query=%QUERY",
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
                    toRender = self._renderResult(t);
                    console.log(toRender);
                    return toRender;
                }
            }
            // templates: function(t) {
            //     toRender = this._renderResult(t);
            //     console.log(toRender);
            //     return toRender;
            // }
        });
    },
    _getObjTokenizer: function () {
        return function setKey(keys) {
          keys = Array.isArray(keys) ? keys : [].slice.call(arguments, 0);
    
          return function tokenize(o) {
            var tokens = [];
            keys.forEach(function(k) {
              tokens = tokens.concat(this._customNonwordTokenizer(String(o[k])));
            });
            return tokens;
          };
        };
    },
    _customNonwordTokenizer: function (str) {
        str = String(str);
        return str ? str.split(/[^a-zA-Z0-9]+/) : [];
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