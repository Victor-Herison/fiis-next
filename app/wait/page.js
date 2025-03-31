export default function Wait() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[url(/wait.svg)] bg-no-repeat bg-contain bg-center bg-gray-900 mb-[-40]">
            <h1 className="text-2xl font-bold text-white">Essa pagina ainda não está pronta</h1>
            <p className="text-sm text-gray-400">Volte para a pagina inicial</p>
            <a href="/" className="text-blue-500 hover:text-blue-700">Voltar para a pagina inicial</a>

        </div>
    )
}
