import type { JsonRpcDoc } from '@nailyjs/rpc-docs-protocol'

export const RpcDocsDemo: JsonRpcDoc = {
  jsonrpc: '2.0',
  tags: [],
  docs: {
    'WelcomeServer.welcome': {
      params: [],
      summary: 'Welcome `XXXXXXXXXXXXXXXXXXXXX`',
      tags: ['Welcome'],
      description: 'A simple method that returns a welcome `message`.',
      result: {
        description: 'A welcome message.',
        schema: {
          type: 'string',
        },
      },
    },
    'WelcomeServer.add': {
      params: [
        {
          name: 'a',
          description: 'First number.',
          required: true,
          schema: {
            type: 'object',
            properties: {
              testProperty: {
                type: 'string',
                description: 'Test property. It is a `string`.',
              },
              testArrayProperty: {
                type: 'array',
                items: [
                  {
                    type: 'string',
                    description: 'Test array item. It is a `string`.',
                  },
                  {
                    type: 'number',
                    description: 'Test array item. It is a `number`.',
                  },
                ],
              },
            },
          },
        },
        {
          name: 'b',
          description: 'Second number.',
          required: true,
          schema: {
            type: 'number',
          },
        },
      ],
      summary: 'Add',
      description: 'A simple method that adds two numbers.',
      tags: ['Welcome2'],
      result: {
        description: 'The sum of two numbers.',
        schema: {
          type: 'number',
        },
      },
    },
  },
}
