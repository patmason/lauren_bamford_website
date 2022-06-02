export default {
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "client",
      title: "Client",
      type: "string",
    },
    {
      name: "projectInfo",
      title: "Project Info",
      type: "text",
    },
    {
      name: "credits",
      title: "Credits",
      type: "array",
      of: [{ type: "string" }],
    },
    //order-documents plugin
    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
  ],
};
