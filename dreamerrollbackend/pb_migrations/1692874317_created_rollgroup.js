/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "gb4kuxc707zd2to",
    "created": "2023-08-24 10:51:57.433Z",
    "updated": "2023-08-24 10:51:57.433Z",
    "name": "rollgroup",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rdwebsc0",
        "name": "rollgroupname",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "kicmv5il",
        "name": "rolls",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "fzbqjui3tpndk6g",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("gb4kuxc707zd2to");

  return dao.deleteCollection(collection);
})
