
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Как вы оцениваете свое общее самочувствие?",
    options: [
      "Плохо, чувствую усталость",
      "Нормально, немного не хватает энергии",
      "Хорошо, чувствую себя отлично"
    ]
  },
  {
    id: 2,
    text: "Как часто вы испытываете стресс?",
    options: [
      "Часто, это влияет на здоровье",
      "Иногда, но справляюсь",
      "Редко, стресс меня не беспокоит"
    ]
  },
  {
    id: 3,
    text: "Как вы оцениваете свой уровень физической активности?",
    options: [
      "Низкий, почти не занимаюсь спортом",
      "Средний, занимаюсь время от времени",
      "Высокий, занимаюсь регулярно"
    ]
  },
  {
    id: 4,
    text: "Как вы относитесь к своему питанию?",
    options: [
      "Неправильное, много фастфуда",
      "Умеренное, стараюсь следить за рационом",
      "Здоровое, питаюсь правильно"
    ]
  },
  {
    id: 5,
    text: "Как часто вы чувствуете усталость?",
    options: [
      "Часто, не хватает сил",
      "Иногда, но быстро восстанавливаюсь",
      "Редко, всегда полон энергии"
    ]
  },
  {
    id: 6,
    text: "Как вы оцениваете качество своего сна?",
    options: [
      "Плохое, часто просыпаюсь",
      "Удовлетворительное, иногда не хватает сна",
      "Хорошее, сплю спокойно"
    ]
  },
  {
    id: 7,
    text: "Как вы относитесь к диетам?",
    options: [
      "Неэффективные, пробовал много, но не помогли",
      "Иногда пробую, но не всегда удачно",
      "Следую диете, которая мне подходит"
    ]
  },
  {
    id: 8,
    text: "Как вы оцениваете свою мотивацию к здоровому образу жизни?",
    options: [
      "Низкая, сложно себя заставить",
      "Средняя, иногда хватает сил",
      "Высокая, всегда стремлюсь к лучшему"
    ]
  },
  {
    id: 9,
    text: "Как вы относитесь к детокс-программам?",
    options: [
      "За, считаю это полезным",
      "Нейтрально, не пробовал",
      "Против, не верю в их эффективность"
    ]
  },
  {
    id: 10,
    text: "Как вы оцениваете свое эмоциональное состояние?",
    options: [
      "Часто чувствую тревогу или подавленность",
      "Иногда испытываю негативные эмоции",
      "В основном чувствую себя хорошо"
    ]
  },
  {
    id: 11,
    text: "Как вы относитесь к дополнительным витаминам и минералам?",
    options: [
      "Принимаю регулярно для поддержания здоровья",
      "Иногда принимаю, но не всегда",
      "Не принимаю, считаю это ненужным"
    ]
  }
];

const TestPage = () => {
  const [consentDialogOpen, setConsentDialogOpen] = useState(true);
  const [consentGiven, setConsentGiven] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedOption === null) return;
    
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null); // Очищаем выбор при переходе к следующему вопросу
    } else {
      // Calculate results
      const optionCounts = [0, 0, 0];
      newAnswers.forEach(answer => {
        optionCounts[answer]++;
      });
      
      const maxCount = Math.max(...optionCounts);
      const resultType = optionCounts.findIndex(count => count === maxCount);
      
      // Save result to session storage
      sessionStorage.setItem('testResults', JSON.stringify({
        resultType,
        optionCounts
      }));
      
      navigate("/results");
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const newAnswers = [...answers];
      const prevAnswer = newAnswers.pop();
      setAnswers(newAnswers);
      setSelectedOption(prevAnswer !== undefined ? prevAnswer : null);
    }
  };

  // Обработчик согласия на обработку данных
  const handleConsent = () => {
    setConsentGiven(true);
    setConsentDialogOpen(false);
  };

  // Если пользователь не дал согласие и пытается закрыть диалог, перенаправляем на главную
  const handleConsentClose = () => {
    if (!consentGiven) {
      navigate("/");
    } else {
      setConsentDialogOpen(false);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!consentGiven && !consentDialogOpen) {
    navigate("/");
    return null;
  }

  return (
    <>
      <Dialog open={consentDialogOpen} onOpenChange={setConsentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Согласие на обработку персональных данных</DialogTitle>
            <DialogDescription>
              Для продолжения теста необходимо дать согласие на обработку персональных данных.
              Мы обрабатываем ваши данные в соответствии с законодательством РФ.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 my-4">
            <Checkbox id="terms" onCheckedChange={(checked) => setConsentGiven(checked === true)} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Я даю согласие на обработку персональных данных
            </label>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => navigate("/")}>
              Отмена
            </Button>
            <Button type="button" onClick={handleConsent} disabled={!consentGiven}>
              Продолжить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50 p-4">
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Вопрос {currentQuestion + 1} из {questions.length}
              </span>
              <span className="text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <CardTitle className="mt-4 text-xl">{question.text}</CardTitle>
          </CardHeader>
          
          <CardContent>
            <RadioGroup
              value={selectedOption !== null ? selectedOption.toString() : undefined}
              onValueChange={(value) => setSelectedOption(parseInt(value))}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-md border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          
          <CardFooter className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              Назад
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={selectedOption === null}
            >
              {currentQuestion < questions.length - 1 ? "Далее" : "Завершить"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default TestPage;
