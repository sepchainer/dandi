import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// Define schema for structured output
const schema = z.object({
  summary: z.string().describe("A concise summary of the GitHub repository"),
  cool_facts: z.array(z.string()).describe("A list of interesting facts about the repository")
});

export async function summarizeReadme(readmeContent: string) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }

  const schemaString = JSON.stringify(zodToJsonSchema(schema));
  
  const promptTemplate = new PromptTemplate({
    template: "Summarize this github repository from this readme file content:\n{readme}\n\n{schema}\n\nReturn your response in valid JSON format matching the schema above.",
    inputVariables: ["readme", "schema"]
  });

  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY
  });

  const outputParser = StructuredOutputParser.fromZodSchema(schema);

  const chain = RunnableSequence.from([
    promptTemplate,
    model,
    outputParser
  ]);

  try {
    const response = await chain.invoke({
      readme: readmeContent,
      schema: schemaString
    });
    return response;
  } catch (error: any) {
    if (error.message?.includes('quota') || error.message?.includes('429')) {
      throw new Error('OpenAI API quota exceeded. Please check your billing status at https://platform.openai.com/account/usage');
    }
    throw error;
  }
} 