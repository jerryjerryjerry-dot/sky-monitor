-- Sky-Monitor ClickHouse 数据表初始化
-- 用于存储前端监控数据（错误和性能）

-- ========================================
-- 1. 错误监控表
-- ========================================
CREATE TABLE IF NOT EXISTS monitor_errors (
    app_id String COMMENT '应用 ID',
    error_type String COMMENT '错误类型（onerror/unhandledrejection）',
    message String COMMENT '错误消息',
    stack String COMMENT '错误堆栈',
    file String COMMENT '文件路径',
    line UInt32 COMMENT '行号',
    column UInt32 COMMENT '列号',
    path String COMMENT '页面路径',
    user_agent String COMMENT '浏览器信息',
    timestamp DateTime COMMENT '发生时间'
) ENGINE = MergeTree ()
PARTITION BY
    toYYYYMM (timestamp)
ORDER BY (app_id, timestamp) COMMENT '前端错误监控数据表';

-- ========================================
-- 2. 性能监控表
-- ========================================
CREATE TABLE IF NOT EXISTS monitor_performance (
    app_id String COMMENT '应用 ID',
    metric_type String COMMENT '指标类型（LCP/FID/CLS/FCP/TTFB）',
    metric_name String COMMENT '指标名称',
    metric_value Float64 COMMENT '指标值',
    path String COMMENT '页面路径',
    user_agent String COMMENT '浏览器信息',
    timestamp DateTime COMMENT '采集时间'
) ENGINE = MergeTree ()
PARTITION BY
    toYYYYMM (timestamp)
ORDER BY (app_id, timestamp) COMMENT '前端性能监控数据表';

-- ========================================
-- 3. 验证表创建
-- ========================================
SHOW TABLES;

-- 查询表结构
DESC monitor_errors;

DESC monitor_performance;