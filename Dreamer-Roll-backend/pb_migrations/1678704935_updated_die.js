migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6eqg8svb4bvgktm")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yoi9ocu6",
    "name": "diefaces",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6eqg8svb4bvgktm")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
