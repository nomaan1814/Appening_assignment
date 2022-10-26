const mongoose=require('mongoose');
const connectDb=async()=>{
      try {
        await mongoose.connect("mongodb+srv://mohdnomaan:12345@cluster0.qc5igcw.mongodb.net/?retryWrites=true&w=majority");
        console.log('Database connected')
      } catch (error) {
          console.log(error.message);
          process.exit;
      }
}
module.exports=connectDb;