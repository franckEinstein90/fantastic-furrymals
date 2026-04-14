document.addEventListener('DOMContentLoaded', () => {
  if (!Array.isArray(window.sessionEvents)) {
    return;
  }

  const tableBody = document.querySelector('#events-table tbody');
  if (!tableBody) {
    return;
  }

  const formatDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '' : date.toLocaleString();
  };

  window.sessionEvents.forEach((eventItem) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${eventItem.event_id}</td>
      <td>${eventItem.title}</td>
      <td>${eventItem.summary}</td>
      <td>${eventItem.status}</td>
      <td>${eventItem.severity}</td>
      <td>${formatDate(eventItem.first_seen)}</td>
      <td>${formatDate(eventItem.last_seen)}</td>
      <td>${formatDate(eventItem.created_at)}</td>
      <td>${formatDate(eventItem.updated_at)}</td>
    `;
    tableBody.appendChild(row);
  });

  if (window.DataTable) {
    // DataTables v2 (vanilla)
    // eslint-disable-next-line no-new
    new DataTable('#events-table', {
      pageLength: 5,
      order: [[5, 'desc']],
    });
  }
});
