// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by components.js.
import { name as packageName } from "meteor/blazeui:components";

// Write your tests here!
// Here is an example.
Tinytest.add('components - example', function (test) {
  test.equal(packageName, "components");
});
