import connectDB from "@/utils/db";
import { FiiModel } from "@/utils/schema";

export async function GET(req) {
    await connectDB();
    const fiis = await FiiModel.find();
    const options = fiis.map(fii => fii.papel)
    console.log(options)
    return Response.json(options);
}