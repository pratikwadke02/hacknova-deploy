import mongoose from "mongoose";
const Schema = mongoose.Schema;

const month = mongoose.Schema({
    jan: {}
})

const CropDetailSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  totalCrops: {type: String},
  totalFarmArea: {type: String},
  totalDeceased: {type: String},
  totalProduction: {type: String},
  months: {
    
  }
});

export default mongoose.model('posts', PostSchema);

[{src:"url"},{src:"url"},{},]