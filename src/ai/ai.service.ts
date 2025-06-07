import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { WriteDto } from './dto/dtos';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async rewriteMessage(payload: WriteDto): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    try {
      const result = await model.generateContent([
        `You are a professional and efficient customer service agent. Rewrite the following message in a clear, respectful, and direct tone. Keep it short and simple. Do not provide multiple versions or options. Do not alter the tone beyond clarity and conciseness. Always regenerate the response, even if it appears identical to a previous one. Here is the message:\n${payload.text}`,
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
      const result = await model.generateContent([
        `Acting as an intelligent assistant, complete the following message in a professional and concise manner, ensuring it aligns with common business communication practices:\n${payload.text}"
`,
      ]);
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
        `You are a sharp, professional, and respectful customer service representative. Craft a concise and straightforward reply to the following message. Keep it brief while maintaining clarity and courtesy. Here is the message:\n${payload.text}`,
      ]);
      return result.response.text();
    } catch (error) {
      console.error('Error handling inquiry:', error);
      throw new Error('Failed to handle inquiry.');
    }
  }
}
