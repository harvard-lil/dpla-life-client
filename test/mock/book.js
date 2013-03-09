define(['underscore'], function(_) {
  return function(attributes) {
    return _.extend({
      source_id: "book-0",
      title: "Voluptates Aut Suscipit",
      publisher: "Autem Sed Publishing, Et Similique Publishing",
      creator: "Buckridge, Camila",
      description: "Laborum non provident. Et repellendus quae eum eveniet aut nemo non. Quisquam quia sed aspernatur rerum adipisci quis sequi. Qui voluptatibus corrupti quis praesentium voluptate debitis.",
      source_url: "http://source.example.org"
    }, attributes);
  };
});