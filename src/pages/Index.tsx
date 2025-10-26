import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  material: string;
  style: string;
  color: string;
  room: string;
}

const products: Product[] = [
  { id: 1, name: 'Кресло Nordic', price: 24990, image: 'https://cdn.poehali.dev/projects/20573a6e-ef08-4281-8688-a96f210b3b89/files/31293cb7-a4e2-4846-b5b8-b4f6ddeb52ec.jpg', category: 'Кресла', material: 'Ткань', style: 'Скандинавский', color: 'Оранжевый', room: 'Гостиная' },
  { id: 2, name: 'Кровать Comfort', price: 45990, image: 'https://cdn.poehali.dev/projects/20573a6e-ef08-4281-8688-a96f210b3b89/files/b0f2719b-6c19-4d80-ba62-43cff84686e1.jpg', category: 'Кровати', material: 'Дерево', style: 'Современный', color: 'Синий', room: 'Спальня' },
  { id: 3, name: 'Стол Dining', price: 32990, image: 'https://cdn.poehali.dev/projects/20573a6e-ef08-4281-8688-a96f210b3b89/files/ee802cfd-783c-443a-a391-1b7251966937.jpg', category: 'Столы', material: 'Дерево', style: 'Минимализм', color: 'Натуральный', room: 'Кухня' },
  { id: 4, name: 'Диван Loft', price: 67990, image: 'https://cdn.poehali.dev/projects/20573a6e-ef08-4281-8688-a96f210b3b89/files/31293cb7-a4e2-4846-b5b8-b4f6ddeb52ec.jpg', category: 'Диваны', material: 'Кожа', style: 'Лофт', color: 'Коричневый', room: 'Гостиная' },
  { id: 5, name: 'Шкаф Modern', price: 54990, image: 'https://cdn.poehali.dev/projects/20573a6e-ef08-4281-8688-a96f210b3b89/files/b0f2719b-6c19-4d80-ba62-43cff84686e1.jpg', category: 'Шкафы', material: 'МДФ', style: 'Современный', color: 'Белый', room: 'Спальня' },
  { id: 6, name: 'Стул Orange', price: 8990, image: 'https://cdn.poehali.dev/projects/20573a6e-ef08-4281-8688-a96f210b3b89/files/ee802cfd-783c-443a-a391-1b7251966937.jpg', category: 'Стулья', material: 'Пластик', style: 'Скандинавский', color: 'Оранжевый', room: 'Кухня' },
];

const filterOptions = {
  materials: ['Дерево', 'Ткань', 'Кожа', 'МДФ', 'Пластик'],
  styles: ['Современный', 'Скандинавский', 'Лофт', 'Минимализм', 'Классический'],
  colors: ['Белый', 'Черный', 'Оранжевый', 'Синий', 'Коричневый', 'Натуральный'],
  rooms: ['Гостиная', 'Спальня', 'Кухня', 'Детская', 'Прихожая'],
};

