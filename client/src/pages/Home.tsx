import { useState, useMemo } from 'react';
import { Search, AlertCircle, Leaf, Users, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const materialsData = [
  {
    id: 1,
    name: 'Papel e Papelão',
    category: 'papel',
    icon: '📄',
    description: 'Jornais, revistas, caixas de papelão',
    doList: [
      'Separar papel e papelão',
      'Remover plásticos e metais',
      'Deixar seco',
      'Amassar ou dobrar para economizar espaço'
    ],
    dontList: [
      'Misturar com plástico ou metal',
      'Deixar molhado ou sujo',
      'Incluir papel de banheiro ou guardanapo',
      'Colocar fita adesiva ou etiquetas'
    ],
    contaminationRisk: 'Baixo'
  },
  {
    id: 2,
    name: 'Plástico',
    category: 'plastico',
    icon: '🛍️',
    description: 'Garrafas, embalagens, sacolas',
    doList: [
      'Enxaguar bem as embalagens',
      'Remover rótulos se possível',
      'Secar completamente',
      'Separar por tipo (PET, PEAD, etc.)'
    ],
    dontList: [
      'Deixar resíduos de alimento ou bebida',
      'Misturar com outros materiais',
      'Colocar plástico sujo ou úmido',
      'Incluir plástico filme ou plástico bolha'
    ],
    contaminationRisk: 'Médio'
  },
  {
    id: 3,
    name: 'Vidro',
    category: 'vidro',
    icon: '🍾',
    description: 'Garrafas, potes, vidros',
    doList: [
      'Enxaguar bem',
      'Deixar secar',
      'Remover tampas de metal ou plástico',
      'Separar vidro transparente do colorido'
    ],
    dontList: [
      'Misturar com outros materiais',
      'Deixar resíduos de alimento',
      'Colocar vidro quebrado sem proteção',
      'Incluir espelhos ou vidro temperado'
    ],
    contaminationRisk: 'Baixo'
  },
  {
    id: 4,
    name: 'Metal',
    category: 'metal',
    icon: '🥫',
    description: 'Latas, tampas, objetos metálicos',
    doList: [
      'Enxaguar bem as latas',
      'Remover rótulos',
      'Deixar secar',
      'Amassar latas para economizar espaço'
    ],
    dontList: [
      'Deixar resíduos de alimento ou bebida',
      'Misturar com plástico ou vidro',
      'Colocar metal enferrujado',
      'Incluir fios ou cabos elétricos'
    ],
    contaminationRisk: 'Médio'
  },
  {
    id: 5,
    name: 'Óleo de Cozinha',
    category: 'oleo',
    icon: '🫗',
    description: 'Óleo usado de frituras e cozimento',
    doList: [
      'Deixar esfriar completamente',
      'Colocar em garrafa PET fechada',
      'Descartar em local apropriado',
      'Nunca jogar na pia ou ralo'
    ],
    dontList: [
      'Jogar na pia ou ralo',
      'Misturar com outros recicláveis',
      'Deixar aberto ou derramado',
      'Descartar com lixo comum'
    ],
    contaminationRisk: 'Muito Alto'
  },
  {
    id: 6,
    name: 'Eletrônicos',
    category: 'eletronico',
    icon: '📱',
    description: 'Celulares, computadores, eletrônicos',
    doList: [
      'Separar de outros recicláveis',
      'Procurar pontos de coleta especializados',
      'Manter em local seguro',
      'Contatar a Recicla Capixaba para orientação'
    ],
    dontList: [
      'Misturar com papel, plástico ou vidro',
      'Descartar com lixo comum',
      'Deixar expostos ao tempo',
      'Tentar desmontar ou abrir'
    ],
    contaminationRisk: 'Crítico'
  }
];

const dangerousItems = [
  {
    name: 'Seringas e Agulhas',
    icon: '💉',
    risk: 'Risco de infecção grave',
    action: 'Descartar em lixo comum ou procurar serviço de saúde'
  },
  {
    name: 'Fraldas e Absorventes',
    icon: '🧸',
    risk: 'Contaminação biológica',
    action: 'Descartar em lixo comum'
  },
  {
    name: 'Lixo Hospitalar',
    icon: '🏥',
    risk: 'Risco de contaminação e infecção',
    action: 'Procurar serviço de saúde para descarte adequado'
  },
  {
    name: 'Lâmpadas Fluorescentes',
    icon: '💡',
    risk: 'Contém mercúrio tóxico',
    action: 'Procurar pontos de coleta especializados'
  },
  {
    name: 'Pilhas e Baterias',
    icon: '🔋',
    risk: 'Contaminação por metais pesados',
    action: 'Procurar pontos de coleta de pilhas e baterias'
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('guide');

  const filteredMaterials = useMemo(() => {
    return materialsData.filter(material => {
      const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || material.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'papel', label: 'Papel' },
    { id: 'plastico', label: 'Plástico' },
    { id: 'vidro', label: 'Vidro' },
    { id: 'metal', label: 'Metal' },
    { id: 'oleo', label: 'Óleo' },
    { id: 'eletronico', label: 'Eletrônicos' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Guia Recicla Certa</h1>
          </div>
          <p className="text-green-100 text-lg">
            Aprenda a descartar corretamente e proteja os catadores
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="guide">Guia de Descarte</TabsTrigger>
            <TabsTrigger value="dangers">Não Recicle!</TabsTrigger>
            <TabsTrigger value="about">Sobre</TabsTrigger>
          </TabsList>

          {/* Tab 1: Guide */}
          <TabsContent value="guide" className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar material (ex: plástico, vidro, óleo)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(cat.id)}
                  className="rounded-full"
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Materials Grid */}
            {filteredMaterials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMaterials.map(material => (
                  <Card key={material.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-4xl mb-2">{material.icon}</div>
                          <CardTitle className="text-2xl">{material.name}</CardTitle>
                          <CardDescription>{material.description}</CardDescription>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          material.contaminationRisk === 'Muito Alto' ? 'bg-red-100 text-red-800' :
                          material.contaminationRisk === 'Crítico' ? 'bg-red-200 text-red-900' :
                          material.contaminationRisk === 'Médio' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {material.contaminationRisk}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      {/* Do List */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-green-700">O que fazer:</h4>
                        </div>
                        <ul className="space-y-2 ml-7">
                          {material.doList.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-green-600 font-bold">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Don't List */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <XCircle className="w-5 h-5 text-red-600" />
                          <h4 className="font-semibold text-red-700">O que não fazer:</h4>
                        </div>
                        <ul className="space-y-2 ml-7">
                          {material.dontList.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-red-600 font-bold">✗</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Nenhum material encontrado. Tente outra busca.</p>
              </div>
            )}
          </TabsContent>

          {/* Tab 2: Dangerous Items */}
          <TabsContent value="dangers" className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-900 mb-1">⚠️ Cuidado!</h3>
                  <p className="text-red-800 text-sm">
                    Estes itens NÃO devem ser colocados na coleta seletiva. Representam risco à saúde dos catadores.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dangerousItems.map((item, idx) => (
                <Card key={idx} className="border-red-200 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{item.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-red-900 mb-2">{item.name}</h4>
                        <p className="text-sm text-red-800 mb-3">
                          <strong>Risco:</strong> {item.risk}
                        </p>
                        <p className="text-sm text-red-700 bg-white px-3 py-2 rounded border border-red-200">
                          <strong>Ação:</strong> {item.action}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab 3: About */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-green-600" />
                  Sobre a Recicla Capixaba
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>
                  A <strong>Recicla Capixaba</strong> é uma organização não governamental dedicada à educação ambiental
                  e à sustentabilidade socioambiental no Espírito Santo. Nosso trabalho vai além da reciclagem: é sobre
                  dignidade, renda e proteção à saúde.
                </p>
                <p>
                  Os <strong>catadores</strong> são profissionais essenciais para o ciclo de reciclagem. Eles trabalham
                  na triagem, limpeza e separação de materiais recicláveis. Infelizmente, muitas vezes enfrentam riscos
                  à saúde devido à contaminação dos materiais.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                  Por que a Contaminação é um Problema?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="text-2xl">🦠</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Risco à Saúde</h4>
                      <p className="text-sm text-gray-700">
                        Materiais contaminados (seringas, fraldas, lixo hospitalar) podem transmitir doenças graves aos catadores.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">📉</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Perda de Qualidade</h4>
                      <p className="text-sm text-gray-700">
                        Materiais sujos ou contaminados perdem valor e não podem ser reciclados, prejudicando a renda da ONG.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">🌍</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Impacto Ambiental</h4>
                      <p className="text-sm text-gray-700">
                        Materiais contaminados não podem ser reciclados e acabam em aterros, prejudicando o meio ambiente.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  Como Você Pode Ajudar?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg">1.</span>
                    <span className="text-gray-700"><strong>Limpe os materiais:</strong> Enxágue garrafas, latas e embalagens antes de descartar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg">2.</span>
                    <span className="text-gray-700"><strong>Separe corretamente:</strong> Siga este guia para separar papel, plástico, vidro e metal.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg">3.</span>
                    <span className="text-gray-700"><strong>Nunca misture:</strong> Não coloque itens perigosos (seringas, fraldas) na coleta seletiva.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg">4.</span>
                    <span className="text-gray-700"><strong>Compartilhe:</strong> Ensine amigos e família sobre o descarte correto.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-900">Contato - Recicla Capixaba</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p className="mb-2">
                  Para mais informações sobre a Recicla Capixaba, campanhas de conscientização ou dúvidas sobre reciclagem:
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> contato@reciclacapixaba.org.br<br />
                  <strong>Telefone:</strong> (27) 3000-0000<br />
                  <strong>Redes Sociais:</strong> @reciclacapixaba
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">
            <strong>Guia Recicla Certa</strong> - Desenvolvido para a Recicla Capixaba
          </p>
          <p className="text-sm text-gray-400">
            Projeto Integrador IV-B | Análise e Desenvolvimento de Sistemas | FAESA 2025
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Juntos, podemos fazer a diferença na vida dos catadores e no meio ambiente.
          </p>
        </div>
      </footer>
    </div>
  );
}
