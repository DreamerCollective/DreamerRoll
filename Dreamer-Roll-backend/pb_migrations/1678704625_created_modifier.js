migrate((db) => {
  const collection = new Collection({
    "id": "ioknwh2j3i84h8m",
    "created": "2023-03-13 10:50:25.887Z",
    "updated": "2023-03-13 10:50:25.887Z",
    "name": "modifier",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "l76eteor",
        "name": "modifiername",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "jj8uuiu2",
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
  const collection = dao.findCollectionByNameOrId("ioknwh2j3i84h8m");

  return dao.deleteCollection(collection);
})
