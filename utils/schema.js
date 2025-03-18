import mongoose from "mongoose";

const FiiSchema = new mongoose.Schema({
    papel: String,
    segmento: String,
    cotacao: Number,
    FFOYield: Number,
    DY: Number,
    PVP: Number,
    valorMercado: Number,
    liquidez: Number,
    qtdImoveis: Number,
    precoM2: Number,
    aluguelM2: Number,
    capRate: Number,
    vacanciaMedia: Number,
}, { timestamps: true });

export const FiiModel = mongoose.models.Fii || mongoose.model("Fii", FiiSchema);