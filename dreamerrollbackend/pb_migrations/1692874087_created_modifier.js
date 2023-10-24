/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "m0la8tgm8lc32ya",
    "created": "2023-08-24 10:48:07.530Z",
    "updated": "2023-08-24 10:48:07.530Z",
    "name": "modifier",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kjjx6lb8",
        "name": "modifiername",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "2rwnow2r",
        "name": "modifiernumber",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("m0la8tgm8lc32ya");

  return dao.deleteCollection(collection);
})
