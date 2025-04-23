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

const articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    text: String,
    category: String,
    date: Date,
}, { timestamps: true });


export const FiiModel = mongoose.models.Fii || mongoose.model("Fii", FiiSchema);
export const ArticleModel = mongoose.models.Article || mongoose.model("Article", articleSchema);

