// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import restaurant from "./restaurant";
import dish from "./dish";
import featured from "./featured";
import category from "./category";
export default createSchema({
  name: "default",
  types: schemaTypes.concat([restaurant, dish, category, featured]),
});
