/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "7t3zsino4r02kki",
    "created": "2023-08-24 10:49:02.850Z",
    "updated": "2023-08-24 10:49:02.850Z",
    "name": "die",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "amw6yjjx",
        "name": "diename",
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
        "id": "pp5c8vey",
        "name": "diefaces",
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
  const collection = dao.findCollectionByNameOrId("7t3zsino4r02kki");

  return dao.deleteCollection(collection);
})
