import { FiiModel } from "@/utils/schema";
import connectDB from "@/utils/db";


async function getAllFiis() {
    try {
        const fiis = await FiiModel.find(); // Busca todos os FIIs no banco
        console.log("📊 FIIs encontrados:", fiis.length);
        return fiis; // Retorna um array com todos os FIIs
    } catch (error) {
        console.error("❌ Erro ao buscar FIIs:", error);
        return [];
    }
}
export const fiis = await getAllFiis(); // Chama a função para buscar os FIIs