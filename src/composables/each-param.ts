import type { JsonRpcDocsObject } from '@nailyjs/rpc-docs-protocol'
import type { JSONSchema7 } from 'json-schema'
import type { SchemaTreeOption } from '~/types'

export function useEachParam(currentDoc: JsonRpcDocsObject) {
  function findSchemaObject(doc: JSONSchema7): SchemaTreeOption[] {
    return Object.entries(doc.properties || {}).map(([key, value]) => {
      return {
        label: key,
        key,
        schema: value as JSONSchema7,
        description: (value as JSONSchema7).description,
        required: (value as JSONSchema7).required,
        children: (value as JSONSchema7).type === 'object'
          ? findSchema(value as JSONSchema7)
          : undefined,
      } as SchemaTreeOption
    })
  }

  function findSchemaArray(doc: JSONSchema7): SchemaTreeOption[] {
    return (doc.items as JSONSchema7[] || []).map((item, index) => {
      return {
        label: `Item ${index}`,
        key: `Item ${index}`,
        schema: item,
        description: item.description,
      }
    })
  }

  function findSchema(doc: JSONSchema7): SchemaTreeOption[] {
    if (doc.type === 'object')
      return findSchemaObject(doc)
    else if (doc.type === 'array')
      return findSchemaArray(doc)
    else return []
  }

  function findParams(doc: JsonRpcDocsObject): SchemaTreeOption[] {
    return (doc.params || []).map((param, index) => ({
      label: param.name || `Param ${index}`,
      key: param.name || `Param ${index}`,
      ...param,
      children: param.schema?.type === 'object'
        ? findSchema(param.schema)
        : undefined,
    } as SchemaTreeOption))
  }

  return findParams(currentDoc)
}
