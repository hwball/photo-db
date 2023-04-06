import mongoose from 'mongoose';

interface IPhoto { 
    filename: string,
    file: { 
        data: Buffer,
        contentType: String,
    }
    uploadTime: Date
}

interface PhotoModelInterface extends mongoose.Model<any> {
    build(attr: IPhoto): PhotoDoc
}

interface PhotoDoc extends mongoose.Document {
    filename: string,
    file: { 
        data: Buffer,
        contentType: String,
    }
    uploadTime: Date
}

const photoSchema = new mongoose.Schema({
    filename: {
      type: String,
      required: true,
    },
    file: {
      data: Buffer,
      contentType: String,
    },
    uploadTime: {
      type: Date,
      default: Date.now,
    },
  });

photoSchema.statics.build = (attr: IPhoto) => {
    return new Photo(attr)
}

const Photo = mongoose.model<any, PhotoModelInterface>('Photo', photoSchema)


export { Photo, PhotoDoc };