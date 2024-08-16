# Ontology Search Widget

The Ontology Search Widget provides an easy-to-integrate search interface for ontologies, compatible with the OBASK Ontology Search Endpoint. Utilizing HTML, CSS, jQuery, and typeahead.js, this widget offers a highly configurable and customizable experience for embedding ontology search functionalities into web applications.

<p align="center">
    <img src="img/screenshot.png" alt="Ontology Search Widget" width="500"/>
</p>

## Features

- **Auto-Completion**: Suggests possible ontology terms as you type, enhancing user experience.
- **Customizable Options**: Easily configure default settings or provide dynamic updates to suit your needs.
- **Compatibility**: Works seamlessly with any web application using basic web technologies.

## Getting Started

### Prerequisites

Ensure you have jQuery and typeahead.js included in your project to use the Ontology Search Widget.

### Installation

To integrate the Ontology Search Widget into your webpage, follow these steps:

1. Include the widget's JavaScript and CSS files in your project.
2. Use the following script to convert an `input` element into an ontology search box:

    ```javascript
    $("#txtbox1").ontology_search();
    ```

### Usage

Here is a simple example to get you started:

```html
<!-- Index.html -->
<html>
<head>
    <!-- Include dependencies -->
    <script src="path/to/jquery.min.js"></script>
    <script src="path/to/typeahead.bundle.js"></script>
    <script src="path/to/ontology_search_widget.js"></script>
</head>
<body>
    <input id="txtbox1" type="text" placeholder="Search">
    <script>
        // Initialize the search widget
        $("#txtbox1").ontology_search();
    </script>
</body>
</html>
```

Check [index.html](index.html) for a simple running example.

### Configuration

By default, the widget uses the following configuration:

```javascript
options: {
    endpoint: "https://cellular-semantics.sanger.ac.uk/ontology",
    filter: [],
    boost: [],
}
```

#### Custom Configuration

Pass custom configurations while calling the widget factory method:

```javascript
$("#txtbox1").ontology_search({
    endpoint: "http://localhost:8007/ontology",
    boost: ["Cell", "Homo_sapiens"],
});
```

#### Dynamic Configuration Update

Update configurations dynamically at runtime:

```javascript
$("#txtbox1").ontology_search("updateOptions", {filter: ["Cell"]});
```

## Development Environment

Set up your development environment following the steps provided in the [development documentation](development.md).

## License

This project is licensed under the Apache-2.0 - see the [LICENSE.md](LICENSE.md) file for details.

## Support

For support, please open an issue in the repository or contact the project maintainers.