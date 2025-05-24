import {
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './entities/contact.entity';
import { sendContactEmail } from 'src/Email/contact';


@Injectable()
export class ContactService {
    private readonly logger = new Logger(ContactService.name);
  
    constructor(
      @InjectModel(Contact.name) private readonly conModel: Model<Contact>,
    ) { }
  
  
  async contact(payload: CreateContactDto): Promise<any> {
    try {
      const _contact = new this.conModel({
        ...payload,
        body: payload.message
      });
      await _contact.save();

      const emailpayload ={
        name: payload.name,
        email: payload.email,
        subject: 'Contacting Shuka Zuby - backend developer',
        message: payload.message,
      }

      await sendContactEmail(emailpayload)

      return {
        data: _contact,
        success: true,
        code: HttpStatus.CREATED,
        message: 'Contact Created',
      };
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }

  
}