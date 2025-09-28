/*
 * Sky-Monitor DSN Server 控制器
 * 提供监控数据收集 API
 */
import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';

import { AppService } from './app.service';

interface MonitorData {
  eventType: string;
  message: string;
  timestamp?: number;
  userId?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('CLICKHOUSE_CLIENT') private readonly clickhouseClient: any,
  ) {}

  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: Date.now(),
      service: 'sky-monitor-dsn-server',
    };
  }

  @Post('collect')
  async collectData(@Body() data: MonitorData) {
    try {
      // 验证数据
      if (!data.eventType || !data.message) {
        return {
          success: false,
          error: 'Missing required fields: eventType and message',
        };
      }

      // 添加时间戳
      const monitorData = {
        event_type: data.eventType,
        message: data.message,
        timestamp: data.timestamp || Date.now(),
        user_id: data.userId || '',
        session_id: data.sessionId || '',
        url: data.url || '',
        user_agent: data.userAgent || '',
      };

      // 写入 ClickHouse
      await this.clickhouseClient.insert({
        table: 'base_monitor_storage',
        values: [monitorData],
        format: 'JSONEachRow',
      });

      return {
        success: true,
        message: 'Data collected successfully',
        timestamp: Date.now(),
      };
    } catch (error) {
      this.logger.error('Error collecting data:', error as Error);
      return {
        success: false,
        error: 'Failed to collect data',
        timestamp: Date.now(),
      };
    }
  }

  @Post('collect/batch')
  async collectBatchData(@Body() data: { events: MonitorData[] }) {
    try {
      if (!data.events || !Array.isArray(data.events)) {
        return {
          success: false,
          error: 'Invalid batch data format',
        };
      }

      const monitorData = data.events.map((event) => ({
        event_type: event.eventType,
        message: event.message,
        timestamp: event.timestamp || Date.now(),
        user_id: event.userId || '',
        session_id: event.sessionId || '',
        url: event.url || '',
        user_agent: event.userAgent || '',
      }));

      // 批量写入 ClickHouse
      await this.clickhouseClient.insert({
        table: 'base_monitor_storage',
        values: monitorData,
        format: 'JSONEachRow',
      });

      return {
        success: true,
        message: `Collected ${monitorData.length} events successfully`,
        timestamp: Date.now(),
      };
    } catch (error) {
      this.logger.error('Error collecting batch data:', error as Error);
      return {
        success: false,
        error: 'Failed to collect batch data',
        timestamp: Date.now(),
      };
    }
  }
}
