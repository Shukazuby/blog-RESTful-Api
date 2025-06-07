// import OpenAI from 'openai';
// import { WriteDto } from './dto/dtos';

// export class AiService {
//   private openai: OpenAI;

//   constructor() {
//     this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//   }

//   async rewriteMessage(payload: WriteDto): Promise<string> {
//     const response = await this.openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: 'Rewrite the following in a professional tone.',
//         },
//         { role: 'user', content: payload.text },
//       ],
//     });
//     return response.choices[0].message.content.trim();
//   }

//   async autocompleteReply(partial: string): Promise<string> {
//     const response = await this.openai.chat.completions.create({
//       model: 'gpt-4',
//       messages: [
//         { role: 'system', content: 'Complete this customer service message.' },
//         { role: 'user', content: partial },
//       ],
//     });
//     return response.choices[0].message.content.trim();
//   }

//   async handleInquiry(message: string): Promise<string> {
//     const response = await this.openai.chat.completions.create({
//       model: 'gpt-4',
//       messages: [
//         {
//           role: 'system',
//           content: 'You are a helpful customer service representative.',
//         },
//         { role: 'user', content: message },
//       ],
//     });
//     return response.choices[0].message.content.trim();
//   }
// }


import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { WriteDto } from './dto/dtos';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

constructor() {
    // Ensure GEMINI_API_KEY is correctly set in your environment variables.
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async rewriteMessage(payload: WriteDto): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    try {
      const result = await model.generateContent([
        `Transform the following message into formal business communication. It should be professional, objective, and polite, suitable for a corporate environment. Avoid contractions and informal expressions:\n${payload.text}`,
      ]);
      return result.response.text();
    } catch (error) {
      console.error('Error rewriting message:', error);
      throw new Error('Failed to rewrite message.');
    }
  }

  async autocompleteReply(payload: WriteDto): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    try {
      const result = await model.generateContent([`"Acting as an intelligent assistant, complete the following message in a professional and concise manner, ensuring it aligns with common business communication practices:\n${payload.text}"
`]);
      return result.response.text();
    } catch (error) {
      console.error('Error auto-completing reply:', error);
      throw new Error('Failed to autocomplete reply.');
    }
  }

  async handleInquiry(payload: WriteDto): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    try {
      const result = await model.generateContent([
        `You are a knowledgeable and professional customer service AI assistant. Provide a precise and comprehensive response to the following inquiry. Focus on delivering accurate information clearly and concisely, while maintaining a helpful and courteous tone:\n${payload.text}`,
      ]);
      return result.response.text();
    } catch (error) {
      console.error('Error handling inquiry:', error);
      throw new Error('Failed to handle inquiry.');
    }
  }
}
