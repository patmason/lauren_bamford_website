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
      type: "string",
    },
    {
      name: "credits",
      title: "Credits",
      type: "string",
    },
  ],
};
