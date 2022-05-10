import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Info")
        .child(
          S.document()
            .schemaType("info")
            .documentId("info")
            .title("Enter your details")
        ),
      // Add a visual divider (optional)
      S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter(
        (listItem) => !["info"].includes(listItem.getId())
      ),
    ]);
