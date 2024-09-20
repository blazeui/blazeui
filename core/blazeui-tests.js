// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by blazeui.js.
import { name as packageName } from "meteor/jkuester:blazeui";

// Write your tests here!
// Here is an example.
Tinytest.add('blazeui - example', function (test) {
  test.equal(packageName, "blazeui");
});
