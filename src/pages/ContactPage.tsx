
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните обязательные поля",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    setTimeout(() => {
      const results = sessionStorage.getItem('testResults');
      
      // Here you would normally send data to server
      console.log({
        firstName,
        middleName,
        phone,
        results: results ? JSON.parse(results) : null
      });
      
      toast({
        title: "Данные отправлены",
        description: "Мы свяжемся с вами в ближайшее время",
        duration: 5000
      });
      
      // Clear all data
      sessionStorage.removeItem('testResults');
      
      setIsSubmitting(false);
      navigate("/");
    }, 1500);
  };

  const formatPhoneNumber = (value: string) => {
    // Keep only digits
    const cleaned = value.replace(/\D/g, "");
    
    // Format as +7 (XXX) XXX-XX-XX
    let formatted = "";
    if (cleaned.length > 0) {
      formatted = "+7";
      if (cleaned.length > 1) {
        formatted += ` (${cleaned.substring(1, Math.min(4, cleaned.length))}`;
      }
      if (cleaned.length > 4) {
        formatted += `) ${cleaned.substring(4, Math.min(7, cleaned.length))}`;
      }
      if (cleaned.length > 7) {
        formatted += `-${cleaned.substring(7, Math.min(9, cleaned.length))}`;
      }
      if (cleaned.length > 9) {
        formatted += `-${cleaned.substring(9, Math.min(11, cleaned.length))}`;
      }
    }
    
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-lg shadow-lg animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Оставьте ваши контактные данные
          </CardTitle>
          <CardDescription className="mt-2">
            Мы свяжемся с вами для подтверждения записи на консультацию
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Имя <span className="text-red-500">*</span></Label>
              <Input 
                id="firstName" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Иван"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="middleName">Отчество</Label>
              <Input 
                id="middleName" 
                value={middleName} 
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Петрович"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон <span className="text-red-500">*</span></Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={handlePhoneChange}
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>

            <p className="text-sm text-muted-foreground pt-2">
              Поля, отмеченные <span className="text-red-500">*</span>, обязательны для заполнения
            </p>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/results")}
              disabled={isSubmitting}
            >
              Вернуться к результатам
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ContactPage;
