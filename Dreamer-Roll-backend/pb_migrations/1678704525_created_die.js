migrate((db) => {
  const collection = new Collection({
    "id": "6eqg8svb4bvgktm",
    "created": "2023-03-13 10:48:45.236Z",
    "updated": "2023-03-13 10:48:45.236Z",
    "name": "die",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yoi9ocu6",
        "name": "rollrange",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": null
        }
      },
      {
        "system": false,
        "id": "i1gznbkk",
        "name": "rawresult",
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
  const collection = dao.findCollectionByNameOrId("6eqg8svb4bvgktm");

  return dao.deleteCollection(collection);
})