function Index() {
  const [activePage, setActivePage] = useState('home');
  const [selectedFilters, setSelectedFilters] = useState<{
    materials: string[];
    styles: string[];
    colors: string[];
    rooms: string[];
  }>({
    materials: [],
    styles: [],
    colors: [],
    rooms: [],
  });

  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value],
    }));
  };

  const filteredProducts = products.filter(product => {
    if (selectedFilters.materials.length > 0 && !selectedFilters.materials.includes(product.material)) return false;
    if (selectedFilters.styles.length > 0 && !selectedFilters.styles.includes(product.style)) return false;
    if (selectedFilters.colors.length > 0 && !selectedFilters.colors.includes(product.color)) return false;
    if (selectedFilters.rooms.length > 0 && !selectedFilters.rooms.includes(product.room)) return false;
    return true;
  });

  const clearFilters = () => {
    setSelectedFilters({ materials: [], styles: [], colors: [], rooms: [] });
  };

  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Sofa" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">FSK Мебель</h1>
          </div>
          
          <nav className="hidden md:flex gap-8">
            <button onClick={() => setActivePage('home')} className={`transition-colors ${activePage === 'home' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}>Главная</button>
            <button onClick={() => setActivePage('catalog')} className={`transition-colors ${activePage === 'catalog' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}>Каталог</button>
            <button onClick={() => setActivePage('about')} className={`transition-colors ${activePage === 'about' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}>О компании</button>
            <button onClick={() => setActivePage('delivery')} className={`transition-colors ${activePage === 'delivery' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}>Доставка</button>
          </nav>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                <button onClick={() => setActivePage('home')} className="text-left text-lg">Главная</button>
                <button onClick={() => setActivePage('catalog')} className="text-left text-lg">Каталог</button>
                <button onClick={() => setActivePage('about')} className="text-left text-lg">О компании</button>
                <button onClick={() => setActivePage('delivery')} className="text-left text-lg">Доставка</button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {activePage === 'home' && (
        <main>
          <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            <img src={products[0].image} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Мебель вашей мечты</h2>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-fade-in">Создаем уют в каждом доме с 2010 года</p>
              <Button size="lg" onClick={() => setActivePage('catalog')} className="text-lg px-8 py-6 animate-scale-in hover-scale">
                Смотреть каталог <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </section>

          <section className="container mx-auto px-4 py-16">
            <h3 className="text-3xl font-bold text-center mb-12">Популярные товары</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.slice(0, 3).map((product, idx) => (
                <Card key={product.id} className="overflow-hidden hover-scale transition-all duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                  <CardContent className="p-6">
                    <Badge className="mb-3">{product.category}</Badge>
                    <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                    <p className="text-2xl font-bold text-primary mb-4">{product.price.toLocaleString()} ₽</p>
                    <Button className="w-full">Подробнее</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="animate-fade-in">
                  <Icon name="Truck" size={48} className="mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Быстрая доставка</h4>
                  <p>По всей России от 3 дней</p>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <Icon name="Shield" size={48} className="mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Гарантия качества</h4>
                  <p>5 лет на всю продукцию</p>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <Icon name="Palette" size={48} className="mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Индивидуальный дизайн</h4>
                  <p>Создадим мебель под ваш интерьер</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {activePage === 'catalog' && (
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="md:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Фильтры</h3>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Сбросить
                    </Button>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Материал</h4>
                  {filterOptions.materials.map(material => (
                    <div key={material} className="flex items-center gap-2 mb-2">
                      <Checkbox
                        checked={selectedFilters.materials.includes(material)}
                        onCheckedChange={() => toggleFilter('materials', material)}
                      />
                      <label className="text-sm cursor-pointer">{material}</label>
                    </div>
                  ))}
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Стиль</h4>
                  {filterOptions.styles.map(style => (
                    <div key={style} className="flex items-center gap-2 mb-2">
                      <Checkbox
                        checked={selectedFilters.styles.includes(style)}
                        onCheckedChange={() => toggleFilter('styles', style)}
                      />
                      <label className="text-sm cursor-pointer">{style}</label>
                    </div>
                  ))}
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Цвет</h4>
                  {filterOptions.colors.map(color => (
                    <div key={color} className="flex items-center gap-2 mb-2">
                      <Checkbox
                        checked={selectedFilters.colors.includes(color)}
                        onCheckedChange={() => toggleFilter('colors', color)}
                      />
                      <label className="text-sm cursor-pointer">{color}</label>
                    </div>
                  ))}
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Комната</h4>
                  {filterOptions.rooms.map(room => (
                    <div key={room} className="flex items-center gap-2 mb-2">
                      <Checkbox
                        checked={selectedFilters.rooms.includes(room)}
                        onCheckedChange={() => toggleFilter('rooms', room)}
                      />
                      <label className="text-sm cursor-pointer">{room}</label>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-8">Каталог мебели</h2>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <Icon name="Search" size={64} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-xl text-gray-600">Товары не найдены</p>
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>Сбросить фильтры</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden hover-scale transition-all">
                      <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                      <CardContent className="p-4">
                        <Badge className="mb-2">{product.category}</Badge>
                        <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{product.material} • {product.style}</p>
                        <p className="text-xl font-bold text-primary mb-3">{product.price.toLocaleString()} ₽</p>
                        <Button className="w-full" size="sm">Заказать</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {activePage === 'about' && (
        <main className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-8">О компании</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg">
            <p>FSK Мебель — это команда профессионалов, которая создает мебель высочайшего качества с 2010 года. Мы специализируемся на производстве современной мебели для дома и офиса.</p>
            <p>Наша миссия — сделать красивую и функциональную мебель доступной для каждого. Мы используем только качественные материалы и современные технологии производства.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              <div className="text-center">
                <p className="text-5xl font-bold text-primary mb-2">15+</p>
                <p className="text-gray-600">лет на рынке</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold text-primary mb-2">10000+</p>
                <p className="text-gray-600">довольных клиентов</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold text-primary mb-2">500+</p>
                <p className="text-gray-600">моделей мебели</p>
              </div>
            </div>
            <p>Мы гордимся каждым проектом и всегда рады помочь вам создать интерьер вашей мечты. Наша команда дизайнеров готова разработать индивидуальный проект специально для вас.</p>
          </div>
        </main>
      )}

      {activePage === 'delivery' && (
        <main className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-8">Доставка и оплата</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Truck" size={40} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Доставка по России</h3>
                    <p className="text-gray-600 mb-2">Доставляем в любой город России. Срок доставки от 3 до 14 дней в зависимости от региона.</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Москва и МО — бесплатно при заказе от 30 000 ₽</li>
                      <li>Санкт-Петербург — от 1 500 ₽</li>
                      <li>Регионы РФ — рассчитывается индивидуально</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Package" size={40} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Самовывоз</h3>
                    <p className="text-gray-600">Вы можете забрать заказ самостоятельно из нашего шоурума в Москве. Адрес: ул. Примерная, д. 123.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="CreditCard" size={40} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Способы оплаты</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Наличными при получении</li>
                      <li>Банковской картой на сайте</li>
                      <li>Безналичный расчет для юридических лиц</li>
                      <li>Рассрочка от банков-партнеров</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Wrench" size={40} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Сборка и установка</h3>
                    <p className="text-gray-600">Предоставляем услуги профессиональной сборки мебели. Стоимость рассчитывается индивидуально в зависимости от сложности изделия.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      )}

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Sofa" size={32} />
                <h3 className="text-xl font-bold">FSK Мебель</h3>
              </div>
              <p className="text-gray-400">Создаем комфорт в каждом доме</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  +7 (495) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  info@fskmebel.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  Москва, ул. Примерная, 123
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Режим работы</h4>
              <p className="text-gray-400">Пн-Пт: 9:00 - 20:00</p>
              <p className="text-gray-400">Сб-Вс: 10:00 - 18:00</p>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <p className="text-center text-gray-400">© 2024 FSK Мебель. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
