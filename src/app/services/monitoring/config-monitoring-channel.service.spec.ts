import { TestBed } from '@angular/core/testing';

import { ConfigMonitoringChannelService } from './config-monitoring-channel.service';

describe('ConfigMonitoringChannelService', () => {
  let service: ConfigMonitoringChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigMonitoringChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
