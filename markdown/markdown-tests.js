// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by markdown.js.
import { name as packageName } from "meteor/blazeui:markdown";

// Write your tests here!
// Here is an example.
Tinytest.add('markdown - example', function (test) {
  test.equal(packageName, "markdown");
});
