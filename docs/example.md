```
      $(document).ready(function () {
            $("#Stage").ontology_search({});
            $("#Stage").ontology_search("updateOptions", {filter: ["Developmental_stage%20AND%20Homo_sapiens"]});
            $("#Tissue").ontology_search({});
            $("#Tissue").ontology_search("updateOptions", {filter: ["Multicellular_anatomical_structure"]});
            $("#Disease").ontology_search({});
            $("#Disease").ontology_search("updateOptions", {filter: ["Disease"]});
            $("#Ethnicity").ontology_search({});
            $("#Ethnicity").ontology_search("updateOptions", {filter: ["Race"]});           
            $("#Cell_type").ontology_search({});
            $("#Cell_type").ontology_search("updateOptions", {filter: ["Cell"], boost: ["Kidney"]});  
        });
```

### Developmental stage restricted to Homo sapiens 
(Stage series for other species are available (e.g. mouse)
<img width="767" alt="image" src="https://github.com/user-attachments/assets/093573c5-9ec7-40e4-a729-eeb240d7f24e">
<img width="751" alt="image" src="https://github.com/user-attachments/assets/8064460c-f08b-46f5-9f1c-683f87998ee8">

### Boost on kidney nudges boost kidney cells to the top
<img width="740" alt="image" src="https://github.com/user-attachments/assets/5de109b0-d369-4d73-b56a-7398c57eb46b">

### Non Kidney cell types still returned
<img width="757" alt="image" src="https://github.com/user-attachments/assets/05cd6fd1-bca5-49db-9144-fd9905908869">


