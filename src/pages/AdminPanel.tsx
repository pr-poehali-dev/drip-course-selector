
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// В реальном приложении данные должны загружаться с сервера
interface UserSubmission {
  id: string;
  date: string;
  firstName: string;
  middleName: string | null;
  phone: string;
  resultType: number;
  optionCounts: number[];
}

const resultTypeNames = [
  "Капельница ДЕТОКС",
  "Капельница СНИЖЕНИЕ ВЕСА",
  "Капельница ЭНЕРГИЯ"
];

// Имитация данных клиентов
const mockData: UserSubmission[] = [
  {
    id: "1",
    date: "2025-04-28",
    firstName: "Анна",
    middleName: "Сергеевна",
    phone: "+7 (912) 345-67-89",
    resultType: 0,
    optionCounts: [7, 3, 1]
  },
  {
    id: "2",
    date: "2025-04-29",
    firstName: "Иван",
    middleName: "Петрович",
    phone: "+7 (916) 123-45-67",
    resultType: 1,
    optionCounts: [2, 8, 1]
  },
  {
    id: "3",
    date: "2025-04-30",
    firstName: "Елена",
    middleName: null,
    phone: "+7 (920) 555-77-88",
    resultType: 2,
    optionCounts: [1, 2, 8]
  }
];

const AdminPanel = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<UserSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // В реальном приложении пароль должен проверяться на сервере
  const adminPassword = "admin123";

  useEffect(() => {
    // Имитация загрузки данных с сервера
    // В реальном приложении здесь должен быть API-запрос
    if (isAuthorized) {
      setSubmissions(mockData);
      setFilteredSubmissions(mockData);
    }
  }, [isAuthorized]);

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthorized(true);
      toast({
        title: "Авторизация успешна",
        description: "Добро пожаловать в панель администратора",
      });
    } else {
      toast({
        title: "Ошибка авторизации",
        description: "Неверный пароль",
        variant: "destructive"
      });
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredSubmissions(submissions);
      return;
    }
    
    const filtered = submissions.filter(sub => 
      sub.firstName.toLowerCase().includes(term.toLowerCase()) ||
      (sub.middleName && sub.middleName.toLowerCase().includes(term.toLowerCase())) ||
      sub.phone.includes(term)
    );
    
    setFilteredSubmissions(filtered);
  };

  const filterByResult = (resultType: number | null) => {
    if (resultType === null) {
      setFilteredSubmissions(submissions);
    } else {
      const filtered = submissions.filter(sub => sub.resultType === resultType);
      setFilteredSubmissions(filtered);
    }
  };

  // Экспорт данных в CSV
  const exportToCSV = () => {
    const headers = ["Дата", "Имя", "Отчество", "Телефон", "Рекомендация"];
    
    const csvContent = [
      headers.join(","),
      ...filteredSubmissions.map(sub => [
        sub.date,
        sub.firstName,
        sub.middleName || "",
        sub.phone,
        resultTypeNames[sub.resultType]
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `submissions-${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Экспорт выполнен",
      description: "Данные успешно экспортированы в CSV файл"
    });
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              Панель администратора
            </CardTitle>
            <CardDescription>
              Введите пароль для доступа к данным
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleLogin}>
              Войти
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Панель администратора</h1>
            <p className="text-gray-500">Управление заявками клиентов</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              На главную
            </Button>
            <Button variant="default" onClick={exportToCSV}>
              Экспорт в CSV
            </Button>
          </div>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Поиск по имени или телефону"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full md:w-2/3">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all" onClick={() => filterByResult(null)}>
                Все
              </TabsTrigger>
              <TabsTrigger value="detox" onClick={() => filterByResult(0)}>
                Детокс
              </TabsTrigger>
              <TabsTrigger value="weight" onClick={() => filterByResult(1)}>
                Снижение веса
              </TabsTrigger>
              <TabsTrigger value="energy" onClick={() => filterByResult(2)}>
                Энергия
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableCaption>
                {filteredSubmissions.length === 0 
                  ? "Нет данных для отображения" 
                  : `Всего записей: ${filteredSubmissions.length}`}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Отчество</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Рекомендация</TableHead>
                  <TableHead>Распределение ответов</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.date}</TableCell>
                    <TableCell className="font-medium">{submission.firstName}</TableCell>
                    <TableCell>{submission.middleName || "—"}</TableCell>
                    <TableCell>{submission.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          submission.resultType === 0 ? "default" :
                          submission.resultType === 1 ? "secondary" : "outline"
                        }
                      >
                        {resultTypeNames[submission.resultType]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 text-xs">
                        <span>Д: {submission.optionCounts[0]}</span>
                        <span>В: {submission.optionCounts[1]}</span>
                        <span>Э: {submission.optionCounts[2]}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
