/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fzbqjui3tpndk6g",
    "created": "2023-08-24 10:50:56.828Z",
    "updated": "2023-08-24 10:50:56.828Z",
    "name": "roll",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6fmlh7wu",
        "name": "rollname",
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
        "id": "5pm5awvg",
        "name": "rolldies",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "7t3zsino4r02kki",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "enxfhteb",
        "name": "rollmodifiers",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "m0la8tgm8lc32ya",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "uknvnmeb",
        "name": "result",
        "type": "number",
        "required": false,
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
  const collection = dao.findCollectionByNameOrId("fzbqjui3tpndk6g");

  return dao.deleteCollection(collection);
})
