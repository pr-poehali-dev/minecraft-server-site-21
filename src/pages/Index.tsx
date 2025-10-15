import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const Index = () => {
  const [onlinePlayers, setOnlinePlayers] = useState(127);
  const serverIp = "mc.server.ru";

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlinePlayers(prev => Math.max(100, Math.min(150, prev + Math.floor(Math.random() * 11) - 5)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIp);
  };

  const news = [
    {
      id: 1,
      title: "Обновление 1.20.4",
      description: "Новые биомы, мобы и предметы уже доступны на сервере!",
      date: "15 октября 2025",
      icon: "Sparkles"
    },
    {
      id: 2,
      title: "Новый ивент: Битва гильдий",
      description: "Соревнуйтесь с другими игроками за звание лучшей гильдии сервера",
      date: "12 октября 2025",
      icon: "Swords"
    },
    {
      id: 3,
      title: "Открыт новый мир",
      description: "Исследуйте ресурсный мир с уникальными структурами и сокровищами",
      date: "8 октября 2025",
      icon: "Map"
    }
  ];

  return (
    <div className="min-h-screen bg-[#353535] relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/e5637765-8955-44c2-a8f4-f501be7af055.jpg')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative z-10">
        <header className="border-b-4 border-[#2a2a2a] bg-[#4a4a4a] shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-5xl md:text-7xl font-bold text-center text-white tracking-wider drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">
              MINECRAFT SERVER
            </h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 space-y-12">
          <section className="text-center space-y-6">
            <div className="inline-block border-4 border-[#2a2a2a] bg-[#7CFC00] px-8 py-4 shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
              <p className="text-2xl md:text-3xl font-bold text-black font-['Pixelify_Sans']">
                IP: {serverIp}
              </p>
            </div>
            
            <Button 
              onClick={copyToClipboard}
              className="bg-[#8B4513] hover:bg-[#6B3410] text-white border-4 border-[#5a3410] text-xl px-8 py-6 font-['Pixelify_Sans'] shadow-[4px_4px_0_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0_rgba(0,0,0,0.3)] transition-all"
            >
              <Icon name="Copy" className="mr-2" size={24} />
              Скопировать IP
            </Button>

            <div className="flex justify-center gap-6 flex-wrap mt-8">
              <Card className="border-4 border-[#2a2a2a] bg-[#4a4a4a] shadow-[6px_6px_0_rgba(0,0,0,0.3)] min-w-[200px]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#7CFC00] font-['Pixelify_Sans'] text-2xl flex items-center gap-2">
                    <Icon name="Users" size={28} />
                    Игроки онлайн
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold text-white font-['Pixelify_Sans']">{onlinePlayers}</p>
                  <p className="text-gray-300 mt-2">из 200</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-[#2a2a2a] bg-[#4a4a4a] shadow-[6px_6px_0_rgba(0,0,0,0.3)] min-w-[200px]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#7CFC00] font-['Pixelify_Sans'] text-2xl flex items-center gap-2">
                    <Icon name="Globe" size={28} />
                    Версия
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-white font-['Pixelify_Sans']">1.20.4</p>
                  <p className="text-gray-300 mt-2">Java Edition</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-[#2a2a2a] bg-[#4a4a4a] shadow-[6px_6px_0_rgba(0,0,0,0.3)] min-w-[200px]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#7CFC00] font-['Pixelify_Sans'] text-2xl flex items-center gap-2">
                    <Icon name="Zap" size={28} />
                    Режим
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white font-['Pixelify_Sans']">Survival</p>
                  <p className="text-gray-300 mt-2">Без гриферства</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#7CFC00] font-['Pixelify_Sans'] drop-shadow-[0_3px_0_rgba(0,0,0,0.5)]">
              Новости сервера
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <Card 
                  key={item.id} 
                  className="border-4 border-[#2a2a2a] bg-[#4a4a4a] hover:bg-[#555555] transition-colors shadow-[6px_6px_0_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all"
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="bg-[#7CFC00] p-2 border-2 border-[#2a2a2a]">
                        <Icon name={item.icon as any} size={32} className="text-black" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white font-['Pixelify_Sans'] text-xl mb-2">
                          {item.title}
                        </CardTitle>
                        <Badge className="bg-[#8B4513] text-white border-2 border-[#5a3410] font-['Pixelify_Sans']">
                          {item.date}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-200 text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="text-center pb-12">
            <Card className="border-4 border-[#2a2a2a] bg-[#4a4a4a] shadow-[6px_6px_0_rgba(0,0,0,0.3)] max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl text-[#7CFC00] font-['Pixelify_Sans']">
                  Присоединяйся к нам!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-200 text-lg">
                  Играй вместе с друзьями, стройте невероятные постройки и исследуйте огромный мир!
                </p>
                <div className="flex justify-center gap-4">
                  <Button className="bg-[#7CFC00] hover:bg-[#6BEB00] text-black border-4 border-[#5ad000] font-['Pixelify_Sans'] text-lg px-6 py-5 shadow-[4px_4px_0_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0_rgba(0,0,0,0.3)] transition-all">
                    <Icon name="MessageCircle" className="mr-2" size={20} />
                    Discord
                  </Button>
                  <Button className="bg-[#8B4513] hover:bg-[#6B3410] text-white border-4 border-[#5a3410] font-['Pixelify_Sans'] text-lg px-6 py-5 shadow-[4px_4px_0_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0_rgba(0,0,0,0.3)] transition-all">
                    <Icon name="Youtube" className="mr-2" size={20} />
                    YouTube
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
