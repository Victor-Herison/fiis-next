import connectDB from "@/utils/db";
import {FiiModel} from "@/utils/schema"; // Importa o modelo de FII

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

await connectDB(); // Conecta ao banco de dados
const fiis = await getAllFiis(); // Chama a função para buscar os FIIs



async function fillterFiis(fiis, segmento, dy, pvp, liquidez, vacancia, qtdImoveis) {
    // Filtra os FIIs com base nos critérios fornecidos
 
    if(segmento){
        console.log(segmento === "Titulos e Val. Mob.")
        return fiis.filter(fii =>
           ( fii.segmento === segmento) &&
            fii.DY >= parseFloat(dy) &&// DY maior que 8%
            fii.PVP <= parseFloat(pvp) &&           // P/VP menor que 1
            fii.liquidez > liquidez
        );
    }else{
        return fiis.filter(fii =>
            fii.DY >= parseFloat(dy) &&// DY maior que 8%
            fii.PVP <= parseFloat(pvp) &&         // P/VP menor que 1
            fii.liquidez >= liquidez
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
        

        // Pegando os filtros da URL do frontend
        const { searchParams } = new URL(req.url);

        // Pegando os filtros da URL do frontend
        const segmento = searchParams.get("segmento");
        const dy = searchParams.get("dy");
        const pvp = searchParams.get("pvp");
        const liquidez = searchParams.get("liquidez");
       

        const filteredFiis = await fillterFiis(fiis, segmento, dy, pvp, liquidez);

        if(filteredFiis.length){
            return Response.json(sortFiis(filteredFiis));
        }else{
            return Response.json({error: "não há FIIs com essas credenciais"}, {status : 404})
        }
        
    } catch (error) {
        console.error("❌ Erro ao buscar FIIs:", error);
        return Response.json({ error: "Erro ao buscar FIIs" }, { status: 500 });
    }
}