(() => {
  class SessionEvent {
    constructor({
      event_id,
      title,
      summary,
      description,
      status,
      first_seen,
      last_seen,
      created_at,
      updated_at,
      severity,
    }) {
      this.event_id = event_id;
      this.title = title;
      this.summary = summary;
      this.description = description;
      this.status = status;
      this.first_seen = new Date(first_seen);
      this.last_seen = new Date(last_seen);
      this.created_at = new Date(created_at);
      this.updated_at = new Date(updated_at);
      this.severity = severity;
    }
  }

  const events = [
    new SessionEvent({
      event_id: 'evt-1001',
      title: 'Unauthorized login burst',
      summary: 'Multiple failed SSH attempts from one source.',
      description: 'A sudden burst of failed SSH logins was observed from IP 203.0.113.16.',
      status: 'active',
      first_seen: '2026-04-10T07:15:00.000Z',
      last_seen: '2026-04-14T08:24:00.000Z',
      created_at: '2026-04-10T07:15:00.000Z',
      updated_at: '2026-04-14T08:24:00.000Z',
      severity: 'high',
    }),
    new SessionEvent({
      event_id: 'evt-1002',
      title: 'Endpoint malware quarantine',
      summary: 'EDR quarantined suspicious executable.',
      description: 'Endpoint protection quarantined a newly dropped binary on host LAB-14.',
      status: 'monitoring',
      first_seen: '2026-04-12T10:32:00.000Z',
      last_seen: '2026-04-14T05:10:00.000Z',
      created_at: '2026-04-12T10:32:00.000Z',
      updated_at: '2026-04-14T05:10:00.000Z',
      severity: 'critical',
    }),
    new SessionEvent({
      event_id: 'evt-1003',
      title: 'Firewall policy mismatch',
      summary: 'Unexpected rule ordering after deployment.',
      description: 'A production firewall policy update changed rule precedence unexpectedly.',
      status: 'resolved',
      first_seen: '2026-04-09T18:05:00.000Z',
      last_seen: '2026-04-13T21:45:00.000Z',
      created_at: '2026-04-09T18:05:00.000Z',
      updated_at: '2026-04-13T21:45:00.000Z',
      severity: 'medium',
    }),
  ];

  window.SessionEvent = SessionEvent;
  window.sessionEvents = events;
})();
