import { Application } from '../declarations';
import contacts from './contacts/contacts.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(contacts);
}
