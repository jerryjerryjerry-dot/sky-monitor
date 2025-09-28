/*
 * Sky-Monitor ClickHouse 初始化脚本
 * 创建监控数据存储表
 */

-- 创建基础监控数据存储表
CREATE TABLE IF NOT EXISTS base_monitor_storage (
    event_type String,           -- 事件类型 (error, performance, user_action)
    message String,              -- 消息内容 (JSON 格式)
    timestamp UInt64,            -- 时间戳
    user_id String,              -- 用户ID
    session_id String,           -- 会话ID
    url String,                  -- 页面URL
    user_agent String,           -- 用户代理
    created_at DateTime DEFAULT now()  -- 创建时间
) ENGINE = MergeTree()
ORDER BY (event_type, timestamp)
PARTITION BY toYYYYMM(toDateTime(timestamp / 1000));

-- 创建错误监控视图
CREATE MATERIALIZED VIEW IF NOT EXISTS error_monitor_view
ENGINE = MergeTree()
ORDER BY (timestamp)
AS
SELECT
    event_type,
    message,
    timestamp,
    user_id,
    session_id,
    url,
    user_agent,
    created_at
FROM base_monitor_storage
WHERE event_type = 'error';

-- 创建性能监控视图
CREATE MATERIALIZED VIEW IF NOT EXISTS performance_monitor_view
ENGINE = MergeTree()
ORDER BY (timestamp)
AS
SELECT
    event_type,
    message,
    timestamp,
    user_id,
    session_id,
    url,
    user_agent,
    created_at
FROM base_monitor_storage
WHERE event_type = 'performance';

-- 创建用户行为监控视图
CREATE MATERIALIZED VIEW IF NOT EXISTS user_action_monitor_view
ENGINE = MergeTree()
ORDER BY (timestamp)
AS
SELECT
    event_type,
    message,
    timestamp,
    user_id,
    session_id,
    url,
    user_agent,
    created_at
FROM base_monitor_storage
WHERE event_type = 'user_action';

-- 创建统计表
CREATE TABLE IF NOT EXISTS monitor_stats (
    date Date,
    event_type String,
    count UInt64,
    unique_users UInt64,
    unique_sessions UInt64
) ENGINE = SummingMergeTree()
ORDER BY (date, event_type)
PARTITION BY toYYYYMM(date);

-- 创建统计物化视图
CREATE MATERIALIZED VIEW IF NOT EXISTS monitor_stats_view
ENGINE = SummingMergeTree()
ORDER BY (date, event_type)
AS
SELECT
    toDate(toDateTime(timestamp / 1000)) as date,
    event_type,
    count() as count,
    uniqExact(user_id) as unique_users,
    uniqExact(session_id) as unique_sessions
FROM base_monitor_storage
GROUP BY date, event_type;
