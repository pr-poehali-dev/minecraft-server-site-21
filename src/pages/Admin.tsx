import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API_URL = "https://functions.poehali.dev/f07fd1ad-7793-45cf-9320-9ee01530b3a4";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: string;
}

const Admin = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    icon: "Sparkles"
  });
  const { toast } = useToast();

  const icons = ["Sparkles", "Swords", "Map", "HelpCircle", "Trophy", "Zap", "Flag", "Gift"];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNews(data);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить новости",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await fetch(API_URL, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, id: editingId })
        });
        toast({ title: "Успех", description: "Новость обновлена!" });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        toast({ title: "Успех", description: "Новость создана!" });
      }
      
      setFormData({ title: "", description: "", date: "", icon: "Sparkles" });
      setEditingId(null);
      fetchNews();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить новость",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (item: NewsItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      date: item.date,
      icon: item.icon
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить эту новость?")) return;
    
    try {
      await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
      toast({ title: "Успех", description: "Новость удалена!" });
      fetchNews();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить новость",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#353535] relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/e5637765-8955-44c2-a8f4-f501be7af055.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="relative z-10">
        <header className="border-b-4 border-[#2a2a2a] bg-[#4a4a4a] shadow-lg">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider">
              Админ-панель DayZM
            </h1>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-[#7CFC00] hover:bg-[#6BEB00] text-black border-4 border-[#5ad000] font-bold"
            >
              <Icon name="Home" className="mr-2" size={20} />
              На главную
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-4 border-[#2a2a2a] bg-[#4a4a4a] shadow-[6px_6px_0_rgba(0,0,0,0.3)]">
              <CardHeader>
                <CardTitle className="text-[#7CFC00] text-2xl">
                  {editingId ? "Редактировать новость" : "Добавить новость"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="text-white">Заголовок</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-[#2a2a2a] border-2 border-[#1a1a1a] text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white">Описание</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-[#2a2a2a] border-2 border-[#1a1a1a] text-white"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white">Дата</Label>
                    <Input
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="bg-[#2a2a2a] border-2 border-[#1a1a1a] text-white"
                      placeholder="15 октября 2025"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white">Иконка</Label>
                    <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                      <SelectTrigger className="bg-[#2a2a2a] border-2 border-[#1a1a1a] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {icons.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            <div className="flex items-center gap-2">
                              <Icon name={icon as any} size={20} />
                              {icon}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      type="submit"
                      className="bg-[#7CFC00] hover:bg-[#6BEB00] text-black border-4 border-[#5ad000] font-bold flex-1"
                    >
                      {editingId ? "Обновить" : "Создать"}
                    </Button>
                    
                    {editingId && (
                      <Button 
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setFormData({ title: "", description: "", date: "", icon: "Sparkles" });
                        }}
                        className="bg-[#8B4513] hover:bg-[#6B3410] text-white border-4 border-[#5a3410] font-bold"
                      >
                        Отмена
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#7CFC00]">Все новости</h2>
              {news.map((item) => (
                <Card 
                  key={item.id}
                  className="border-4 border-[#2a2a2a] bg-[#4a4a4a] shadow-[6px_6px_0_rgba(0,0,0,0.3)]"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="bg-[#7CFC00] p-2 border-2 border-[#2a2a2a]">
                          <Icon name={item.icon as any} size={24} className="text-black" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-xl">{item.title}</CardTitle>
                          <p className="text-[#7CFC00] text-sm mt-1">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="bg-[#7CFC00] hover:bg-[#6BEB00] text-black border-2 border-[#5ad000]"
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="bg-[#8B4513] hover:bg-[#6B3410] text-white border-2 border-[#5a3410]"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-200">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
