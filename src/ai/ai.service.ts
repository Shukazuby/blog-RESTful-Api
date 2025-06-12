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
        `You are a sharp, professional, and respectful customer service representative. Craft a concise and straightforward reply to the following message. Keep it brief while maintaining clarity and courtesy. Not in an email format, let it be straight foward. Here is the message:\n${payload.text}`,
      ]);
      return result.response.text();
    } catch (error) {
      console.error('Error handling inquiry:', error);
      throw new Error('Failed to handle inquiry.');
    }
  }

  async editor(payload: WriteDto): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
You are a skilled human editor. Your task is to refine the following story or novel text by completely removing all em dashes. 
You must rewrite the content so it flows smoothly, sounds natural, and reads authentically—without any indication that it was edited by AI. 
Maintain the original tone, meaning, and emotional resonance while enhancing readability.

Here is the text:
${payload.text}
  `.trim();

    try {
      const result = await model.generateContent([prompt]);
      return result.response.text();
    } catch (error) {
      console.error('Error editing content:', error);
      throw new Error('Unable to edit the content.');
    }
  }

  async chatbot(payload: WriteDto): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
    You are a highly capable and adaptive AI assistant. You can function as a writer, marketer, or software developer (backend, frontend, or mobile). 
    You provide expert, personalized help based on the user's needs. 

    Here is the user's request:
    ${payload.text}
    `.trim();

    try {
      const result = await model.generateContent([prompt]);
      return result.response.text();
    } catch (error) {
      console.error('Error generating chatbot response:', error);
      throw new Error('Unable to generate chatbot response.');
    }
  }
}
