import { ChevronDown } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function FIIsDropdown() {
  return (
    <div className="w-full p-4 mt-7">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium cursor-pointer">Como funciona nosso filtro de FIIs?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p className="mb-4">
              Nosso filtro de FIIs permite que você encontre os
              melhores fundos imobiliários com base em diversos critérios como:
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <span className="font-semibold">DY Mínimo:</span> Filtre por dividend yield mínimo desejado. Os valores
                de DY são exibidos em <span className="text-yellow-500 font-semibold">amarelo</span> para destacar alertar sobre um fundo qur está anormal e 
                <span className="text-green-500 font-semibold"> verde</span> para destacar um fundo que está com um DY na média.
              </li>
              <li>
                <span className="font-semibold">P/VP Máximo:</span> Filtre pelo valor máximo de Preço/Valor Patrimonial.
                Valores de P/VP são exibidos em <span className="text-green-500 font-semibold">verde</span> quando estão
                abaixo de 1 e acima de 0.8, indicando que o fundo pode estar descontado, caso esteja abaixo de 0.8, o fundo pode estar com algum problema.
              </li>
              <li>
                <span className="font-semibold">Segmentos:</span> Escolha entre diversos segmentos como Títulos e Val.
                Mob., Híbrido, ou outros. Nesse caso as cores não querem dizer nada, são apenas para organização.
              </li>
              <li>
                <span className="font-semibold">Patrimônio:</span> Defina o patrimônio mínimo do fundo em reais.
              </li>
              <li>
                <span className="font-semibold">Vacância:</span> Filtre pela taxa máxima de vacância aceitável.
              </li>
              <li>
                <span className="font-semibold">Imóveis:</span> Filtre pela quantidade mínima de imóveis no portfólio.
              </li>
            </ul>

            <p className="mb-4">
              Após definir seus critérios, clique no botão <span className="text-green-500 font-semibold">Filtrar</span>{" "}
              para encontrar os FIIs que atendem às suas necessidades.
            </p>

            <div className="bg-gray-100 p-4 rounded-md">
              <h4 className="font-semibold mb-2">Entendendo as cores:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Valores de DY (Dividend Yield) em amarelo - Atenção!</span>
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span>Valores de P/VP em verde quando abaixo de 1 - indicando potencial valorização</span>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-medium cursor-pointer">Dicas para usar o filtro eficientemente</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p className="mb-4">
              Para obter os melhores resultados com nosso
              filtro de FIIs:
            </p>

            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Comece com critérios mais amplos e vá refinando conforme necessário.</li>
              <li>
                Priorize fundos com <span className="text-green-500 font-semibold">DY elevado</span> (em verde) se
                busca renda passiva.
              </li>
              <li>
                Busque fundos com <span className="text-green-500 font-semibold">P/VP abaixo de 1</span> (em verde) se
                busca valorização.
              </li>
              <li>Considere a liquidez para garantir que poderá vender suas cotas quando necessário.</li>
              <li>Analise a vacância média para entender o potencial de ocupação dos imóveis.</li>
            </ol>

            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <p className="italic text-sm">
                Lembre-se: Nada neste site é uma sugestão de investimento! Recomendamos você estudar aonde você investe
                seu dinheiro.
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  Exemplos de estratégias <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Estratégias de filtro</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>Renda mensal (DY &gt; 12%)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Valorização (P/VP &lt; 0.9)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Baixa vacância (&lt; 5%)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Alta liquidez</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

