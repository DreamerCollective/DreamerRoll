migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a5u3n8egnf7uqhl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oghzmayg",
    "name": "die",
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
    "id": "mcgdrrwh",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a5u3n8egnf7uqhl")

  // remove
  collection.schema.removeField("oghzmayg")

  // remove
  collection.schema.removeField("mcgdrrwh")

  return dao.saveCollection(collection)
})
