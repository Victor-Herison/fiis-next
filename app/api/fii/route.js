import connectDB from "@/utils/db";
import { FiiModel } from "@/utils/schema";

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

async function fillterFiis(fiis, segmento, dy, pvp) {
   
    if(segmento){
        return  await fiis.filter(fii =>
           ( fii.segmento === segmento) &&
            fii.DY > parseFloat(dy) &&// DY maior que 8%
            fii.PVP < parseFloat(pvp) &&           // P/VP menor que 1
            fii.liquidez > 1597750  // Liquidez acima de 1M
        );
    }else{
        return  await fiis.filter(fii =>
             fii.DY > parseFloat(dy) &&// DY maior que 8%
             fii.PVP < parseFloat(pvp) &&           // P/VP menor que 1
             fii.liquidez > 1597750  // Liquidez acima de 1M
         );
    }
}

function sortFiis(fiis){
    return fiis.sort((a,b) => {
         return b.DY - a.DY
     })
}

export async function GET(req) {
    try {
        await connectDB();

        // Pegando os filtros da URL do frontend
        const { searchParams } = new URL(req.url);
        const segmento = searchParams.get("segmento");
        const dy = searchParams.get("dy");
        const pvp = searchParams.get("pvp");

        const fiis = await getAllFiis();
        const filteredFiis = await fillterFiis(fiis, segmento, dy, pvp);
        if(await filteredFiis.length){
            return Response.json(sortFiis(filteredFiis));
        }else{
            return Response.json({error: "não há FIIs com essas credenciais"}, {status : 404})
        }
        
    } catch (error) {
        return Response.json({ error: "Erro ao buscar FIIs" }, { status: 500 });
    }
}