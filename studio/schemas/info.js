export default {
  name: "info",
  title: "Info",
  type: "document",
  fields: [
    {
      name: "about",
      title: "About",
      type: "text",
    },
    {
      name: "selectClients",
      title: "Select Clients",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "agents",
      title: "Agents",
      type: "array",
      of: [{ type: "agent" }],
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "emailAddress",
      title: "Email Address",
      type: "string",
    },
    {
      name: "instagram",
      title: "Instagram Link",
      type: "string",
    },
  ],
};
