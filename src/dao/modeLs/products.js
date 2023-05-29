import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const productCollection = 'products';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inCart: { 
        type: Boolean, 
        default: false 
    },
    id: {
        type: Number,
        unique: true
    }
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model('Product', productSchema);

// Establece la conexión con la base de datos
mongoose.connect('mongodb+srv://castrodavid9872:ItNaMTm4F5cwWs0v@cluster364da.jqgneo9.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    // Aquí puedes realizar operaciones con los modelos, como crear, leer, actualizar o eliminar documentos
  })
  .catch((error) => {
    console.error('Error de conexión:', error);
  });


