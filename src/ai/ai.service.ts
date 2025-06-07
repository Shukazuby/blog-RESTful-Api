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
        `Act as a professional and efficient customer service representative. Rewrite the following message to be clear, respectful, and direct. Keep the tone smart, courteous, and the message as straightforward as possible. Here is the message:\n${payload.text}`,
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
