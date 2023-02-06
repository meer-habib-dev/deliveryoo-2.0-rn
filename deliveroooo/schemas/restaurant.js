export default {
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Restaurant Name",
      type: "string",
      Validition: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      title: "Short Description",
      type: "string",
      Validition: (Rule) => Rule.max(200),
    },
    {
      name: "image",
      title: "Image of restaurant",
      type: "image",
    },
    {
      name: "lat",
      title: "Latitude of restaurant",
      type: "number",
    },
    {
      name: "long",
      title: "Longitude of restaurant",
      type: "number",
    },
    {
      name: "address",
      title: "Restaurant Address",
      type: "string",
      Validition: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      title: "Enter a rating from (1-5 stars)",
      type: "number",
      Validition: (Rule) =>
        Rule.requried()
          .min(1)
          .max(5)
          .error("Please enter a value between 1 and 5"),
    },
    {
      name: "type",
      title: "Category",
      type: "string",
      Validition: (Rule) => Rule.required(),
      type: "reference",
      to: [{ type: "category" }],
      // of: [{ type: "reference", to: [{ type: "category" }] }],
    },
    {
      name: "dishes",
      title: "Dishes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "dish" }] }],
    },
  ],
};
