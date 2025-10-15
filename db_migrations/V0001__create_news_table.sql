CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date VARCHAR(100) NOT NULL,
    icon VARCHAR(50) NOT NULL DEFAULT 'Sparkles',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO news (title, description, date, icon) VALUES
('Обновление 1.12.2', 'Новые биомы, мобы и предметы уже доступны на сервере!', '15 октября 2025', 'Sparkles'),
('Скоро...', 'Следите за обновлениями, скоро будут интересные новости!', '???', 'HelpCircle'),
('???', 'Что-то большое готовится... Ждите анонсов!', '???', 'HelpCircle');