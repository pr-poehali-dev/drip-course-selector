
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

interface TestResults {
  resultType: number;
  optionCounts: number[];
}

const resultTypes = [
  {
    title: "Капельница ДЕТОКС",
    description: "Идеальный выбор для очищения организма и восстановления жизненных сил",
    benefits: [
      "Очищение организма от токсинов",
      "Улучшение работы печени",
      "Укрепление иммунитета",
      "Снижение воспалительных процессов"
    ],
    analyses: "АЛТ, АСТ, гамма-ГТП, креатинин, лактат, общий белок, СРБ-ультра, билирубин прямой и непрямой.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
  },
  {
    title: "Капельница СНИЖЕНИЕ ВЕСА",
    description: "Эффективное решение для поддержки метаболизма и снижения веса",
    benefits: [
      "Ускорение метаболизма",
      "Подавление аппетита",
      "Расщепление жировых отложений",
      "Повышение эффективности тренировок"
    ],
    analyses: "ОАК, глюкоза, АЛТ, АСТ, Липидный профиль.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Капельница ЭНЕРГИЯ",
    description: "Мощный заряд энергии для активной жизни и работоспособности",
    benefits: [
      "Повышение жизненного тонуса",
      "Улучшение концентрации внимания",
      "Борьба с хронической усталостью",
      "Нормализация сна"
    ],
    analyses: "ОАК, ферритин, В12, лактат, СРБ-ультра, КНТЖ, ОЖСС, общий белок.",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80"
  }
];

const ResultsPage = () => {
  const [results, setResults] = useState<TestResults | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults = sessionStorage.getItem('testResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Загрузка результатов...</p>
      </div>
    );
  }

  const resultData = resultTypes[results.resultType];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg animate-fade-in">
        <CardHeader className="text-center pb-2">
          <div 
            className="w-full h-48 mb-6 rounded-t-lg bg-cover bg-center" 
            style={{ backgroundImage: `url(${resultData.image})` }}
          ></div>
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            {results.resultType === 0 ? (
              <span className="text-2xl">🧪</span>
            ) : results.resultType === 1 ? (
              <span className="text-2xl">⚖️</span>
            ) : (
              <span className="text-2xl">⚡</span>
            )}
          </div>
          <CardTitle className="text-3xl font-bold text-primary">
            {resultData.title}
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            {resultData.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">
              Основные преимущества:
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {resultData.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-b py-4">
            <h3 className="font-medium text-lg mb-2">
              Анализы для консультации:
            </h3>
            <p className="text-muted-foreground">
              {resultData.analyses}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-lg mb-2">
              Статистика ваших ответов:
            </h3>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="flex flex-col items-center p-2 bg-white rounded">
                <span className="text-lg font-bold">{results.optionCounts[0]}</span>
                <span className="text-xs text-muted-foreground">Детокс</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-white rounded">
                <span className="text-lg font-bold">{results.optionCounts[1]}</span>
                <span className="text-xs text-muted-foreground">Снижение веса</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-white rounded">
                <span className="text-lg font-bold">{results.optionCounts[2]}</span>
                <span className="text-xs text-muted-foreground">Энергия</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button 
            className="w-full" 
            size="lg"
            onClick={() => navigate("/contact")}
          >
            Оставить контактные данные
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate("/")}
          >
            Пройти тест заново
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultsPage;
