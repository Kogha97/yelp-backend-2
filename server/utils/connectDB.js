import mongoose from 'mongoose'
import dotenv from 'dotenv/config'

export default async function connect(){
    try {
        
        await mongoose.connect(process.env.DB_URI);
        console.log('connected to database');

    } catch (error) {
        console.log('error connecting to database:', error.message)
    }
}