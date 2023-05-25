migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6eqg8svb4bvgktm")

  // remove
  collection.schema.removeField("vamikl6z")

  // remove
  collection.schema.removeField("6aj9iglk")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6eqg8svb4bvgktm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vamikl6z",
    "name": "dice",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "6eqg8svb4bvgktm",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6aj9iglk",
    "name": "modifier",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "ioknwh2j3i84h8m",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
