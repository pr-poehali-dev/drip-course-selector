
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const Index = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-lg shadow-lg animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Узнайте, какой курс капельниц Вам подойдет
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Пройдите короткий тест и получите персональную рекомендацию
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-lg mb-2">
              Наши курсы капельниц:
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Детокс - для очищения организма</li>
              <li>Снижение веса - для поддержки при похудении</li>
              <li>Энергия - для повышения жизненного тонуса</li>
            </ul>
          </div>

          <div className="flex items-start space-x-2 pt-2 pb-4">
            <Checkbox 
              id="terms" 
              checked={agreed} 
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Я даю согласие на обработку моих персональных данных в соответствии с политикой конфиденциальности. 
              Мои данные будут использованы только для предоставления результатов теста и не будут переданы третьим лицам.
            </label>
          </div>
        </CardContent>

        <CardFooter>
          <Button 
            className="w-full" 
            size="lg"
            disabled={!agreed}
            onClick={() => navigate("/test")}
          >
            Начать тест
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
