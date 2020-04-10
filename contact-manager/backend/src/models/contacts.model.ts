// contacts-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import 'mongoose-type-email'

export default function (app: Application) {
  const modelName = 'contacts';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name: {
      first: {
        type: String,
        required: [true, 'First name is required 👎🏻']
      },
      last: {
        type: String,
        required: false
      }
    },
    email: {
      type: mongooseClient.SchemaTypes.Email,
      required: [true, 'Email is required 👎🏻']
    },
    phone: {
      type: String,
      required: [true, 'Phone is required 👎🏻'],
      validate: {
        validator: (v: string) => /^\+(?:[0-9] ?){6,14}[0-9]$/.test(v),
        message: '{VALUE} is not a valid international phone number 🙅🏻‍♂️'
      }
    }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
}
