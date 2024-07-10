import OpenAI from 'openai';
import { getHealthRecordsByUserId, getMedicationsByUserId, getPhysicalRecords } from './Health.js';

const openAI = new OpenAI({ apiKey: "" });

async function getHealthAI(context, userId) {
  const initialContext = [
    {
      role: 'system',
      content: 'You are a health assistant and help users with their health records, medications, and physical records. A user ID will always be provided to you as user_id.'
    },
    {
      role: 'user',
      content: `User ID: ${userId}`
    },
    ...context
  ];

  const response = await callOpenAIWithTools(initialContext, userId);
  return response;
}

async function callOpenAIWithTools(context, userId) {
  const response = await openAI.chat.completions.create({
    model: 'gpt-4',
    messages: context,
    functions: [
      {
        name: 'getMedications',
        description: 'Fetch medications for a user',
        parameters: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'User ID' }
          },
          required: ['userId']
        }
      },
      {
        name: 'getHealthRecords',
        description: 'Fetch health records for a user',
        parameters: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'User ID' }
          },
          required: ['userId']
        }
      },
      {
        name: 'getPhysicalRecords',
        description: 'Fetch physical records for a user',
        parameters: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'User ID' }
          },
          required: ['userId']
        }
      }
    ]
  });

  const willInvokeFunction = response.choices[0].finish_reason === 'function_call';
  const functionCall = response.choices[0].message.function_call;

  if (willInvokeFunction && functionCall) {
    const { name, arguments: rawArguments } = functionCall;
    const parsedArguments = JSON.parse(rawArguments);

    if (name === 'getMedications') {
      const medications = await getMedicationsByUserId(parsedArguments.userId);
      const toolResponse = `Here are the medications:\n${JSON.stringify(medications, null, 2)}`;

      context.push(response.choices[0].message);
      context.push({
        role: 'function',
        name: 'getMedications',
        content: toolResponse
      });

    } else if (name === 'getHealthRecords') {
      const healthRecords = await getHealthRecordsByUserId(parsedArguments.userId);
      const toolResponse = `Here are the health records:\n${JSON.stringify(healthRecords, null, 2)}`;

      context.push(response.choices[0].message);
      context.push({
        role: 'function',
        name: 'getHealthRecords',
        content: toolResponse
      });

    } else if (name === 'getPhysicalRecords') {
      const physicalRecords = await getPhysicalRecords(parsedArguments.userId);
      const toolResponse = `Here are the physical records:\n${JSON.stringify(physicalRecords, null, 2)}`;

      context.push(response.choices[0].message);
      context.push({
        role: 'function',
        name: 'getPhysicalRecords',
        content: toolResponse
      });
    }
  }

  const secondResponse = await openAI.chat.completions.create({
    model: 'gpt-4',
    messages: context
  });

  return secondResponse.choices[0].message;
}

export {
  getHealthAI
};
