-- Sky-Monitor PostgreSQL 数据表初始化
-- 用于存储用户和应用元数据

-- ========================================
-- 1. 用户表（admin）
-- ========================================
CREATE TABLE IF NOT EXISTS admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'developer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE admin IS '用户表';

COMMENT ON COLUMN admin.id IS '用户 ID';

COMMENT ON COLUMN admin.username IS '用户名';

COMMENT ON COLUMN admin.password IS '密码（bcrypt 加密）';

COMMENT ON COLUMN admin.email IS '邮箱';

COMMENT ON COLUMN admin.phone IS '手机号';

COMMENT ON COLUMN admin.role IS '角色（admin/developer/viewer）';

-- ========================================
-- 2. 应用表（application）
-- ========================================
CREATE TABLE IF NOT EXISTS application (
    id SERIAL PRIMARY KEY,
    app_id VARCHAR(80) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (
        type IN ('react', 'vue', 'vanilla')
    ),
    description TEXT,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES admin (id) ON DELETE CASCADE
);

COMMENT ON TABLE application IS '应用表';

COMMENT ON COLUMN application.id IS '应用 ID';

COMMENT ON COLUMN application.app_id IS '应用唯一标识';

COMMENT ON COLUMN application.name IS '应用名称';

COMMENT ON COLUMN application.type IS '应用类型';

COMMENT ON COLUMN application.description IS '应用描述';

COMMENT ON COLUMN application.user_id IS '所属用户 ID';

-- ========================================
-- 3. 创建索引
-- ========================================
CREATE INDEX IF NOT EXISTS idx_application_user_id ON application (user_id);

CREATE INDEX IF NOT EXISTS idx_application_created_at ON application (created_at);

-- ========================================
-- 4. 插入测试数据（可选）
-- ========================================
-- 密码: admin123（需要 bcrypt 加密，这里仅为示例）
-- INSERT INTO admin (username, password, email, role)
-- VALUES ('admin', '$2b$10$... 你的 bcrypt hash ...', 'admin@sky-monitor.com', 'admin');