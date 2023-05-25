migrate((db) => {
  const collection = new Collection({
    "id": "a5u3n8egnf7uqhl",
    "created": "2023-03-13 10:47:04.861Z",
    "updated": "2023-03-13 10:47:04.861Z",
    "name": "roll",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "j0i2wwfz",
        "name": "result",
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
  const collection = dao.findCollectionByNameOrId("a5u3n8egnf7uqhl");

  return dao.deleteCollection(collection);
})
